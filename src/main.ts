import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // tells nest to execute a validation pipe whenever he encounters a validation decorator
  app.useGlobalPipes(new ValidationPipe());

  // tells nest to use the transformation interceptor
  app.useGlobalInterceptors(new TransformInterceptor());

  const PORT = process.env.PORT;

  await app.listen(PORT);

  logger.log(`Application listening on port ${PORT}`);
}

bootstrap();
