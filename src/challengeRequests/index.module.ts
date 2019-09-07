import { Module } from '@nestjs/common';
import { ChallengeRequestsGateway } from './index.gateway';
import { RoomService } from './room.service';
import { QuestionsModule } from '../questions/questions.module';
import { ProfileModule } from '../profile/profile.module';
import { PointsModule } from '../points/points.module';

@Module({
  imports: [ProfileModule, QuestionsModule, PointsModule],
  providers: [RoomService, ChallengeRequestsGateway],
})
export class ChallengeRequestsModule {

}
