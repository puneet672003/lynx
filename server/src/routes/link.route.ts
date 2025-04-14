import Router from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { generateLink, getLink } from '../controllers/link.controller';

const linkRouter = Router();
linkRouter.use(authenticate);

linkRouter.post('/create', generateLink);
linkRouter.get('/list', getLink);

export default linkRouter;
