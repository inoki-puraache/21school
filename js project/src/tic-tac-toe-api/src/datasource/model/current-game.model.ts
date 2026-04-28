import { DatasourceGameBoard } from './game-field.model';

export interface DatasourceCurrentGame {
  id: string;
  board: DatasourceGameBoard;
  createdAt: Date;
  updatedAt: Date;
}