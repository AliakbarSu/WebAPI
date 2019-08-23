import { Module } from '@nestjs/common';
import { ProfileService } from './profile/profile.service';
import { ProfileSchema } from './profile/MongoSchema/profile.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [],
  exports: [
  ],
})
export class CommonModule {}
