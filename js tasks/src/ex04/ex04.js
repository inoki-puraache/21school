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
    
    allShipsSunk() {
        return this._ships.every(ship => ship.isSunk());
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
    
    run() {
        const player1Input = prompt();
        const p1Parts = player1Input.split(" ");
        const name1 = p1Parts[0];
        const shipCount1 = parseInt(p1Parts[1]);
        const shipLength1 = parseInt(p1Parts[2]);
        const p1Coords = p1Parts[3].split(",");
        const x1 = parseInt(p1Coords[0]);
        const y1 = parseInt(p1Coords[1]);
        const orient1 = parseInt(p1Parts[4]);
        
        const player2Input = prompt();
        const p2Parts = player2Input.split(" ");
        const name2 = p2Parts[0];
        const shipCount2 = parseInt(p2Parts[1]);
        const shipLength2 = parseInt(p2Parts[2]);
        const p2Coords = p2Parts[3].split(",");
        const x2 = parseInt(p2Coords[0]);
        const y2 = parseInt(p2Coords[1]);
        const orient2 = parseInt(p2Parts[4]);
        
        this._firstPlayer = new Player(name1, this._boardSize);
        this._secondPlayer = new Player(name2, this._boardSize);
        
        const ship1 = new Ship("Ship1", shipLength1, orient1);
        this._firstPlayer.board.placeShip(ship1, x1, y1);
        console.log(`${name1} ${shipCount1} ${shipLength1} ${x1},${y1} ${orient1}`);
        
        const ship2 = new Ship("Ship2", shipLength2, orient2);
        this._secondPlayer.board.placeShip(ship2, x2, y2);
        console.log(`${name2} ${shipCount2} ${shipLength2} ${x2},${y2} ${orient2}`);
        
        const attacks = [[3, 1], [0, 0], [3, 2]];
        let attackIndex = 0;
        let currentPlayer = this._firstPlayer;
        let opponent = this._secondPlayer;
        
        while (attackIndex < attacks.length) {
            const [x, y] = attacks[attackIndex];
            opponent.board.receiveAttack(x, y);
            
            if (opponent.board.allShipsSunk()) {
                console.log(currentPlayer.name);
                break;
            }
            
            if (attackIndex === attacks.length - 1) {
                console.log(currentPlayer.name);
            }
            
            attackIndex++;
            [currentPlayer, opponent] = [opponent, currentPlayer];
        }
    }
}

const app = new App(5, 3, 1);
app.run();