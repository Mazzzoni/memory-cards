import { Lobby } from '@app/game/lobby/lobby';
import { Server } from 'socket.io';
import { AuthenticatedSocket } from '@app/game/types';
import { ServerException } from '@app/game/server.exception';
import { SocketExceptions } from '@shared/server/SocketExceptions';
import { LOBBIES_INTERVAL_CLEAN_UP, LOBBY_MAX_LIFETIME, LOBBY_MAX_PLAYERS } from '@app/game/constants';
import { ServerEvents } from '@shared/server/ServerEvents';
import { ServerPayloads } from '@shared/server/ServerPayloads';

export class LobbyManager
{
  public server: Server;

  private readonly lobbies: Map<Lobby['id'], Lobby> = new Map<Lobby['id'], Lobby>();

  constructor()
  {
    this.lobbiesCleaner();
  }

  public initializeSocket(client: AuthenticatedSocket): void
  {
    client.data.lobby = null;
  }

  public terminateSocket(client: AuthenticatedSocket): void
  {
    client.data.lobby?.removeClient(client);
  }

  public createLobby(): Lobby
  {
    const lobby = new Lobby(this.server);

    this.lobbies.set(lobby.id, lobby);

    return lobby;
  }

  public joinLobby(lobbyId: string, client: AuthenticatedSocket): void
  {
    const lobby = this.lobbies.get(lobbyId);

    if (!lobby) {
      throw new ServerException(SocketExceptions.LobbyError, 'Lobby not found');
    }

    if (lobby.clients.size >= LOBBY_MAX_PLAYERS) {
      throw new ServerException(SocketExceptions.LobbyError, 'Lobby already full');
    }

    lobby.addClient(client);
  }

  // Periodically clean up lobbies
  private lobbiesCleaner(): void
  {
    setInterval(() => {
      for (const [lobbyId, lobby] of this.lobbies) {
        const now = (new Date()).getTime();
        const lobbyCreatedAt = lobby.createdAt.getTime();
        const lobbyLifetime = now - lobbyCreatedAt;

        if (lobbyLifetime > LOBBY_MAX_LIFETIME) {
          lobby.dispatchToLobby<ServerPayloads[ServerEvents.GameMessage]>(ServerEvents.GameMessage, {
            color: 'blue',
            message: 'Game timed out',
          });

          lobby.instance.triggerFinish();

          this.lobbies.delete(lobby.id);
        }
      }
    }, LOBBIES_INTERVAL_CLEAN_UP);
  }
}