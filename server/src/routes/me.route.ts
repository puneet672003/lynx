import Router, { Response } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { AuthenticatedRequest } from '../models/auth.models';

const meRouter = Router();

meRouter.get('/', authenticate, (req: AuthenticatedRequest, res: Response) => {
	if (!req.user) {
		res.status(401).json({ message: 'Unauthorized' });
		return;
	}

	res.json({
		user: req.user,
	});
});

export default meRouter;
