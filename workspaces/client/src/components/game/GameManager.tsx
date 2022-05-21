import useSocketManager from '@hooks/useSocketManager';
import { useEffect } from 'react';
import { ClientEvents } from '@memory-cards/shared/client/ClientEvents';
import { Listener } from '@components/websocket/types';
import { toast } from 'react-toastify';
import { ServerEvents } from '@memory-cards/shared/server/ServerEvents';

export default function GameManager() {
  const {sm} = useSocketManager();

  useEffect(() => {
    sm.connect();

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
      <button className="btn" onClick={onPing}>ping</button>
    </div>
  );
}