export type DatasourceCellValue = 'X' | 'O' | null;
export type DatasourceGameBoard = DatasourceCellValue[][];

export interface DatasourceGameField {
  board: DatasourceGameBoard;
  size: number;
}