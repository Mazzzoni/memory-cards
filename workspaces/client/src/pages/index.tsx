import type { NextPage } from 'next';
import GameManager from '@components/game/GameManager';
import Header from '@components/layout/Header';

const Page: NextPage = () => {
  return (
    <div className="container max-w-2xl mt-16">
      <Header/>
      <GameManager/>
    </div>
  );
};

export default Page;
