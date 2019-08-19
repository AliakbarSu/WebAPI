import { Injectable, Inject } from '@nestjs/common';
import { NewProfileInput } from './dto/new-profile.input';
import { ProfileArgs } from './dto/profile.args';
import { Profile } from './models/profile';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {Profile as ProfileInterface} from './interfaces/profile.interface';
import { UpdateProfileInput } from './dto/update-profile.input';
import flatten from 'flat';
import { UpdateLocationInput } from './dto/update-location.input';

@Injectable()
export class ProfileService {
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */

  constructor(@InjectModel('Profile') private readonly profileModel: Model<ProfileInterface>) {}

  async create(data: NewProfileInput): Promise<Profile> {
    const createdProfile = new this.profileModel(data);
    return await createdProfile.save();
  }

  async update(data: UpdateProfileInput): Promise<Profile> {
    const updatedProfile = this.profileModel.findOneAndUpdate({_id: data._id},
      flatten({...data}), {new: true});
    return await updatedProfile.exec();
  }

  async updateLocation(id: string, location: UpdateLocationInput): Promise<Profile[]> {
    await this.update({_id: id, gameStatus: {location}});
    const fetchedLocation = this.profileModel.find(
      {
        $and: [
          // {_id: {$ne : id}},
          {'gameStatus.location': {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: location.coordinates,
              },
              $maxDistance: 20,
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
    return [profileDummyData] as any;
  }

  async remove(id: string): Promise<Profile> {
    const removedProfile = this.profileModel.findOneAndDelete({_id: id});
    return removedProfile;
  }
}

const profileDummyData = {
  _id: 'jfkl;sjfsfj',
  personal: {
    firstName: 'asfjksfj',
    lastName: 'fjksafj',
    username: 'fjklsafjs;f',
    phone: '93993838',
    email: 'fjklas;fjsfjkf',
  },
  points: {
    points: 22,
    recievedPoints: {
      id: 'fjsafjskfj',
      sender: 'jfaksfjsf',
      amount: 22,
      timestamp: new Date(),
    },
    sentPoints: {
      id: 'fjsafjskfj',
      recipient: 'jfaksfjsf',
      amount: 22,
      timestamp: new Date(),
    },
    redeemedPoints: 222,
  },
  gameStatus: {
    status: 1,
    win: 0,
    lost: 0,
    level: 1,
  },
};
