# Topics

- OOP: oop.md
- Functional Programming: fop.md
- Modules: modules.md
- Asynchronous Programming: async.md
- Differences from C and C++: difference.md
- Example Project Implementation: possible_option.md

# Methodological Guidelines for Assignments

## Task 1: Designing the Ship

The ship constructor may look like this: the first parameter is the name, the second is the length, and the third is the orientation.  
The `hit` method accepts an index and marks the corresponding segment of the ship as hit, within the bounds of the ship’s hits array.  
The `isSunk` method should verify whether all segments of the ship have been hit and return the result accordingly.

## Task 2: Designing the Board

The `placeShip` function places a ship on the board depending on its orientation.  
If the orientation is vertical, the ship is placed vertically in the grid from the start position; if horizontal — then horizontally, taking the starting coordinates into account.

## Task 3: Designing the Player

Inside the `placeShips` function, an instance of the Ship class is created and the board’s `placeShip` method is called.  
The return value of the `takeTurn` method can look like this:

```javascript
return { x, y, opponentPlayer }
```

## Task 4: Designing the App

In the `shipArrangement` function, input is requested for ship placement.

The `run` function handles the core game logic: turn switching between players, and checking for a winner.

## Task 5: Designing the HumanPlayer

This class represents a human player and inherits from the `Player` class.  
It implements the `takeTurn` and `placeShips` methods.

## Task 6: Designing the AIPlayer

This class represents a computer-controlled player and also inherits from the `Player` class.  
It implements the `takeTurn` and `placeShips` methods. The implementations can vary, but the simplest option is a random-based strategy.

## Task 7: Human vs AI — Judgement Day

The player is prompted to choose whether they’ll play against a human or an AI.  
This change requires updating the `run` and `shipArrangement` functions accordingly.

## Task 8: Tick-tock, your move! Game progress display

To implement a turn delay, use `setTimeout` inside the `takeTurn` method.  
For details, refer to `async.md`.

## Task 9: Players in waiting: asynchronous mode

Asynchronous behavior is implemented using `async / await`.  
See `async.md` for more information.

## Task 10: Robo-duel at sea: configuring an AI test match

Game parameters are provided via input, and two computer-controlled players are created.