import { GameField, GameBoard } from './game-field.model';

export interface ICurrentGame {
  id: string;
  field: GameBoard;
}

export class CurrentGame {
  private readonly uuid: string;
  private readonly field: GameField;

  constructor(id: string, board?: GameBoard) {
    this.uuid = id;
    this.field = new GameField(board);
  }

  getId(): string {
    return this.uuid;
  }

  getField(): GameField {
    return this.field;
  }

  toJSON(): ICurrentGame {
    return {
      id: this.uuid,
      field: this.field.getBoard(),
    };
  }
}