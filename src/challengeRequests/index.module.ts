import { Module } from '@nestjs/common';
import { ChallengeRequestsGateway } from './index.gateway';
import { ProfileService } from '../profile/profile.service';
import { ProfileModule } from 'src/profile/profile.module';
import { CommonModule } from '../common.module';
import { RoomService } from './room.service';

@Module({
  imports: [CommonModule],
  providers: [RoomService, ChallengeRequestsGateway],
})
export class ChallengeRequestsModule {
  
}
