import { atom } from 'recoil';
import { ServerPayloads } from '@memory-cards/shared/server/ServerPayloads';
import { ServerEvents } from '@memory-cards/shared/server/ServerEvents';

export const CurrentLobbyState = atom<ServerPayloads[ServerEvents.LobbyState] | null>({
  key: 'CurrentLobbyState',
  default: null,
});