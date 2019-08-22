import { Module } from '@nestjs/common';
import { QuestionsService } from './questionsService/questions.service';
import { QuestionsSchema } from './mongoSchema/questions.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsResolver } from './questions.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Question', schema: QuestionsSchema }]),
  ],
  providers: [
    QuestionsService,
    QuestionsResolver,
  ],
  exports: [QuestionsService],
})
export class QuestionsModule {}
