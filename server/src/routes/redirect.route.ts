import Router from 'express';
import { handleRedirect } from '../controllers/redirect.controller';

const redirectRouter = Router();

redirectRouter.get('/:urlAlias', handleRedirect);

export default redirectRouter;
