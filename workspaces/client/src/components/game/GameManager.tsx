import useSocketManager from '@hooks/useSocketManager';
import { useEffect } from 'react';
import { Listener } from '@components/websocket/types';
import { ServerEvents } from '@memory-cards/shared/server/ServerEvents';
import { ServerPayloads } from '@memory-cards/shared/server/ServerPayloads';
import { useRecoilState } from 'recoil';
import { CurrentLobbyState } from '@components/game/states';
import Introduction from '@components/game/Introduction';
import Game from '@components/game/Game';

export default function GameManager() {
  const {sm} = useSocketManager();
  const [lobbyState, setLobbyState] = useRecoilState(CurrentLobbyState);

  useEffect(() => {
    sm.connect();

    const onLobbyState: Listener<ServerPayloads[ServerEvents.LobbyState]> = (data) => setLobbyState(data);

    sm.registerListener(ServerEvents.LobbyState, onLobbyState);

    return () => {
      sm.removeListener(ServerEvents.LobbyState, onLobbyState);
    };
  }, []);

  if (lobbyState === null) {
    return <Introduction/>;
  }

  return <Game/>;
}