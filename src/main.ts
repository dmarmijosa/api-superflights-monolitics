import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExpectionFilter } from './common/filters/http-expection/http-expection.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout/timeout.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExpectionFilter());
  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
