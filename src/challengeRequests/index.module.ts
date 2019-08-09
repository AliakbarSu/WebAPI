import { Module } from '@nestjs/common';
import { ChallengeRequestsGateway } from './index.gateway';

@Module({
  providers: [ChallengeRequestsGateway],
})
export class ChallengeRequestsModule {}
