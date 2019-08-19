import { NotFoundException, UseInterceptors, UploadedFile, Body, Query as Qer, Req, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewProfileInput } from './dto/new-profile.input';
import { Profile, Privacy } from './models/profile';
import { ProfileService } from './profile.service';
import { FieldResolver, ResolverInterface } from 'type-graphql';
import { UpdateProfileInput } from './dto/update-profile.input';
import { UpdateLocationInput } from './dto/update-location.input';
import {FileInterceptor} from '@nestjs/platform-express';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';

const pubSub = new PubSub();

@Resolver(of => Profile)
export class ProfileResolver implements ResolverInterface<Profile> {
  constructor(private readonly profileService: ProfileService) {}

  // ************************
  // Query Section
  // ************************
  @Query(returns => Profile, {name: 'profile'})
  @Roles('admin')
  @UseGuards(new AuthGuard())
  async getProfile(@Args('id') id: string): Promise<Profile> {
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
    const profile = await this.profileService.create(newProfileData);
    // pubSub.publish('recipeAdded', { recipeAdded: recipe });
    return profile;
  }

  @Mutation(returns => Profile)
  async updateProfile(@Args('data') data: UpdateProfileInput): Promise<Profile> {
    const profile = await this.profileService.update(data);
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
