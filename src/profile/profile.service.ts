import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { NewProfileInput } from './dto/new-profile.input';
import { ProfileArgs } from './dto/profile.args';
import { Profile } from './models/profile';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {Profile as ProfileInterface} from './interfaces/profile.interface';
import { UpdateProfileInput } from './dto/update-profile.input';
import flatten from 'flat';
import { UpdateLocationInput } from './dto/update-location.input';
import { AuthService, Credentials, Auth } from '../auth/auth.service';
import { Points } from '../points/points.class';

@Injectable()
export class ProfileService {
  constructor(
      @InjectModel('Profile') private readonly profileModel: Model<ProfileInterface>,
      @Inject(forwardRef(() => AuthService))
      private readonly authService: AuthService,
    ) {}

  async create(data: NewProfileInput): Promise<Profile> {
    const createdProfile = new this.profileModel({
      ...data,
      'privacy.password': await this.authService.hashPassword(data.privacy.password),
      // Each user has a starting points of 50
      'points.points': [new Points(50, false)],
    });
    return await createdProfile.save();
  }

  async update(data: UpdateProfileInput): Promise<Profile> {
    const updatedProfile = this.profileModel.findOneAndUpdate({_id: data._id},
      flatten({...data}), {new: true});
    return await updatedProfile.exec();
  }

  async updateGameStatus(data: UpdateProfileInput): Promise<Profile> {
    const updatedProfile = this.profileModel.findOneAndUpdate({_id: data._id}, {...data});
    return await updatedProfile.exec();
  }

  async updateLocation(data: UpdateProfileInput): Promise<Profile[]> {
    const updatedProfile = await this.update(data);
    const fetchedLocation = this.profileModel.find(
      {
        $and: [
          {'gameStatus.level': updatedProfile.gameStatus.level},
          {'gameStatus.status': 1},
          // {_id: {$ne : id}},
          {'gameStatus.location': {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: data.gameStatus.location.coordinates,
              },
              $maxDistance: 50,
              // $minDistance: 0,
            },
          },
        }],
      });
    return fetchedLocation;
  }

  async findOneById(id: string): Promise<Profile> {
    return await this.profileModel.findById(id);
  }

  async findAll(): Promise<Profile[]> {
    return await this.profileModel.find();
  }

  async findByEmail(email: string): Promise<Profile> {
    return await this.profileModel.findOne({'personal.email': email});
  }

  async remove(id: string): Promise<Profile> {
    const removedProfile = this.profileModel.findOneAndDelete({_id: id});
    return removedProfile;
  }

}


