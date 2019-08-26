import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { ResolverInterface, FieldResolver } from 'type-graphql';
import { Roles } from '../decorators/roles.decorator';
import { Question, Answer } from './models/questions.model';
import { QuestionsService } from './questionsService/questions.service';
import { NewQuestionInput } from './dto/newQuestion.input';
import { UpdateQuestionInput } from './dto/updateQuestion.input';

const pubSub = new PubSub();

@Resolver(of => Question)
export class QuestionsResolver implements ResolverInterface<Question> {
  constructor(private readonly questionsService: QuestionsService) {}

  // ************************
  // Query Section
  // ************************
  @Query(returns => Question, {name: 'question'})
  @Roles('admin')
  async getQuestion(@Args('id') id: string): Promise<Question> {
    const question = await this.questionsService.findOneById(id);
    if (!question) {
      throw new NotFoundException(id);
    }
    return question;
  }

  @Query(returns => [Question])
  async profiles(): Promise<Question[]> {
    return await this.questionsService.findAll();
  }

  @FieldResolver()
  answers(): any {
    // return {
    //     id: 'testing',
    //     text: 'answering',
    // };
  }

  // ************************
  // Mutations Section
  // ************************

  @Mutation(returns => Question)
  async addQuestion(
    @Args('data') newQuestion: NewQuestionInput,
  ): Promise<Question> {
    const question = await this.questionsService.create(newQuestion);
    return question;
  }

  @Mutation(returns => Question)
  async updateQuestion(@Args('data') data: UpdateQuestionInput): Promise<Question> {
    const question = await this.questionsService.update(data);
    return question;
  }

  @Mutation(returns => Question)
  async removeQuestion(@Args('id') id: string): Promise<Question> {
    return this.questionsService.remove(id);
  }

}
