import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChallengeRequestsModule } from './challengeRequests/index.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ProfileModule } from './profile/profile.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProfileService } from './profile/profile.service';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [
    ProfileModule,
    ChallengeRequestsModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    MongooseModule.forRoot('mongodb+srv://ali:123456khan@cluster0-5hifi.mongodb.net/test?retryWrites=true&w=majority'),
    AuthModule,
    QuestionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
