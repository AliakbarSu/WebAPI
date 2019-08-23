import { Module } from '@nestjs/common';
import { ChallengeRequestsGateway } from './index.gateway';
import { RoomService } from './room.service';
import { QuestionsModule } from '../questions/questions.module';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [ProfileModule, QuestionsModule],
  providers: [RoomService, ChallengeRequestsGateway],
})
export class ChallengeRequestsModule {

}
