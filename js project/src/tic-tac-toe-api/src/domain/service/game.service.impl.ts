import { Injectable } from '@nestjs/common';
import { IGameService } from './game-service.interface';
import { GameService as DomainGameService } from './game.service';
import { GameRepository } from '../../datasource/repository/game.repository';
import { CurrentGame } from '../model/current-game.model';
import { GameBoard } from '../model/game-field.model';

@Injectable()
export class GameServiceImpl implements IGameService {
  private readonly domainService: DomainGameService;

  constructor(private readonly repository: GameRepository) {
    this.domainService = new DomainGameService();
  }

  getNextMove(game: CurrentGame, player: 'X' | 'O'): { row: number; col: number } {
    const board = game.getField().getBoard();
    return this.domainService.getNextMove(board, player);
  }

  validateGameField(game: CurrentGame, previousBoard: GameBoard): boolean {
    const currentBoard = game.getField().getBoard();
    return this.domainService.validateGameField(currentBoard, previousBoard);
  }

  checkGameOver(game: CurrentGame): {
    isOver: boolean;
    winner: 'X' | 'O' | 'draw' | null;
  } {
    const board = game.getField().getBoard();
    return this.domainService.checkGameOver(board);
  }

  async saveGame(game: CurrentGame): Promise<CurrentGame> {
    return this.repository.save(game);
  }

  async getGame(id: string): Promise<CurrentGame | null> {
    return this.repository.findById(id);
  }

  async updateGame(id: string, game: CurrentGame): Promise<CurrentGame | null> {
    return this.repository.update(id, game);
  }

  async deleteGame(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async getAllGames(): Promise<CurrentGame[]> {
    return this.repository.findAll();
  }
}