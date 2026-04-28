import { Post, Body, Param, Controller, Logger } from '@nestjs/common';
import { GameServiceImpl } from '../../domain/service/game.service.impl';
import { GameWebMapper } from '../mapper/game.mapper';
import { CurrentGame } from '../../domain/model/current-game.model';
import { MakeMoveRequest, GameResponse, ErrorResponse, WebGameBoard } from '../model/game.model';

@Controller('game')
export class GameController {
  private readonly logger = new Logger(GameController.name);

  constructor(
    private readonly gameService: GameServiceImpl,
    private readonly mapper: GameWebMapper
  ) {}

  @Post()
  async createGame(): Promise<GameResponse> {
    const initialBoard: WebGameBoard = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    
    const gameId = Date.now().toString();
    const game = new CurrentGame(gameId, initialBoard);
    await this.gameService.saveGame(game);
    
    return this.mapper.domainToResponse(game, null, false, 'X');
  }

  @Post(':uuid')
  async makeMove(
    @Param('uuid') uuid: string,
    @Body() request: MakeMoveRequest
  ): Promise<GameResponse | ErrorResponse> {
    const existingGame = await this.gameService.getGame(uuid);
    
    if (!existingGame) {
      return {
        statusCode: 404,
        message: `Game with id ${uuid} not found`,
        error: 'Not Found',
      };
    }
    
    const previousBoard = existingGame.getField().getBoard();
    const requestedBoard = this.mapper.webBoardToDomain(request.board);
    
    const gameWithUserMove = new CurrentGame(existingGame.getId(), requestedBoard.getBoard());
    const gameOverCheck = this.gameService.checkGameOver(gameWithUserMove);
    
    if (gameOverCheck.isOver) {
      await this.gameService.updateGame(uuid, gameWithUserMove);
      return this.mapper.domainToResponse(
        gameWithUserMove,
        gameOverCheck.winner,
        gameOverCheck.isOver,
        request.currentPlayer
      );
    }
    
    const aiPlayer = request.currentPlayer === 'X' ? 'O' : 'X';
    const aiMove = this.gameService.getNextMove(gameWithUserMove, aiPlayer);
    
    const updatedBoard = gameWithUserMove.getField().getBoard();
    updatedBoard[aiMove.row][aiMove.col] = aiPlayer;
    
    const finalGame = new CurrentGame(uuid, updatedBoard);
    const finalGameOver = this.gameService.checkGameOver(finalGame);
    
    await this.gameService.updateGame(uuid, finalGame);
    
    return this.mapper.domainToResponse(
      finalGame,
      finalGameOver.winner,
      finalGameOver.isOver,
      aiPlayer
    );
  }
}