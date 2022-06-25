import { Cards } from '@memory-cards/shared/common/Cards';
import {
  Back,
  Clover10,
  CloverA,
  CloverKing,
  CloverQueen,
  Diamond10,
  DiamondA,
  DiamondKing,
  DiamondQueen,
  Heart10,
  HeartA,
  HeartQueen,
  Spade10,
  SpadeA,
  SpadeQueen,
} from '@icons/cards/index';

export const CardsMap = (card: Cards | null) => {
  switch (card) {
    case null:
      return Back;

    case Cards.CloverA:
      return CloverA;
    case Cards.DiamondA:
      return DiamondA;
    case Cards.HeartA:
      return HeartA;
    case Cards.SpadeA:
      return SpadeA;

    case Cards.CloverKing:
      return CloverKing;
    case Cards.DiamondKing:
      return DiamondKing;

    case Cards.CloverQueen:
      return CloverQueen;
    case Cards.DiamondQueen:
      return DiamondQueen;
    case Cards.HeartQueen:
      return HeartQueen;
    case Cards.SpadeQueen:
      return SpadeQueen;

    case Cards.Clover10:
      return Clover10;
    case Cards.Diamond10:
      return Diamond10;
    case Cards.Heart10:
      return Heart10;
    case Cards.Spade10:
      return Spade10;
  }
};