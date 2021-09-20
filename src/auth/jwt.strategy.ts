import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { ProfileService } from '../profile/profile.service';
import { Profile } from '../profile/models/profile';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly profileService: ProfileService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<Profile> {
    return this.profileService.findOneById(payload.sub);
  }
}
