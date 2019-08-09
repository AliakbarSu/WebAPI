import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChallengeRequestsModule } from './challengeRequests/index.module';

@Module({
  imports: [ChallengeRequestsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
