import { Team } from '../models/index.js';
import { createResourceRouter } from './resource.js';

export const teamsRouter = createResourceRouter(Team);