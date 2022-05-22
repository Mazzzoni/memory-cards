import playingCards from '@icons/playing-cards.svg';
import Image from 'next/image';

export default function Header() {
  return (
    <div>
      <h1 className="text-4xl font-bold flex space-x-2">
        <span>Memory Cards</span>
        <div>
          <Image
            src={playingCards}
            alt="playing cards"
            className="ml-2"
            width={42}
            height={42}
          />
        </div>
      </h1>
    </div>
  )
}