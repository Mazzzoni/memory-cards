import useSocketManager from '@hooks/useSocketManager';
import { ClientEvents } from '@memory-cards/shared/client/ClientEvents';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { emitEvent } from '@utils/analytics';

export default function Introduction() {
  const router = useRouter();
  const {sm} = useSocketManager();

  useEffect(() => {
    if (router.query.lobby) {
      sm.emit({
        event: ClientEvents.LobbyJoin,
        data: {
          lobbyId: router.query.lobby,
        },
      });
    }
  }, [router]);

  const onCreateLobby = () => {
    sm.emit({
      event: ClientEvents.LobbyCreate,
    });

    emitEvent('lobby_create');
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl">Hello ! 👋</h2>

      <p className="mt-3 text-lg">
        Welcome to a simple game to test your memory against other players.
        <br/>
        Reveal cards by clicking on them, you can reveal two card per round, your opponent too.
        <br/>
        Once you revealed cards, if they match then you gain a point. You&apos;ll also see the cards revealed by your opponent.
        <br/>
        Game is over once all cards are revealed. Player with most points wins!
      </p>

      <div className="mt-5 text-center">
        <button className="btn" onClick={onCreateLobby}>Create lobby</button>
      </div>
    </div>
  );
}