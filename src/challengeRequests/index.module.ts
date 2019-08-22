import { Module } from '@nestjs/common';
import { ChallengeRequestsGateway } from './index.gateway';
import { CommonModule } from '../common.module';
import { RoomService } from './room.service';
import { QuestionsModule } from '../questions/questions.module';


@Module({
  imports: [CommonModule, QuestionsModule],
  providers: [RoomService, ChallengeRequestsGateway],
})
export class ChallengeRequestsModule {

}
