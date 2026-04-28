export type WebCellValue = 'X' | 'O' | null;
export type WebGameBoard = WebCellValue[][];

export interface CreateGameRequest {
  player?: 'X' | 'O';
}

export interface MakeMoveRequest {
  board: WebGameBoard;
  currentPlayer: 'X' | 'O';
}

export interface GameResponse {
  id: string;
  board: WebGameBoard;
  currentPlayer: 'X' | 'O';
  winner: 'X' | 'O' | 'draw' | null;
  isOver: boolean;
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}