import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpExpectionFilter<T> implements ExceptionFilter {
  private readonly logger = new Logger(HttpExpectionFilter.name);

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException ? exception.getResponse() : exception;

    this.logger.error(
      `HTTP Exception: ${status} | Error: ${JSON.stringify(message)}`,
    );

    response.status(status).json({
      path: request.url,
      timestamp: new Date().toISOString(),
      message: message,
    });
  }
}
