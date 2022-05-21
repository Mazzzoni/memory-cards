import { atom } from 'recoil';

export type SocketState = {
  connected: boolean;
};

const state = atom<SocketState>({
  key: 'SocketState',
  default: {
    connected: false,
  },
});

export default state;
