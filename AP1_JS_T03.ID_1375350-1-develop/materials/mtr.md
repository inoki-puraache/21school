## Topics

- Web Application: webapp.md
- Node.js: nodejs.md
- Nest.js: nestjs.md
- API: api.md
- Minimax Algorithm: minimax.md
- MVC

## Methodological Guidelines for the Tasks

The project structure should look like this:

```
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


There should be 3 data models: `Board`, `Game`, and `Move`,  
1 service: `GameService`,  
1 controller: `GameController`,  
2 modules: `GameModule` and `AppModule`.

Pay close attention to the decorators `Injectable`, `Controller`, `Post`, `HttpCode`, and `Module`,  
as well as to `HttpException` and `HttpStatus`, which will be useful when building the application.