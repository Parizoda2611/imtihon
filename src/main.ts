import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService)

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  await app.listen(config.get('PORT'), () => {
    console.log(config.get('PORT'));
  });
}
bootstrap();
