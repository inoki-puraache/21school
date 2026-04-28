class Ship {
  constructor(name, length, orientation) {
      this._name = name;
      this._length = length;
      this._orientation = orientation;
      this._hits = new Array(length).fill(false);
      this._startPosition = { x: null, y: null };
  }
  
  get name() { return this._name; }
  set name(v) { this._name = v; }
  get length() { return this._length; }
  set length(v) { this._length = v; }
  get orientation() { return this._orientation; }
  set orientation(v) { this._orientation = v; }
  get hits() { return this._hits; }
  set hits(v) { this._hits = v; }
  get startPosition() { return this._startPosition; }
  set startPosition(v) { this._startPosition = v; }
  get x() { return this._startPosition.x; }
  set x(v) { this._startPosition.x = v; }
  get y() { return this._startPosition.y; }
  set y(v) { this._startPosition.y = v; }
  
  hit(i) { if (i >= 0 && i < this._length) this._hits[i] = true; }
  isSunk() { return this._hits.every(h => h); }
}

class Board {
  constructor(size) {
      this._size = size;
      this._grid = Array(size).fill().map(() => Array(size).fill(null));
      this._ships = [];
  }
  
  get size() { return this._size; }
  set size(v) { this._size = v; }
  get ships() { return this._ships; }
  set ships(v) { this._ships = v; }
  get grid() { return this._grid; }
  set grid(v) { this._grid = v; }
  
  placeShip(ship, x, y) {
      ship.x = x;
      ship.y = y;
      for (let i = 0; i < ship.length; i++) {
          let posX = x, posY = y;
          if (ship.orientation === 0) posY = y + i;
          else posX = x + i;
          if (posX < this._size && posY < this._size) {
              this._grid[posX][posY] = ship;
          }
      }
      this._ships.push(ship);
  }
  
  findAvailableCells() {
      const available = [];
      for (let i = 0; i < this._size; i++) {
          for (let j = 0; j < this._size; j++) {
              if (this._grid[i][j] === null) {
                  available.push({ x: i, y: j });
              }
          }
      }
      return available;
  }
  
  receiveAttack(x, y) {
      if (this._grid[x][y] !== null) {
          const ship = this._grid[x][y];
          let index;
          if (ship.orientation === 0) index = y - ship.y;
          else index = x - ship.x;
          ship.hit(index);
          return true;
      }
      return false;
  }
  
  display() {
      for (let i = 0; i < this._size; i++) {
          let row = '';
          for (let j = 0; j < this._size; j++) {
              if (this._grid[i][j] === null) row += 'O ';
              else {
                  const ship = this._grid[i][j];
                  let index;
                  if (ship.orientation === 0) index = j - ship.y;
                  else index = i - ship.x;
                  if (ship.hits[index]) row += 'X ';
                  else row += 'S ';
              }
          }
          console.log(row);
      }
  }
}

class Player {
  constructor(name, boardSize) {
      this._name = name;
      this._boardSize = boardSize;
      this._board = new Board(boardSize);
  }
  
  get name() { return this._name; }
  set name(v) { this._name = v; }
  get boardSize() { return this._boardSize; }
  set boardSize(v) { this._boardSize = v; }
  get board() { return this._board; }
  
  placeShips(shipName, length, isVertical, startPosition) {
      const ship = new Ship(shipName, length, isVertical ? 1 : 0);
      this._board.placeShip(ship, startPosition.x, startPosition.y);
  }
  
  takeTurn(opponent) {
      const input = prompt(`${this._name}, введите координаты атаки (x y):`);
      const [x, y] = input.split(" ").map(Number);
      return { x, y, opponent };
  }
}

const input = prompt();
const [playerName, boardSize] = input.split(" ");
const player = new Player(playerName, parseInt(boardSize));
console.log(`"${player.name}", ${player.boardSize}`);