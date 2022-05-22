import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { LobbyManager } from '@app/game/lobby/lobby.manager';

@Module({
  providers: [
    // Gateways
    GameGateway,

    // Managers
    LobbyManager,
  ],
})
export class GameModule
{
}
