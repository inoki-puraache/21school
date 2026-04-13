# Project 03 — JavaScript Bootcamp

**Summary**: In this project, you'll learn how to build a web application using JavaScript, Node.js, and the Nest.js framework.

💡 [Click here](https://new.oprosso.net/p/4cb31ec3f47a4596bc758ea1861fb624) **to leave anonymous feedback on this project**. It only takes a moment and helps our team improve your learning experience. We recommend filling it out right after completing the project.

## Contents

1. [Chapter I](#chapter-i)   
    - [Guidelines](#instructions)
2. [Chapter II](#chapter-ii)
    - [General Information](#general-information)
3. [Chapter III](#chapter-iii)
    - [Task 0: Project setup and dependency installation](#task-0-setting-up-the-project-and-installing-dependencies)
    - [Task 1: Creating the project structure](#task-1-creating-the-project-structure)
    - [Task 2: Implementing the domain layer](#task-2-implementing-the-domain-layer)
    - [Task 3: Implementing the datasource layer](#task-3-implementing-the-datasource-layer)
    - [Task 4: Implementing the web layer](#task-4-implementing-the-web-layer)
    - [Task 5: Module registration and app launch](#task-5-module-registration-and-application-launch)

## Chapter I 
## Instructions

1. Throughout the course, you’ll often feel uncertain or like you’re missing key information — that’s normal. Remember: the repository, Google, your peers, and Rocket.Chat are always available. Communicate. Explore. Trust your reasoning. Don’t be afraid to make mistakes.
2. Be critical of your sources. Verify them. Think critically. Compare information.
3. Read the instructions carefully — more than once.
4. Pay close attention to examples. They might contain important details not explicitly mentioned in the task description.
5. You may encounter contradictions — where a new requirement in a task or example seems to conflict with something you’ve already seen. Try to resolve it. If you can’t, add it to your open questions and work through it as you go. Don’t leave questions unresolved.
6. If a task seems unclear or impossible — it only seems that way. Try breaking it down. The individual parts are likely easier to understand.
7. You’ll face all kinds of challenges. Tasks marked with an asterisk (\*) are optional and more advanced — great for those who want to go deeper. Completing them will give you extra practice and insight.
8. Don’t try to cheat the system or your peers. Ultimately, you’re only cheating yourself.
9. Have a question? Ask the person to your right. Didn’t help? Ask the one on your left.
10. When getting help, always make sure you understand: **why**, **how**, and **what for**. Otherwise, the help won’t be meaningful.
11. Always push your work to the develop branch. Anything in master will be ignored. Work in the src directory.
12. Your directory should contain **only** the files specified in the assignments.

## Chapter II
## General Information

A **web application** is a software program or service accessible via a web browser that typically interacts with users through a web interface. Web applications feature dynamic content and can provide a variety of functionalities such as data processing, collaboration, real-time updates, and other forms of interaction.

## Topics to explore:

- Web applications
- Node.js
- Nest.js
- API
- Minimax algorithm
- MVC (Model-View-Controller)

## Chapter III
### Project: Tic-Tac-Toe

This project introduces the fundamentals of creating a web application using Node.js and the Nest.js framework.  
To complete the assignments, you will need the current versions of Node.js and NestJS, as well as an IDE such as VS Code.

The project is created **once** and will be reused for all following tasks.

## Task 0. Setting up the project and installing dependencies

- If Node.js or NestJS is not installed yet, you’ll need to:
  - Install Node.js: either via a version manager like **nvm**, or directly from the [official website](https://nodejs.org"%20\t%20"_new).
  - Install NestJS globally: run the following command in your terminal:

```bash
npm i -g @nestjs/cli
```

- Choose a directory to store your project.
- Navigate to this directory in the terminal and create a project using the Nest CLI:

```bash
nest new tic-tac-toe-api
```

- To start the project, use the appropriate script as defined in your package.json, e.g.: npm start or npm run start:dev

## Task 1. Creating the project structure

- Your project should follow this architectural layout: `modules` (modular structure), `models` (data models), `services` (business logic), `controllers` (route handlers). The application should be split into the following layers: `web` layer, `domain` layer, `datasource` layer.
- Each layer must be implemented as a separate module.
- A module may contain nested modules.
- The `web` layer must include the following packages (at least): model, controller, mapper for communication with the client.
- The `domain` layer must include the following packages (at least): model, service for implementing the business logic.
- The `datasource` layer must include at least: model, repository, mapper for handling data access (e.g., working with databases).

## Task 2. Implementing the domain layer

- Create a `game board model` as a matrix of integers.
- Create a `game model` that contains a UUID and a game board.
- Define a `service interface` with the following methods:
  - A method to calculate the next move using the `Minimax` algorithm;
  - A method to `validate the game board` (ensure previous moves haven’t been altered);
  - A method to check if the `game is over`.

All models, interfaces, and implementations must be placed in `separate files`.

## Task 3. Implementing the datasource layer

- Implement a **storage class` to persist the current games.
- Define the `models` for the game board and the current game.
- Implement `mappers` to convert between `domain` and `datasource` models (domain<->datasource).
- Implement a `repository` for interacting with the storage class. It should include methods for:
  - `Saving` the current game;
  - `Retrieving` the current game.
- Create a `class that implements the service interface`, taking the repository as a parameter for interacting with the storage.
- All `models`, `interfaces`, and `implementations` must be placed in `separate files`.

## Task 4. Implementing the web layer

- Define the `models` for the game board and the current game.
- Implement `mappers` to convert between `domain` and `web` models (domain<->web).
- Implement a `controller` with the following method: POST /game/{UUID of the current game} — this endpoint receives a current game object with an updated game board from the `user`, and responds with a current game object updated with the `computer’s move`.
- If the submitted game state or move is invalid, the system must return an `error message` with a description.
- The application must `support multiple games running in parallel`.
- All `models`, `interfaces`, and `implementations` must be placed in `separate files`.

## Task 5. Module registration and application launch

- Register all `modules (layers)` in the `global module`:
  - Define import and export settings for modules;
  - Set up application `routing`;
  - Specify how the `application should be launched`.