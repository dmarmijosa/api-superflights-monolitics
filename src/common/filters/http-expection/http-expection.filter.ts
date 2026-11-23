import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface MongoDuplicateKeyError {
  code: number;
  keyValue?: Record<string, unknown>;
}

function isMongoDuplicateKeyError(
  exception: unknown,
): exception is MongoDuplicateKeyError {
  return (
    typeof exception === 'object' &&
    exception !== null &&
    'code' in exception &&
    (exception as { code: unknown }).code === 11000
  );
}

@Catch()
export class HttpExpectionFilter<T> implements ExceptionFilter {
  private readonly logger = new Logger(HttpExpectionFilter.name);

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: unknown;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    } else if (isMongoDuplicateKeyError(exception)) {
      status = HttpStatus.CONFLICT;
      const fields = exception.keyValue
        ? Object.keys(exception.keyValue).join(', ')
        : '';
      message = {
        statusCode: HttpStatus.CONFLICT,
        error: 'Conflict',
        message: fields
          ? `Ya existe un registro con el mismo valor en: ${fields}`
          : 'Ya existe un registro duplicado',
      };
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception instanceof Error ? exception.message : exception;
    }

    this.logger.error(
      `HTTP Exception: ${status} | Error: ${JSON.stringify(message)}`,
    );

    response.status(status).json({
      path: request.url,
      timestamp: new Date().toISOString(),
      message,
    });
  }
}
