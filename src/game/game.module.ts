import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameResolver } from './game.resolver';
import { CommonModule } from '../common.module';
import { ProfileModule } from '../profile/profile.module';
import { QuestionsModule } from '../questions/questions.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GameSchema } from './MongoSchema/game.schema';
import { PointsService } from '../points/points.service';

@Module({
  providers: [GameService, GameResolver, PointsService],
  imports: [
    QuestionsModule,
    ProfileModule,
    CommonModule,
    MongooseModule.forFeature([{ name: 'Game', schema: GameSchema }]),
  ],
})
export class GameModule {}
