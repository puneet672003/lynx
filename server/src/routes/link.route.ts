import Router from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { generateLink, getLink } from '../controllers/link.controller';

const linkRouter = Router();
linkRouter.use(authenticate);

linkRouter.post('/', generateLink);
linkRouter.get('/', getLink);

export default linkRouter;
