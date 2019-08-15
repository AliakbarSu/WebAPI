import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewProfileInput } from './dto/new-profile.input';
import { ProfileArgs } from './dto/profile.args';
import { Profile, Privacy } from './models/profile';
import { ProfileService } from './profile.service';
import { FieldResolver, ResolverInterface } from 'type-graphql';
import { UpdateProfileInput } from './dto/update-profile.input';
import { UpdateLocationInput } from './dto/update-location.input';

const pubSub = new PubSub();

@Resolver(of => Profile)
export class ProfileResolver implements ResolverInterface<Profile> {
  constructor(private readonly profileService: ProfileService) {}

  // ************************
  // Query Section
  // ************************
  @Query(returns => Profile, {name: 'profile'})
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
  async updateLocation(@Args('id') id: string, @Args('location') location: UpdateLocationInput): Promise<Profile> {
    const foundLocations = await this.profileService.updateLocation(id, location);
    if (!foundLocations) {
      throw new NotFoundException(id);
    }
    return foundLocations;
  }


  @Mutation(returns => Profile)
  async removeProfile(@Args('id') id: string) {
    return this.profileService.remove(id);
  }

  @Subscription(returns => Profile)
  recipeAdded() {
    return pubSub.asyncIterator('recipeAdded');
  }
}
