import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './infra/config/config.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.appPort;

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.enableCors({
    origin: '*',
  });

  await app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
bootstrap();
