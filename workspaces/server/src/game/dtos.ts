import { IsNumber, IsString } from 'class-validator';
import { Cards } from '@shared/common/Cards';

export class LobbyJoinDto
{
  @IsString()
  lobbyId: string;
}

export class RevealCardDto
{
  @IsNumber()
  cardIndex: Cards;
}