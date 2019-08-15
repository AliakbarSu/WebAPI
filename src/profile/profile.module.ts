import { Module } from '@nestjs/common';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';
// import { DateScalar } from 'src/common/scalars/date.scalar';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema } from './MongoSchema/profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }]),
  ],
  providers: [ProfileResolver, ProfileService],
})
export class ProfileModule {}
