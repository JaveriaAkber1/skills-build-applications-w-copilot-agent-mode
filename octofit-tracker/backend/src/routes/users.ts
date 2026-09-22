import { Router } from 'express';
import { User } from '../models/index.js';
import { createResourceRouter } from './resource.js';

export const usersRouter = createResourceRouter(User);