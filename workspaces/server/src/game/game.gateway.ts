import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ClientEvents } from '@shared/client/ClientEvents';
import { ServerEvents } from '@shared/server/ServerEvents';
import { LobbyManager } from '@app/game/lobby/lobby.manager';
import { Logger } from '@nestjs/common';
import { AuthenticatedSocket } from '@app/game/types';
import { ServerException } from '@app/game/server.exception';
import { SocketExceptions } from '@shared/server/SocketExceptions';

@WebSocketGateway()
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private readonly server: Server;

  private readonly logger: Logger = new Logger(GameGateway.name);

  constructor(
    private readonly lobbyManager: LobbyManager,
  )
  {
  }

  afterInit(server: Server): any
  {
    // Pass server instance to managers
    this.lobbyManager.server = this.server;

    this.logger.log('Game server initialized !');
  }

  async handleConnection(client: Socket, ...args: any[]): Promise<void>
  {
    // Call initializers to set up socket
    this.lobbyManager.initializeSocket(client);
  }

  async handleDisconnect(client: AuthenticatedSocket): Promise<void>
  {
    // Handle termination of socket
    this.lobbyManager.terminateSocket(client);
  }

  @SubscribeMessage(ClientEvents.Ping)
  onPing(client: AuthenticatedSocket): void
  {
    client.emit(ServerEvents.Pong, {
      message: 'pong',
    });
  }

  @SubscribeMessage(ClientEvents.LobbyCreate)
  onLobbyCreate(client: AuthenticatedSocket): void
  {
    const lobby = this.lobbyManager.createLobby();
    lobby.addClient(client);
  }

  @SubscribeMessage(ClientEvents.LobbyJoin)
  onLobbyJoin(client: AuthenticatedSocket, data: { lobbyId: string }): void
  {
    if (!data.lobbyId) {
      throw new ServerException(SocketExceptions.UnexpectedPayload);
    }

    this.lobbyManager.joinLobby(data.lobbyId, client);
  }
}