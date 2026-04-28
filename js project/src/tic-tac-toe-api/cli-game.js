const readline = require('readline');

const API_URL = 'http://localhost:3000/game';

let gameId = null;
let currentPlayer = 'X';
let currentBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function newGame() {
  try {
    const response = await fetch(API_URL, { method: 'POST' });
    const game = await response.json();
    gameId = game.id;
    currentPlayer = 'X';
    currentBoard = game.board;
    console.clear();
    console.log('\x1b[36m%s\x1b[0m', '=================================');
    console.log('\x1b[36m%s\x1b[0m', '       КРЕСТИКИ-НОЛИКИ');
    console.log('\x1b[36m%s\x1b[0m', '=================================');
    console.log(`\nID игры: ${gameId}`);
    console.log('\x1b[33m%s\x1b[0m', '\nВы играете за X');
    console.log('Компьютер играет за O\n');
    updateBoard(currentBoard);
    makeMove();
  } catch (error) {
    console.log('\x1b[31m%s\x1b[0m', 'Ошибка подключения к серверу. Убедитесь, что сервер запущен.');
    process.exit(1);
  }
}

function updateBoard(board) {
  currentBoard = board;
  console.log('\n');
  console.log('    1   2   3');
  console.log('  ┌───┬───┬───┐');
  for (let i = 0; i < 3; i++) {
    process.stdout.write(`${i + 1} │`);
    for (let j = 0; j < 3; j++) {
      const value = board[i][j];
      if (value === 'X') {
        process.stdout.write(` \x1b[34mX\x1b[0m │`);
      } else if (value === 'O') {
        process.stdout.write(` \x1b[31mO\x1b[0m │`);
      } else {
        process.stdout.write('   │');
      }
    }
    console.log('');
    if (i < 2) {
      console.log('  ├───┼───┼───┤');
    }
  }
  console.log('  └───┴───┴───┘');
  console.log('\n');
}

function printStatus(message, isError = false) {
  if (isError) {
    console.log('\x1b[31m%s\x1b[0m', message);
  } else {
    console.log('\x1b[32m%s\x1b[0m', message);
  }
}

function parseMove(input) {
  const parts = input.trim().split(' ');
  if (parts.length !== 2) return null;
  
  const row = parseInt(parts[0]) - 1;
  const col = parseInt(parts[1]) - 1;
  
  if (isNaN(row) || isNaN(col)) return null;
  if (row < 0 || row > 2 || col < 0 || col > 2) return null;
  
  return { row, col };
}

async function makeMove() {
  if (!gameId) return;
  
  rl.question('\nВведите координаты (строка столбец, например: 2 2): ', async (input) => {
    const move = parseMove(input);
    
    if (!move) {
      printStatus('Неверный формат. Введите два числа от 1 до 3, например: 2 2', true);
      makeMove();
      return;
    }
    
    if (currentBoard[move.row][move.col] !== null) {
      printStatus('Эта клетка уже занята!', true);
      makeMove();
      return;
    }
    
    const newBoard = copyBoard(currentBoard);
    newBoard[move.row][move.col] = 'X';
    
    try {
      const response = await fetch(`${API_URL}/${gameId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          board: newBoard,
          currentPlayer: 'X'
        })
      });
      
      const result = await response.json();
      
      if (result.statusCode === 404) {
        printStatus('Игра не найдена. Создайте новую', true);
        newGame();
        return;
      }
      
      if (result.statusCode === 400) {
        printStatus(result.message, true);
        makeMove();
        return;
      }
      
      updateBoard(result.board);
      currentPlayer = result.currentPlayer;
      
      if (result.isOver) {
        if (result.winner === 'draw') {
          printStatus('\nНИЧЬЯ!');
        } else {
          printStatus(`\nПОБЕДИТЕЛЬ: ${result.winner}!`);
        }
        rl.close();
        return;
      }
      
      makeMove();
    } catch (error) {
      printStatus('Ошибка подключения к серверу', true);
      rl.close();
    }
  });
}

function copyBoard(board) {
  return board.map(row => [...row]);
}

newGame();