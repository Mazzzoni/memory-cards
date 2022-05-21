import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { GameIoAdapter } from './websocket/game-io.adapter';

async function bootstrap()
{
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useWebSocketAdapter(new GameIoAdapter(app));

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.disable('x-powered-by');
  app.setGlobalPrefix('api');
  app.enableShutdownHooks();

  await app.listen(3000);
}

bootstrap();
