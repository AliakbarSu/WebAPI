import { Game } from '../interfaces/game.interface';

export type createGameParam = Pick<Game, 'players' | 'points' | 'winner' | 'points' | '_id'>;
