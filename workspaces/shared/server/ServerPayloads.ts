import { ServerEvents } from './ServerEvents';

export type ServerPayloads = {
  [ServerEvents.LobbyState]: {
    lobbyId: string;
    playersCount: number;
  };
};