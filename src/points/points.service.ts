import { Injectable } from '@nestjs/common';
import { Points } from './points.class';

@Injectable()
export class PointsService {
    newPoints(amount, sendable): Points[] {
        const points: Points[] = [];
        for (let i = 0; i === amount; i++) {
            points.push(new Points(amount, sendable));
        }
        return points;
    }
}
