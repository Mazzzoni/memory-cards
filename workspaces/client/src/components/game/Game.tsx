import { ClientEvents } from '@memory-cards/shared/client/ClientEvents';
import { useEffect } from 'react';
import { Listener } from '@components/websocket/types';
import { toast } from 'react-toastify';
import { ServerEvents } from '@memory-cards/shared/server/ServerEvents';
import useSocketManager from '@hooks/useSocketManager';
import { useRecoilValue } from 'recoil';
import { CurrentLobbyState } from '@components/game/states';

export default function Game() {
  const {sm} = useSocketManager();
  const currentLobbyState = useRecoilValue(CurrentLobbyState);

  useEffect(() => {
    const onPong: Listener<{ message: string }> = ({message}) => toast.info(message);

    sm.registerListener(ServerEvents.Pong, onPong);

    return () => {
      sm.removeListener(ServerEvents.Pong, onPong);
    };
  }, []);

  const onPing = () => {
    sm.emit({
      event: ClientEvents.Ping,
    });
  };

  return (
    <div>
      <button className="btn" onClick={onPing}>onPing</button>

      <div>
        Lobby ID: {currentLobbyState!.lobbyId}
      </div>
    </div>
  );
}