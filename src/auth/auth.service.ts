import { Injectable } from '@nestjs/common';
import { AuthChecker } from 'type-graphql';

@Injectable()
export class AuthService {}

// export const customeAuthChecker: AuthChecker<any> = ({root, args, context, info}, roles) => {
//     return true;
// };
