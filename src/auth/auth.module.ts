import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ProfileModule } from '../profile/profile.module';

@Module({
    imports: [
        forwardRef(() => ProfileModule),
    ],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
