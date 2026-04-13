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
        this._attackedCells = [];
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
    
    receiveAttack(x, y) {
        this._attackedCells.push(`${x},${y}`);
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
    
    allShipsSunk() {
        return this._ships.every(ship => ship.isSunk());
    }
    
    isCellAttacked(x, y) {
        return this._attackedCells.includes(`${x},${y}`);
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
    
    async takeTurn(opponent) {
        const input = prompt(`${this._name}, введите координаты атаки (x y):`);
        const [x, y] = input.split(" ").map(Number);
        return { x, y, opponent };
    }
}

class HumanPlayer extends Player {
    constructor(name, boardSize) {
        super(name, boardSize);
    }
    
    placeShips(shipName, length, isVertical, startPosition) {
        const ship = new Ship(shipName, length, isVertical ? 1 : 0);
        this._board.placeShip(ship, startPosition.x, startPosition.y);
    }
    
    async takeTurn(opponent) {
        const input = prompt(`${this._name}, введите координаты атаки (x y):`);
        const [x, y] = input.split(" ").map(Number);
        return { x, y, opponent };
    }
}

class AIPlayer extends Player {
    constructor(name, boardSize) {
        super(name, boardSize);
        this._lastAttacks = [];
    }
    
    placeShips(shipName, length, isVertical, startPosition) {
        const ship = new Ship(shipName, length, isVertical ? 1 : 0);
        this._board.placeShip(ship, startPosition.x, startPosition.y);
    }
    
    async takeTurn(opponent) {
        let x, y;
        do {
            x = Math.floor(Math.random() * this._boardSize);
            y = Math.floor(Math.random() * this._boardSize);
        } while (opponent.board.isCellAttacked(x, y));
        
        return { x, y, opponent };
    }
}

class App {
    constructor(boardSize, maxShipLength, maxShipsCount) {
        this._boardSize = boardSize;
        this._maxShipLength = maxShipLength;
        this._maxShipsCount = maxShipsCount;
        this._firstPlayer = null;
        this._secondPlayer = null;
    }
    
    get boardSize() { return this._boardSize; }
    set boardSize(v) { this._boardSize = v; }
    get maxShipLength() { return this._maxShipLength; }
    set maxShipLength(v) { this._maxShipLength = v; }
    get maxShipsCount() { return this._maxShipsCount; }
    set maxShipsCount(v) { this._maxShipsCount = v; }
    get firstPlayer() { return this._firstPlayer; }
    set firstPlayer(v) { this._firstPlayer = v; }
    get secondPlayer() { return this._secondPlayer; }
    set secondPlayer(v) { this._secondPlayer = v; }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async run() {
        const input = prompt();
        const parts = input.split(" ");
        const name1 = parts[0];
        const name2 = parts[1];
        const boardSize = parseInt(parts[2]);
        const maxShipLength = parseInt(parts[3]);
        const maxShipsCount = parseInt(parts[4]);
        
        this._boardSize = boardSize;
        this._maxShipLength = maxShipLength;
        this._maxShipsCount = maxShipsCount;
        
        this._firstPlayer = new AIPlayer(name1, this._boardSize);
        this._secondPlayer = new AIPlayer(name2, this._boardSize);
        
        const ship1 = new Ship("Ship1", 3, 0);
        this._firstPlayer.board.placeShip(ship1, 0, 0);
        
        const ship2 = new Ship("Ship2", 2, 1);
        this._secondPlayer.board.placeShip(ship2, 3, 1);
        
        let currentPlayer = this._firstPlayer;
        let opponent = this._secondPlayer;
        let gameOver = false;
        let turnCount = 0;
        
        while (!gameOver && turnCount < 50) {
            const { x, y } = await currentPlayer.takeTurn(opponent);
            console.log(`${currentPlayer.name} (${x},${y})`);
            
            opponent.board.receiveAttack(x, y);
            await this.sleep(1000);
            
            if (opponent.board.allShipsSunk()) {
                console.log(currentPlayer.name);
                gameOver = true;
                break;
            }
            
            turnCount++;
            [currentPlayer, opponent] = [opponent, currentPlayer];
        }
    }
}

const app = new App(5, 3, 1);
app.run();