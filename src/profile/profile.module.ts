import { Module, forwardRef } from '@nestjs/common';
import { ProfileResolver } from './profile.resolver';
import { CommonModule } from '../common.module';
import { ProfileSchema } from './MongoSchema/profile.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileService } from './profile.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }]),
  ],
  providers: [
    ProfileService,
    ProfileResolver,
  ],
  exports: [
    ProfileService,
    MongooseModule,
  ],
})
export class ProfileModule {}
