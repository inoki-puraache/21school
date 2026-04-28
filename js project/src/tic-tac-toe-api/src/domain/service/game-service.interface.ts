import { CurrentGame } from '../model/current-game.model';
import { GameBoard } from '../model/game-field.model';

export interface IGameService {
  getNextMove(game: CurrentGame, player: 'X' | 'O'): { row: number; col: number };
  validateGameField(game: CurrentGame, previousBoard: GameBoard): boolean;
  checkGameOver(game: CurrentGame): {
    isOver: boolean;
    winner: 'X' | 'O' | 'draw' | null;
  };
}