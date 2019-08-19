import { Module } from '@nestjs/common';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';
// import { DateScalar } from 'src/common/scalars/date.scalar';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema } from './MongoSchema/profile.schema';
import { CommonModule } from '../common.module';

@Module({
  imports: [
    CommonModule,
  ],
  providers: [ProfileResolver],
})
export class ProfileModule {}
