import { Module } from '@nestjs/common';
import { GameController } from '../../web/controller/game.controller';
import { GameServiceImpl } from '../../domain/service/game.service.impl';
import { GameRepository } from '../../datasource/repository/game.repository';
import { GameStorage } from '../../datasource/repository/game-storage';
import { GameMapper as DatasourceGameMapper } from '../../datasource/mapper/game.mapper';
import { GameWebMapper } from '../../web/mapper/game.mapper';

@Module({
  controllers: [GameController],
  providers: [
    GameStorage,
    DatasourceGameMapper,
    GameRepository,
    GameServiceImpl,
    GameWebMapper,
  ],
  exports: [GameServiceImpl],
})
export class GameModule {}