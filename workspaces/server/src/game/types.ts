import { Socket } from 'socket.io';
import { Lobby } from '@app/game/lobby/lobby';

export type AuthenticatedSocket = Socket & {
  data: {
    lobby: null | Lobby;
  };
};