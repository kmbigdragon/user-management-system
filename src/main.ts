import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';
import { TransformInterceptor } from './interceptors/transform/transform.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout/timeout.interceptor';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new TimeoutInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
