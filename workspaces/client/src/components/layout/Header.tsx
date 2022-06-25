import Image from 'next/image';
import { Cards } from '@icons/cards';
import Link from 'next/link';

export default function Header() {
  const clearGame = () => {
    // FIXME: Not very elegant, but using normal router would just stuck me in a infinite loop
    //        even if I removed query parameter and push it to load home page
    window.location.href = window.location.origin;
  };

  return (
    <div>
      <Link href="/">
        <a onClick={clearGame}>
          <h1 className="text-4xl font-bold flex space-x-2">
            <span>Memory Cards</span>
            <div>
              <Image
                src={Cards}
                alt="playing cards"
                className="ml-2"
                width={42}
                height={42}
              />
            </div>
          </h1>
        </a>
      </Link>
    </div>
  );
}