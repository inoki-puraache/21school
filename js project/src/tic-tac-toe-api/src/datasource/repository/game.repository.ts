import { Injectable } from '@nestjs/common';
import { GameStorage } from './game-storage';
import { GameMapper } from '../mapper/game.mapper';
import { CurrentGame } from '../../domain/model/current-game.model';
import { DatasourceCurrentGame } from '../model/current-game.model';

@Injectable()
export class GameRepository {
  constructor(
    private readonly storage: GameStorage,
    private readonly mapper: GameMapper
  ) {}

  save(game: CurrentGame): CurrentGame {
    const datasourceGame = this.mapper.gameToDatasource(game);
    this.storage.save(datasourceGame);
    return game;
  }

  findById(id: string): CurrentGame | null {
    const datasourceGame = this.storage.findById(id);
    
    if (!datasourceGame) {
      return null;
    }
    
    return this.mapper.gameToDomain(datasourceGame);
  }

  update(id: string, game: CurrentGame): CurrentGame | null {
    const existingGame = this.storage.findById(id);
    
    if (!existingGame) {
      return null;
    }
    
    const updatedGame: DatasourceCurrentGame = {
      id: game.getId(),
      board: game.getField().getBoard(),
      createdAt: existingGame.createdAt,
      updatedAt: new Date(),
    };
    
    this.storage.save(updatedGame);
    return game;
  }

  delete(id: string): boolean {
    return this.storage.delete(id);
  }

  findAll(): CurrentGame[] {
    const allGames = this.storage.findAll();
    return allGames.map(game => this.mapper.gameToDomain(game));
  }
}