import { NotFoundException, UseInterceptors, UploadedFile, Body, Query as Qer, Req, UseGuards, Request, ValidationPipe, UsePipes, UseFilters } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription, Context } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewProfileInput } from './dto/new-profile.input';
import { Profile, Privacy } from './models/profile';
import { ProfileService } from './profile.service';
import { FieldResolver, ResolverInterface } from 'type-graphql';
import { UpdateProfileInput } from './dto/update-profile.input';
import {FileInterceptor} from '@nestjs/platform-express';
import { Roles } from '../decorators/roles.decorator';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { RolesAuthGuard } from '../guards/rolesAuth.gaurd';
import { UpdateProfile } from './dto/updateProfile.input';
import { ExceptionsLogger } from './filters/exceptionLogger';

const pubSub = new PubSub();

@Resolver(of => Profile)
export class ProfileResolver implements ResolverInterface<Profile> {
  constructor(private readonly profileService: ProfileService) {}

  // ************************
  // Query Section
  // ************************
  // @Roles('player')
  // @UseGuards(RolesAuthGuard)
  @Query(returns => Profile, {name: 'profile'})
  async getProfile(@CurrentUser() user: Profile, @Args('id') id: string): Promise<Profile> {
    const profile = await this.profileService.findOneById(id);
    if (!profile) {
      throw new NotFoundException(id);
    }
    return profile;
  }

  @Query(returns => [Profile])
  profiles(): Promise<Profile[]> {
    return this.profileService.findAll();
  }

  @Query(returns => [Profile])
  usernames(@Args('username') username: string): Promise<Profile[]> {
    return this.profileService.findAll({$text: {$search: username}}, {score: {'$meta': 'textScore'}})
  }

  // @Query(returns => AuthModel)
  // async authenticate(@Args('credentials') credentials: CredentialsInputs): Promise<Auth | null> {
  //   const auth = await this.profileService.authenticate(credentials);
  //   if (auth) {
  //     return auth;
  //   }
  //   // return error
  //   return null;
  // }

  // ************************
  // Field Resolvers Section
  // ************************

  @FieldResolver()
  privacy(): Privacy {
    return {
        password: 'fkafjskl;fj',
        resetPasswordToken: 'jfl;akjfklsjf424',
        loginFailedAttempts: 2,
        roles: ['user'],
    };
  }

  // ************************
  // Mutations Section
  // ************************

  @Mutation(returns => Profile)
  async addProfile(
    @Args('data') newProfileData: NewProfileInput,
  ): Promise<Profile> {
    const profile = await this.profileService.create(newProfileData.personal.username,
      newProfileData.personal.email, newProfileData.privacy.password);
    // pubSub.publish('recipeAdded', { recipeAdded: recipe });
    return profile;
  }

  @Mutation(returns => Profile)
  @UseFilters(new ExceptionsLogger())
  async updateProfile(@Args('data', new ValidationPipe({skipMissingProperties: true, skipNullProperties: true})) data: UpdateProfile): Promise<Profile> {
    const profile = await this.profileService.update(
      {
        id: data.id,
        personal: {
          phone: data.phoneNumber,
          notificationEmail: data.notificationEmail,
          country: data.country
        },
        payment: {
          bankAccountName: data.bankAccountName,
          bankAccountNumber: data.bankAccountNumber
        }
      });
    return profile;
  }

  @Mutation(returns => Profile)
  async removeProfile(@Args('id') id: string): Promise<Profile> {
    return this.profileService.remove(id);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Mutation(returns => Profile)
  async updateAvatar(@UploadedFile() file, @Body() body) {
    // return this.profileService.remove(id);
  }

  @Subscription(returns => Profile)
  recipeAdded() {
    return pubSub.asyncIterator('recipeAdded');
  }
}
