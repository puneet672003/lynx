import { Router } from 'express';

import authRouter from './auth.route';
import meRouter from './me.route';
import linkRouter from './link.route';
import redirectRouter from './redirect.route';

const globalRouter = Router();

globalRouter.use('/auth', authRouter);
globalRouter.use('/me', meRouter);
globalRouter.use('/link', linkRouter);
globalRouter.use('/', redirectRouter);

export default globalRouter;
