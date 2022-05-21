import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ClientEvents } from '@shared/client/ClientEvents';
import { ServerEvents } from '@shared/server/ServerEvents';

@WebSocketGateway()
export class GameGateway
{
  @SubscribeMessage(ClientEvents.Ping)
  onPing(client: Socket): void
  {
    client.emit(ServerEvents.Pong, {
      message: 'pong',
    });
  }
}