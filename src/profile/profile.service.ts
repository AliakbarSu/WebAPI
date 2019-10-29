import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { NewProfileInput } from './dto/new-profile.input';
import { ProfileArgs } from './dto/profile.args';
import { Profile, Point } from './models/profile';
import { Model } from 'mongoose';
import { InjectModel} from '@nestjs/mongoose';
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

  async create(username: string, email: string, password: string): Promise<Profile> {
    const createdProfile = new this.profileModel({
      'personal.username': username,
      'personal.email': email,
      'privacy.password': await this.authService.hashPassword(password),
      // Each user has a starting points of 50
      // 'points.points': [new Points(50, false)],
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
    const updatedProfile = await this.update({...data, gameStatus: {location: data.gameStatus.location, status: {online: 1}}});
    const fetchedLocation = this.profileModel.find(
      {
        $and: [
          {'gameStatus.level': updatedProfile.gameStatus.level},
          {'gameStatus.status.online': 1},
          // {'gameStatus.status.lastOnline': {$lte: new Date(+ new Date() - 5000)}},
          // {_id: {$ne : id}},
          {'gameStatus.location': {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: data.gameStatus.location.coordinates,
              },
              $maxDistance: 200,
              // $minDistance: 0,
            },
          },
        }],
      });
    return fetchedLocation;
  }

  async findOneById(id: string): Promise<Profile> {
    return await this.profileModel.findOne({'_id': id});
  }

  async findAll(conditions?): Promise<Profile[]> {
    return await this.profileModel.find(conditions);
  }

  async findByEmail(email: string): Promise<Profile> {
    return await this.profileModel.findOne({'personal.email': email});
  }

  async remove(id: string): Promise<Profile> {
    const removedProfile = this.profileModel.findOneAndDelete({_id: id});
    return removedProfile;
  }

  async addPoints(points: Point[], id: string): Promise<Profile> {
    // return;
    return this.profileModel.updateOne({_id: id},
      {$push: {'points.points': {$each: points}}}, {upsert: true});
  }

  async removePoints(points: number, id: string): Promise<Profile> {
    return;
    return this.profileModel.update({_id: id},
      {$pull : {'points.points' : {amount: 1}}}, {limit: points});
  }

}
