import { Module } from '@nestjs/common';
import { ProfileService } from './profile/profile.service';
import { ProfileSchema } from './profile/MongoSchema/profile.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }]),
  ],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class CommonModule {}
