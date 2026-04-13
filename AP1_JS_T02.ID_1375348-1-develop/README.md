# Project 02 — JavaScript_Bootcamp

**Summary**: In this project, you’ll learn to apply object-oriented, procedural, and multi-paradigm approaches in JavaScript, as well as write code using the **functional programming paradigm**.

💡 [Click here](https://new.oprosso.net/p/4cb31ec3f47a4596bc758ea1861fb624) to give us feedback on this project. It’s anonymous and helps our team improve the learning experience. We recommend filling out the form right after completing the project.

## Contents

  - [Chapter I](#chapter-i)
    - [Instructions](#instructions)
  - [Chapter II](#chapter-ii)
    - [General Information](#general-information)
  - [Chapter III](#chapter-iii)
    - [Project: Sea Confrontation](#project-sea-confrontation)
    - [Task 0 — Creating the project](#task-0--creating-the-project)
    - [Task 1 — Designing the Ship](#task-1--designing-the-ship)
    - [Task 2 — Designing the Board](#task-2--designing-the-board)
    - [Task 3 — Designing the Player](#task-3--designing-the-player)
    - [Task 4 — Designing the App](#task-4--designing-the-app)
    - [Task 5 — Designing the HumanPlayer](#task-5--designing-the-humanplayer)
    - [Task 6 — Designing the AIPlayer](#task-6--designing-the-aiplayer)
    - [Task 7 — Human vs AI: Judgment Day! Choosing your opponent](#task-7--human-vs-ai-judgment-day-choosing-your-opponent)
    - [Task 8 — Tick-tock, your move! Displaying game progress](#task-8--tick-tock-your-move-displaying-game-progress)
    - [Task 9 — Players in waiting: asynchronous mode](#task-9--players-in-waiting-asynchronous-mode)
    - [Task 10 — Robo-duel at sea: configuring an AI test match](#task-10--robo-duel-at-sea-configuring-an-ai-test-match)



## Chapter I 
### Instructions

1. Throughout this course, you’ll experience uncertainty and a lack of information — that’s completely normal. Don’t forget that the repository and Google are always at your disposal. As are your peers and Rocket.Chat. Communicate. Explore. Use common sense. Don’t be afraid to make mistakes.
2. Be careful with your sources. Verify them. Think critically. Analyze and compare.
3. Read the tasks carefully. Then read them again.
4. Study the examples attentively — they may contain details that aren’t explicitly mentioned in the task description.
5. You might encounter inconsistencies where something in the task or an example contradicts previous instructions. Try to resolve them. If you can’t — write down your question in the open questions section and clarify it during the process. Don’t leave unresolved issues behind.
6. If a task seems unclear or impossible — it probably just seems that way. Break it down into smaller parts. Those parts will likely make sense.
7. You’ll come across various tasks along the way. Those marked with an asterisk (\*) are for the especially curious. They’re more advanced and optional — but completing them will give you extra experience and knowledge.
8. Don’t try to cheat the system or others — you’ll only end up cheating yourself.
9. Got a question? Ask the person to your right. Didn’t help? Ask the person to your left.
10. If you’re getting help — make sure you understand why, how, and what’s going on. Otherwise, that help won’t actually help.
11. Always push your work to the develop branch. The master branch will be ignored. Work inside the src directory.
12. Your directory must not contain any files other than those specified in the task.

## Chapter II
### General Information

**Topics to explore:**

- Object-oriented / procedural / multi-paradigm programming in JavaScript
- Differences between JavaScript and C / C++
- The functional programming paradigm
- Asynchronous and parallel programming

## Chapter III 
### Project: Sea Confrontation

This project explores object-oriented, procedural, and multi-paradigm programming approaches in JavaScript, including writing code in the **functional paradigm** and implementing **asynchronous/parallel programming** — through building a simplified version of the classic _Battleship_ game.

Note: Each task should be implemented as a separate project.  
For example:  
`T02/src/exercise0`, `T02/src/exercise1`, …, `T02/src/exerciseN-1`,  
where N is the number of tasks.  
If a task depends on the previous one, simply copy the previous project into the new folder and continue development from there.

### Task 0 — Creating the project

To run script files, you’ll need any modern browser and integrated development environment.  
For this project, we’ll use Chrome and Visual Studio Code.

**Steps:**

1\. In any directory, create a new project folder named javascript-sea-battle.
2\. Inside, create an index.html file and add the following base content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sea Battle</title>
    <script src="exercise-1.js"></script>
</head>
<body>
    
</body>
</html>
```

3\. Inside the same folder, create a basic script file with the following content:

```javascript
console.log('Starting Task 1!');
```

4\. To view the result, open your browser’s developer tools:

- Press F12, or
- Right-click anywhere on the page and select **Inspect** or **View Page Source**

### Task 1 — Designing the Ship

- Create a class named `Ship`.
- Implement the constructor to accept the following parameters:
  - Ship name
  - Ship length
  - Orientation (0 — horizontal, 1 — vertical)
- Inside the constructor:
  - Create a field `hits`, which is a one-dimensional array of booleans initialized to `false` — representing whether each segment of the ship has been hit
  - Create a field `startPosition`, which is an object with `x` and `y` properties representing the ship's starting position
- Add getters and setters for all the fields: name, length, orientation, `hits`, `startPosition`, and the individual x, y values of the position
- Implement a method `hit` that marks the specified segment of the ship as hit by setting `hits` = `true`
- Implement a method `isSunk` that checks if all segments of the ship are hit and returns `true` if the ship is sunk, or `false` otherwise
- Use the `prompt` function to read the `Ship` name, length, and orientation. Create an instance of the class using the name Ship, length `5`, and orientation `1` (vertical)
- Set the first two cells of the `hits` array to `true`
- Output the ship’s name, length, orientation, and result of `isSunk` separated by commas

| Входные данные                                               | Выходные данные      |
|--------------------------------------------------------------|----------------------|
|  "Ship 5 1"                                                  | "Ship", 5, 1, false  |

### Task 2 — Designing the Board

- Create a class named `Board`.
- The constructor should take a single parameter: `size` — the dimension of the square board.
- Inside the constructor:
  - Create a two-dimensional array `grid`, initialized with `null` values
  - Create an array `ships` to store placed ship instances
- Implement getters and setters for the fields `size`, `grid`, and `ships`
- Create a method `placeShip(ship, x, y)` which takes a `ship` instance and a starting position. The function places the ship on the board at the specified coordinates
- Create a method `findAvailableCells` that returns an array of available (empty) cells in the form { `x`, `y` }. If no cells are available, return an empty array
- Create a method `receiveAttack(x, y)` which returns `true` or `false` depending on whether an enemy ship exists at the given coordinates. If a ship is hit, mark it as damaged
- Create a method `display()` that prints the current state of the board:
  - `O` for empty cells
  - `S` for ship segments
  - `X` for hit segments
- Use `prompt` to input the board size and create a Board instance
- Create a `Ship` instance named `ShipTest` with length `3` and orientation `0` (horizontal)
- Use `placeShip` to place it at coordinates `0`, `0`
- Print the board size and the result of `receiveAttack(1, 0)`, separated by commas

**Input / Output Example**

| Input                                                        | Output            |
|--------------------------------------------------------------|-------------------|
|  5                                                           | 5, true           |

### Task 3 — Designing the Player

- Create a class named `Player`.
- The constructor should take two arguments:
  - `name` — the player’s name
  - `boardSize` — the size of the board
- Inside the constructor, initialize an instance of the Board class using the given boardSize
- Add getters and setters for `name` and `boardSize`
- Create a method `placeShips(shipName, length, isVertical, startPosition)` that:
  - Accepts the ship’s name, length, orientation, and starting position
  - Creates a Ship instance and places it using the `placeShip` method of the player's board
- Create a method `takeTurn(opponent)` that:
  - Accepts another Player instance as an argument
  - Uses `prompt` to ask the user for attack coordinates
  - Returns an object containing the attack coordinates and the opponent object: (`x`, `y`, `opponent`)
- Use `prompt` to input the player’s name and board size in a single string (e.g. "Max 5"), and store the values
- Create an instance of the Player class using those values
- Output the player’s name and board size, separated by a comma

| Input                                                        | Output            |
|--------------------------------------------------------------|-------------------|
|  "Max 5"                                                     | "Max", 5          |

### Task 4 — Designing the App

- Create a class named `App`.
- The constructor should take three parameters:
  - Board size
  - Maximum ship length
  - Maximum number of ships
- Implement getters and setters for all of these properties
- Add class fields `firstPlayer` and `secondPlayer` to represent the two players in the game
- Implement a method `shipArrangement(player, shipCount, maxShipLength)` that:
  - Takes a Player instance, number of ships, and maximum ship length
  - Iteratively prompts the user for ship parameters, creates ship instances, and places them on the player's board
- Implement a method `run` that:
  - Handles the creation of players, ship placement, and game loop
  - Manages alternating turns between players until one player's ships are all sunk
- Create an instance of `App` with the following parameters:
  - Board size = `5`
  - Ship length = `3`
  - Ship count = `1`
- Call the `run` method and play a game between two players:
  - First player places a ship of length `3` at `(0,0)` horizontally
  - Second player places a ship of length `2` at `(3,1)` vertically
  - Turn order:
        1. First player attacks `(3,1)`
        2. Second player attacks `(0,0)`
        3. First player attacks `(3,2)` and wins the game
- The program should print:
  - Each player’s name
  - Number and lengths of their ships
  - Starting coordinates and orientation (in the format (x,y), orientation)
  - The name of the winning player

| Input                                                        | Output            |
|--------------------------------------------------------------|-------------------|
|  "Max 1 3 0,0 0"                                             | "Max 1 3 0,0 0"   |
|  "Alex 1 2 3,1 1"                                            | "Alex 1 2 3,1 1"  |
|                                                              | "Max"             |

### Task 5 — Designing the HumanPlayer

- Create a class named `HumanPlayer`.
- This class should inherit from the `Player` class.
- Override the methods `placeShips` and `takeTurn` to customize behavior for a human-controlled player.
- Create an instance of HumanPlayer and output the player's name.

| Input                                                        | Output            |
|--------------------------------------------------------------|-------------------|
|  "Max"                                                       | "Max"             |

### Task 6 — Designing the AIPlayer

- Create a class named `AIPlayer` that represents a computer-controlled player.
- This class should inherit from the `Player` class.
- Override the methods `placeShip` and `takeTurn` using any logic.  
    For simplicity, you may generate random starting positions for ship placement and attack coordinates.
- Create an instance of AIPlayer and output the player's name.

| Input                                                        | Output            |
|--------------------------------------------------------------|-------------------|
|  "AIPlayer"                                                  | "AIPlayer"        |

### Task 7 — Human vs AI: Judgment Day! Choosing your opponent

- Modify the `App` class to prompt the user to choose the type of opponent before the game starts:
  - 1 — human
  - 0 — computer
- Based on the input, instantiate the appropriate player class
- Run a test game against an AI opponent and print the names of both players, followed by the name of the winning player

| Input                                                        | Output            |
|--------------------------------------------------------------|-------------------|
|  "Max 1 3 0,0 0"                                             |                   |
|  "AIPlayer"                                                  | "Max AIPlayer Max"|

### Task 8 — Tick-tock, your move! Displaying game progress

- Add a 1-second delay between player turns
- Play one full game
- During the game, print the name of the current player and their attack coordinates
- At the end, print the name of the winning player

| Input                                                        | Output            |
|--------------------------------------------------------------|-------------------|
|  "Max 1 3 0,0 0"                                             | "Max (3,1)"       |
|  "Alex 1 2 3,1 1"                                            | "Alex (3,3)"      |
|                                                              | "Max (3, 2)"      |
|                                                              | "Max"             |

### Task 9 — Players in waiting: asynchronous mode

- The `takeTurn` function in the `Player` class and all its subclasses should be made asynchronous
- Play one full game
- During the game, print the name of the current player and their attack coordinates
- At the end, print the name of the winning player

| Input                                                        | Output            |
|--------------------------------------------------------------|-------------------|
|  "Max 1 3 0,0 0"                                             | "Max (3,1)"       |
|  "Alex 1 2 3,1 1"                                            | "Alex (3,3)"      |
|                                                              | "Max (3, 2)"      |
|                                                              | "Max"             |

### Task 10 — Robo-duel at sea: configuring an AI test match

- Play a game where a computer-controlled player faces another AI player
- During the game, print the name of the current player and their attack coordinates
- At the end, print the name of the winning player
- Game setup parameters (provided as input):
  - Player names
  - Board size = `5`
  - Maximum ship length = `3`
  - Number of ships = `1`

| Input                                                        | Output              |
|--------------------------------------------------------------|---------------------|
|  "AIMax AIAlex 5 3 1"                                        | "AIMax (3,1)"       |
|                                                              | "AIAlex (3,3)"      |
|                                                              | "AIMax (3, 2)"      |
|                                                              | "AIMax"             |