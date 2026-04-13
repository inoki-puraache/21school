# Темы

- Веб - приложение: webapp.md
- Node.js: nodejs.md
- Nest.js: nestjs.md
- API: api.md
- Алгоритм "минимакс" : minimax.md
- MVC

# Методические указания к заданиям

Структура проекта должна выглядеть так:

```text
src/
|-- game/
|   |--models/
|      |-- board.model.   
|      |-- game.model.
|      |-- move.model.
|   |--services/
|      |-- game.service.
|   |-- game.controller.
|   |-- game.module.
|-- app.module.
|-- main.

```

Должно существовать 3 модели данных: `Board`, `Game`, `Move`, 1 сервис `GameService`, 1 контроллер `GameController`, 2 модуля `GameModule`, `AppModule`.

Необходимо обратить внимане на декораторы `Injectable`, `Controller`, `Post`, `HttpCode`, `Module`, а также на `HttpException`, `HttpStatus` которые пригодятся при создании приложения.
