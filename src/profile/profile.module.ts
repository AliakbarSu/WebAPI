import { Module } from '@nestjs/common';
import { ProfileResolver } from './profile.resolver';
import { CommonModule } from '../common.module';

@Module({
  imports: [
    CommonModule,
  ],
  providers: [ProfileResolver],
})
export class ProfileModule {}
