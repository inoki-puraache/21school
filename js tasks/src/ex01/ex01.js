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

const [n, l, o] = prompt().split(" ");
const ship = new Ship(n, +l, +o);
ship.hit(0);
ship.hit(1);
console.log(`"${ship.name}", ${ship.length}, ${ship.orientation}, ${ship.isSunk()}`);