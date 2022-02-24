import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // tells nest to execute a validation pipe whenever he encounters a validation decorator
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap();
