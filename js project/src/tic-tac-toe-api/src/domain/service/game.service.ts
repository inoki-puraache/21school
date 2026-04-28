import { GameBoard } from '../model/game-field.model';

export class GameService {
  getNextMove(board: GameBoard, aiPlayer: 'X' | 'O'): { row: number; col: number } {
    const humanPlayer = aiPlayer === 'X' ? 'O' : 'X';
    const bestMove = this.minimax(board, aiPlayer, humanPlayer, aiPlayer);
    return { row: bestMove.row, col: bestMove.col };
  }

  validateGameField(currentBoard: GameBoard, previousBoard: GameBoard): boolean {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (previousBoard[i][j] !== null && previousBoard[i][j] !== currentBoard[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  checkGameOver(board: GameBoard): {
    isOver: boolean;
    winner: 'X' | 'O' | 'draw' | null;
  } {
    const winner = this.checkWinner(board);
    if (winner) {
      return { isOver: true, winner };
    }
    
    if (this.isBoardFull(board)) {
      return { isOver: true, winner: 'draw' };
    }
    
    return { isOver: false, winner: null };
  }

  private minimax(
    board: GameBoard,
    aiPlayer: 'X' | 'O',
    humanPlayer: 'X' | 'O',
    currentPlayer: 'X' | 'O',
    depth: number = 0
  ): { row: number; col: number; score: number } {
    const winner = this.checkWinner(board);
    
    if (winner === aiPlayer) {
      return { row: -1, col: -1, score: 10 - depth };
    } else if (winner === humanPlayer) {
      return { row: -1, col: -1, score: -10 + depth };
    } else if (this.isBoardFull(board)) {
      return { row: -1, col: -1, score: 0 };
    }
    
    const moves: { row: number; col: number; score: number }[] = [];
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === null) {
          board[i][j] = currentPlayer;
          
          const result = this.minimax(
            board,
            aiPlayer,
            humanPlayer,
            currentPlayer === aiPlayer ? humanPlayer : aiPlayer,
            depth + 1
          );
          
          board[i][j] = null;
          
          moves.push({
            row: i,
            col: j,
            score: result.score,
          });
        }
      }
    }
    
    let bestMove = moves[0];
    
    if (currentPlayer === aiPlayer) {
      let maxScore = -Infinity;
      for (const move of moves) {
        if (move.score > maxScore) {
          maxScore = move.score;
          bestMove = move;
        }
      }
    } else {
      let minScore = Infinity;
      for (const move of moves) {
        if (move.score < minScore) {
          minScore = move.score;
          bestMove = move;
        }
      }
    }
    
    return bestMove;
  }

  private checkWinner(board: GameBoard): 'X' | 'O' | null {
    const lines = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];
    
    for (const line of lines) {
      const [a, b, c] = line;
      const valA = board[a[0]][a[1]];
      const valB = board[b[0]][b[1]];
      const valC = board[c[0]][c[1]];
      
      if (valA !== null && valA === valB && valA === valC) {
        return valA;
      }
    }
    
    return null;
  }

  private isBoardFull(board: GameBoard): boolean {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === null) {
          return false;
        }
      }
    }
    return true;
  }
}