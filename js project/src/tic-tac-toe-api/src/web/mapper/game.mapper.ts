import { Injectable } from '@nestjs/common';
import { CurrentGame } from '../../domain/model/current-game.model';
import { GameField } from '../../domain/model/game-field.model';
import { GameResponse, WebGameBoard } from '../model/game.model';

@Injectable()
export class GameWebMapper {
  domainToResponse(
    game: CurrentGame,
    winner: 'X' | 'O' | 'draw' | null,
    isOver: boolean,
    currentPlayer: 'X' | 'O'
  ): GameResponse {
    const field = game.getField();
    
    return {
      id: game.getId(),
      board: field.getBoard(),
      currentPlayer: currentPlayer,
      winner: winner,
      isOver: isOver,
    };
  }

  webBoardToDomain(board: WebGameBoard): GameField {
    return new GameField(board);
  }

  domainBoardToWeb(field: GameField): WebGameBoard {
    return field.getBoard();
  }
}