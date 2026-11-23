import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExpectionFilter } from './common/filters/http-expection/http-expection.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExpectionFilter());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
