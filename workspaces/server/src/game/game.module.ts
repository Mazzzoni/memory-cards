import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';

@Module({
  providers: [
    GameGateway,
  ],
})
export class GameModule
{
}
