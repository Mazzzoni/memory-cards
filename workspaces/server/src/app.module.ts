import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GameModule } from './game/game.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env.local',
        '.env',
      ],
    }),
    GameModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule
{
}
