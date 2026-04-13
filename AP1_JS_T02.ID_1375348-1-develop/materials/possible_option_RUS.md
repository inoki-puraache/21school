# Возможная реализация игры "Морская конфронтация"

```javascript
class Ship {
    constructor(name, length, isVertical) {
      this._name = name;
      this._length = length;
      this._isVertical = isVertical;
      this._hits = new Array(length).fill(false);
      this._startPosition = {
        x: null,
        y: null,
      };
    }

    set name(name) {
        this._name = name;
    } 

    get name() {
        return this._name;
    }

    get length() {
        return this._length;
    }

    get hits() {
        return this._hits;
    }

    set startPosition(position) {
        this._startPosition = position;
    }

    get startPosition() {
        return this._startPosition;
    }

    get x() {
        return this._startPosition.x;
    }

    set x(x) {
        this._startPosition.x = x;
    }

    get y() {
        return this._startPosition.y;
    }

    set y(y) {
        this._startPosition = y;
    }

    get isVertical() {
        return this._isVertical;
    }

    set isVertical(isVertical) {
        this._isVertical = isVertical;
    }
  
    hit(position) {

      if (position >= 0 && position < this.length) {

        this.hits[position] = true;

        return true; 
      }

      return false; 
    }
  
    isSunk() {
      return this.hits.every((hit) => hit);
    }
}
  
class Board {
    constructor(size) {
      this._size = size;
      this._grid = new Array(size)
        .fill(null)
        .map(() => new Array(size).fill(null));
      this._ships = [];
    }

    get size() {
        return this._size;
    }

    set size(size) {
        this._size = size;
    }

    get ships() {
        return this._ships;
    }

    get grid() {
        return this._grid;
    }
  
    placeShip(ship, x, y) {
      ship.startPosition.x = x;
      ship.startPosition.y = y;
  
      if (ship.isVertical) {
        for (let i = 0; i < ship.length; i++) {
          this.grid[x + i][y] = ship;
        }
      } else {
        for (let i = 0; i < ship.length; i++) {
          this.grid[x][y + i] = ship;
        }
      }
  
      this.ships.push(ship);
    }

    findAvailableCells() {
      const availableCells = [];
  
      for (let row = 0; row < this.size; row++) {

        for (let col = 0; col < this.size; col++) {

          if (!this.grid[row][col]) {

            availableCells.push({ x: row, y: col });

          }

        }

      }
  
      return availableCells;
    }
  
    receiveAttack(x, y) {
      const target = this.grid[x][y];

      if (target instanceof Ship) {

        const hitPosition = target.isVertical ? x - target.startPosition.x : y - target.startPosition.y;

        target.hit(hitPosition);

        return true; 
      }

      return false; 
    }
  
    display() {

        // Вывод нумерации доски
        const charCode = 'A'.charCodeAt(0);

        let rowNumeration = '%c  ';

        for (let i = charCode; i < charCode + this.size; i ++) {
            rowNumeration += String.fromCharCode(i) + ' ';
        }

        console.log(rowNumeration, 'font-weight: bold');

        // вывод кораблей

        for (let row = 0; row < this.size; row++) {

            let rowString = (row + 1).toString() + '|';

            for (let col = 0; col < this.size; col++) {

                if (this.grid[row][col] instanceof Ship && 
                   (
                    (this.grid[row][col].isVertical && this.grid[row][col].hits[row - this.grid[row][col].x]) ||
                    (!this.grid[row][col].isVertical && this.grid[row][col].hits[col - this.grid[row][col].y])
                   )
                ) {

                    rowString += 'X '; 

                } else if (this.grid[row][col] instanceof Ship) {

                    rowString += 'S '; 

                } else {

                    rowString += 'O '; 
                }
            }

            console.log(rowString);
        }
    }
}
  
class Player {
    constructor(name, boardSize) {
      this._name = name;
      this._board = new Board(boardSize);
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    } 

    get board() {
        return this._board;
    }
  
    placeShips(shipName, length, isVertical, startPosition) {
      throw new Error("Method has not been implemented");
    }
  
    takeTurn(opponent) {
      throw new Error("Method has not been implemented");
    }
}

class HumanPlayer extends Player {
    constructor(name, boardSize) {
      super(name, boardSize);
    }

    placeShips(shipName, length, isVertical, startPosition) {
      const ship1 = new Ship(`${this.name} ${shipName}`, length, isVertical);

      ship1.startPosition = startPosition;

      this.board.placeShip(ship1, startPosition.x, startPosition.y);
    }

    takeTurn(opponent) {
      const playerInput = prompt(`${this.name}, введите координаты атаки (например, "A3"): `);

      const y = playerInput.charCodeAt(0) - 'A'.charCodeAt(0);

      const x = Number(playerInput[1]) - 1;

      return { x, y, opponent };
    }
}

class AIPlayer extends Player {

    constructor(name, boardSize) {
      super(name, boardSize);
    }

    placeShips(shipName, length, isVertical, startPosition) {
      const ship1 = new Ship(`${this.name} ${shipName}`, length, isVertical);

      ship1.startPosition = startPosition;

      this.board.placeShip(ship1, startPosition.x, startPosition.y);
    }

    takeTurn(opponent) {

      const availableCells = opponent.board.findAvailableCells();

      // Выбор случайной доступной клетки

      const randomIndex = Math.floor(Math.random() * availableCells.length);

      const { x, y } = availableCells[randomIndex];

      console.log(`x: ${x}, y: ${y}`);

      return { x, y, opponent };
    }
}


class App {

    firstPlayer = null;

    secondPlayer = null;

    constructor(boardSize, maxShipLength, shipCount) {

      this._boardSize = boardSize;
      this._maxShipLength = maxShipLength;
      this.shipCount = shipCount;

    }

    get boardSize() {
      return this._boardSize;
    }

    set boardSize(size) {
      this._boardSize = size;
    }

    get maxShipLength() {
      return this._maxShipLength;
    }

    set maxShipLength(len) {
      this._maxShipLength = len;
    }

    get shipCount() {
      return this._shipCount;
    }

    set shipCount(count) {
      this._shipCount = count;
    }

    shipArrangement(player, shipCount, maxShipLength) {

      if (player instanceof HumanPlayer) {
        for(let i = 0; i < shipCount; i ++) {
          const shipInput = prompt
          (`
              ${player.name}, введите длину корабля до ${maxShipLength}, 
              Координату старта (Например A 1), 
              Расположение корабля : 1 - верт., 0 - гор.
              Все данные вводятся через запятую.
          `);
  
          const clearedInput = shipInput.split(',');
  
          const [shipLen, startPosStr, isVertical] = clearedInput;
  
          const startPos = {
              x: Number(startPosStr[1]) - 1,
              y: startPosStr.charCodeAt(0) - 'A'.charCodeAt(0),
          }
  
          player.placeShips('ship1', Number(shipLen), Boolean(Number(isVertical)), startPos);
        }
      } else {
  
        const randomShipLen = Math.floor(Math.random() * maxShipLength) + 1;
  
        const randomVertical = Boolean(Math.floor(Math.random()));
  
        const startPos = {x: Math.floor(Math.random() * maxShipLength), y: Math.floor(Math.random() * maxShipLength)};
  
        player.placeShips('ship1', randomShipLen, randomVertical, startPos);
      }
      
    }

    run() {

      const isHumanPrompt = prompt(`Играть с человеком? (1 - да, 0 - нет)`);

      if (Boolean(Number(isHumanPrompt))) {

        this.firstPlayer = new HumanPlayer('Player 1', this.boardSize);

        this.secondPlayer = new HumanPlayer('Player 2', this.boardSize);

      } else {

        this.firstPlayer = new HumanPlayer('Player 1', this.boardSize);

        this.secondPlayer = new AIPlayer('Player 2', this.boardSize);
      }

    

      this.shipArrangement(this.firstPlayer, this.shipCount, this.maxShipLength);

      this.shipArrangement(this.secondPlayer, this.shipCount, this.maxShipLength);
    
      let currentPlayer = this.firstPlayer;
    
      while (true) {
        console.log(`Доска ${this.firstPlayer.name}:`);

        this.firstPlayer.board.display();

        console.log(`\nДоска ${this.secondPlayer.name}:`);

        this.secondPlayer.board.display();
    
        const { x, y, opponent } = currentPlayer.takeTurn(currentPlayer === this.firstPlayer ? this.secondPlayer : this.firstPlayer);
    
        const successfulAttack = opponent.board.receiveAttack(x, y);
    
        if (successfulAttack) {

          console.log(`${currentPlayer.name}, успешная атака!`);

          const isSunk = opponent.board.ships.some((ship) => ship.isSunk());

          if (isSunk) {

            console.log(`${currentPlayer.name}, потопил все корабли противника! Поздравляю, вы победили!`);

            if (currentPlayer === this.firstPlayer) {
              console.log(`\nДоска ${this.secondPlayer.name}:`);

              this.secondPlayer.board.display();
            } else {

              console.log(`Доска ${this.firstPlayer.name}:`);

              this.firstPlayer.board.display();
            }

            break;
          }

        } else {

          console.log(`${currentPlayer.name}, промах!`);
        }
    
        currentPlayer = currentPlayer === this.firstPlayer ? this.secondPlayer : this.firstPlayer;
      }
    }
} 


const app = new App(5, 3, 1);

app.run();
  
  
```
