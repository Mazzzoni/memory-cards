import { IsInt, IsNumber, IsString, Max, Min } from 'class-validator';
import { Cards } from '@shared/common/Cards';

export class LobbyCreateDto
{
  @IsString()
  mode: 'solo' | 'duo';

  @IsInt()
  @Min(1)
  @Max(5)
  delayBetweenRounds: number;
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