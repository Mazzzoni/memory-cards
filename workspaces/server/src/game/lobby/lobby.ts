import { v4 } from 'uuid';
import { Server, Socket } from 'socket.io';
import { ServerEvents } from '@shared/server/ServerEvents';
import { ServerPayloads } from '@shared/server/ServerPayloads';
import { AuthenticatedSocket } from '@app/game/types';

export class Lobby
{
  public readonly id: string = v4();

  public readonly players: Map<Socket['id'], Socket> = new Map<Socket['id'], Socket>();

  constructor(
    private readonly server: Server,
  )
  {
  }

  public addClient(client: AuthenticatedSocket): void
  {
    this.players.set(client.id, client);
    client.join(this.id);
    client.data.lobby = this;

    this.dispatchLobbyState();
  }

  public removeClient(client: AuthenticatedSocket): void
  {
    this.players.delete(client.id);
    client.leave(this.id);
    client.data.lobby = null;

    this.dispatchLobbyState();
  }

  public dispatchLobbyState(): void
  {
    const state: ServerPayloads[ServerEvents.LobbyState] = {
      lobbyId: this.id,
      playersCount: this.players.size,
    };

    this
      .server
      .to(this.id)
      .emit(ServerEvents.LobbyState, state);
  }
}