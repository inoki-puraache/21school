import { Injectable } from '@nestjs/common';
import { GameField } from '../../domain/model/game-field.model';
import { CurrentGame } from '../../domain/model/current-game.model';
import { DatasourceGameBoard } from '../model/game-field.model';
import { DatasourceCurrentGame } from '../model/current-game.model';

@Injectable()
export class GameMapper {
  fieldToDatasource(domainField: GameField): DatasourceGameBoard {
    return domainField.getBoard();
  }

  fieldToDomain(datasourceBoard: DatasourceGameBoard): GameField {
    return new GameField(datasourceBoard);
  }

  gameToDatasource(domainGame: CurrentGame): DatasourceCurrentGame {
    const field = domainGame.getField();
    
    return {
      id: domainGame.getId(),
      board: field.getBoard(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  gameToDomain(datasourceGame: DatasourceCurrentGame): CurrentGame {
    const game = new CurrentGame(datasourceGame.id, datasourceGame.board);
    return game;
  }
}