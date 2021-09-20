import { Module } from '@nestjs/common';
import { PointsService } from './points.service';
import { CommonModule } from '../common.module';

@Module({
  imports: [CommonModule],
  providers: [PointsService],
  exports: [PointsService],
})
export class PointsModule {}
