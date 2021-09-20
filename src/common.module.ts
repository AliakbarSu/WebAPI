import { Module } from '@nestjs/common';
import { ProfileService } from './profile/profile.service';
import { ProfileSchema } from './profile/MongoSchema/profile.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PubSub } from 'apollo-server-express';

@Module({
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  exports: [
    'PUB_SUB',
  ],
})
export class CommonModule {}
