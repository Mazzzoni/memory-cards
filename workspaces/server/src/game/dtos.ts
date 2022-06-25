import { IsNumber, IsString } from 'class-validator';
import { Cards } from '@shared/common/Cards';

export class LobbyCreateDto
{
  @IsString()
  mode: 'solo' | 'duo';
}

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