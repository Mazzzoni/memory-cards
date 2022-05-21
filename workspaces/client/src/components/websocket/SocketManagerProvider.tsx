import SocketManager from '@components/websocket/SocketManager';
import SocketState from '@components/websocket/SocketState';
import React, { createContext } from 'react';
import { useSetRecoilState } from 'recoil';

const socketManager = new SocketManager();

export const SocketManagerContext = createContext<SocketManager>(socketManager);

type ProviderProps = {
  children: React.ReactNode;
};

export function SocketManagerProvider({children}: ProviderProps): JSX.Element
{
  socketManager.setSocketState = useSetRecoilState(SocketState);

  return <SocketManagerContext.Provider value={socketManager}>{children}</SocketManagerContext.Provider>;
}
