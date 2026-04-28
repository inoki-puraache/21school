import { Injectable } from '@nestjs/common';
import { DatasourceCurrentGame } from '../model/current-game.model';

@Injectable()
export class GameStorage {
  private games: Map<string, DatasourceCurrentGame> = new Map();

  save(game: DatasourceCurrentGame): void {
    const existingGame = this.games.get(game.id);
    
    const gameToSave = {
      ...game,
      createdAt: existingGame?.createdAt || game.createdAt || new Date(),
      updatedAt: new Date(),
    };
    
    this.games.set(game.id, gameToSave);
  }

  findById(id: string): DatasourceCurrentGame | null {
    const game = this.games.get(id);
    
    if (!game) {
      return null;
    }
    
    return { ...game };
  }

  delete(id: string): boolean {
    return this.games.delete(id);
  }

  findAll(): DatasourceCurrentGame[] {
    return Array.from(this.games.values()).map(game => ({ ...game }));
  }

  clear(): void {
    this.games.clear();
  }
}