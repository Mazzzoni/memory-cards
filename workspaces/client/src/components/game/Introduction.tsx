import useSocketManager from '@hooks/useSocketManager';
import { ClientEvents } from '@memory-cards/shared/client/ClientEvents';
import { useState } from 'react';
import { Divider } from '@mantine/core';

export default function Introduction() {
  const {sm} = useSocketManager();
  const [lobbyTargetId, setLobbyTargetId] = useState('');

  const onCreateLobby = () => {
    sm.emit({
      event: ClientEvents.LobbyCreate,
    });
  };

  const onJoinLobby = () => {
    sm.emit({
      event: ClientEvents.LobbyJoin,
      data: {
        lobbyId: lobbyTargetId,
      },
    });
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl">Hello ! 👋</h2>

      <p className="mt-3 text-lg">
        Welcome to a simple game to test your memory against other players.
        <br/>
        Reveal cards by clicking on them, you can reveal two card per round, your opponent too.
        <br/>
        Once you revealed cards, if they match then you gain a point. You'll also see the cards revealed by your opponent.
        <br/>
        Game is over once all cards are revealed. Player with most points wins!
      </p>

      <Divider
        variant="dashed"
        label="You can create a lobby or join one"
        labelPosition="center"
        labelProps={{
          size: 'lg',
        }}
        size="sm"
        my={20}
      />

      <div className="mt-3 flex justify-between">
        <button className="btn" onClick={onCreateLobby}>Create lobby</button>

        <div>
          <input
            type="text"
            className="px-3 py-2 text-black ml-6 w-72"
            placeholder="Lobby ID"
            onChange={(e) => setLobbyTargetId(e.target.value)}
          />

          <button className="btn" onClick={onJoinLobby}>Join lobby</button>
        </div>
      </div>
    </div>
  );
}