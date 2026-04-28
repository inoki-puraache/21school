export type CellValue = 'X' | 'O' | null;
export type GameBoard = CellValue[][];

export class GameField {
  private board: GameBoard;
  private readonly size: number = 3;

  constructor(board?: GameBoard) {
    if (board) {
      this.board = board.map(row => [...row]);
    } else {
      this.board = Array(this.size).fill(null).map(() => Array(this.size).fill(null));
    }
  }

  getBoard(): GameBoard {
    return this.board.map(row => [...row]);
  }

  getCell(row: number, col: number): CellValue {
    if (row < 0 || row >= this.size || col < 0 || col >= this.size) {
      throw new Error('Invalid cell coordinates');
    }
    return this.board[row][col];
  }

  setCell(row: number, col: number, value: CellValue): void {
    if (row < 0 || row >= this.size || col < 0 || col >= this.size) {
      throw new Error('Invalid cell coordinates');
    }
    this.board[row][col] = value;
  }

  getEmptyCells(): { row: number; col: number }[] {
    const emptyCells: { row: number; col: number }[] = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.board[i][j] === null) {
          emptyCells.push({ row: i, col: j });
        }
      }
    }
    return emptyCells;
  }

  isFull(): boolean {
    return this.getEmptyCells().length === 0;
  }
}