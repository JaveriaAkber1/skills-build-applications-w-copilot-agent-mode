import { Router } from 'express';
import type { Model } from 'mongoose';

export function createResourceRouter(model: Model<any>): Router {
  const router = Router();

  router.get('/', async (_req, res, next) => {
    try {
      res.json(await model.find().sort({ createdAt: -1 }).lean());
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      const item = await model.findById(req.params.id).lean();
      if (!item) {
        res.status(404).json({ error: 'Resource not found' });
        return;
      }
      res.json(item);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      res.status(201).json(await model.create(req.body));
    } catch (error) {
      next(error);
    }
  });

  router.put('/:id', async (req, res, next) => {
    try {
      const item = await model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
      if (!item) {
        res.status(404).json({ error: 'Resource not found' });
        return;
      }
      res.json(item);
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
      const item = await model.findByIdAndDelete(req.params.id).lean();
      if (!item) {
        res.status(404).json({ error: 'Resource not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  });

  return router;
}