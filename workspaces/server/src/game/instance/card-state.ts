import { Cards } from '@shared/common/Cards';
import { Socket } from 'socket.io';
import { CardStateDefinition } from '@shared/common/types';

export class CardState
{
  constructor(
    public readonly card: Cards,
    public isRevealed: boolean = false,
    public isLocked: boolean = false,
    public ownerId: Socket['id'] | null = null,
  )
  {
  }

  public toDefinition(): CardStateDefinition
  {
    return {
      card: this.isRevealed ? this.card : null,
      owner: this.ownerId,
    };
  }
}