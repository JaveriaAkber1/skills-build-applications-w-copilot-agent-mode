import { Workout } from '../models/index.js';
import { createResourceRouter } from './resource.js';
export const workoutsRouter = createResourceRouter(Workout);
