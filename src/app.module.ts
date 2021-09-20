import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ChallengeRequestsModule } from './challengeRequests/index.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ProfileModule } from './profile/profile.module'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { ProfileService } from './profile/profile.service'
import { QuestionsModule } from './questions/questions.module'
import { gqlFieldAuthChecker } from './auth/gqlFieldAuthChecker'
import { BuildSchemaOptions } from '@nestjs/graphql/dist/external/type-graphql.types'
import { AuthChecker } from 'type-graphql'
import { PointsModule } from './points/points.module'
import { GameModule } from './game/game.module'
import { PubSub } from 'apollo-server-express'
require('dotenv').config()
export interface TypeGraphQLBuildSchemaOptions extends BuildSchemaOptions {
  authChecker: AuthChecker<any, any>
}

// const graphQLModuleFactory = async (config: ConfigService) => ({
//   subscriptions: {
//     onConnect: async (connParams, websocket) => {
//       const tokenHeader = "jwtToken";
//       const token = connParams["jwtToken"];
//       if (token) {
//         jwt.verify(token, config.jwtSecret) as JwtPayload;
//       } else {
//         throw new UnauthorizedException("Unauthorized", "User not authorized to connect.");
//       }
//     },
//   },
// }) as GqlModuleOptions;

@Module({
  imports: [
    ProfileModule,
    ChallengeRequestsModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req, connection }) => {
        return connection
          ? { req: { headers: connection.context.headers } }
          : { req }
      },
      buildSchemaOptions: {
        authChecker: gqlFieldAuthChecker,
        authMode: 'null'
      } as TypeGraphQLBuildSchemaOptions
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    AuthModule,
    QuestionsModule,
    PointsModule,
    GameModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub()
    },
    AppService
  ]
})
export class AppModule {}
