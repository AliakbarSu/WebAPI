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
import { gqlFieldAuthChecker } from './auth/gqlFieldAuthChecker';
import { BuildSchemaOptions } from '@nestjs/graphql/dist/external/type-graphql.types';
import { AuthChecker } from 'type-graphql';
import { PointsModule } from './points/points.module';



export interface TypeGraphQLBuildSchemaOptions extends BuildSchemaOptions {
 authChecker: AuthChecker<any, any>;
}



@Module({
  imports: [
    ProfileModule,
    ChallengeRequestsModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
      buildSchemaOptions: {
        authChecker: gqlFieldAuthChecker,
        authMode: 'null',
      } as TypeGraphQLBuildSchemaOptions,
    }),
    MongooseModule.forRoot('mongodb+srv://ali:123456khan@cluster0-5hifi.mongodb.net/test?retryWrites=true&w=majority'),
    AuthModule,
    QuestionsModule,
    PointsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
