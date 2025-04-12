import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { AuthenticatedRequest } from '../models/auth.models';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		res.status(401).json({ message: 'Unauthorized' });
    return;
	}

	const token = authHeader.split(' ')[1];
	const payloadData = verifyToken(token);

	if (payloadData === null) {
		res.status(403).json({ message: 'Invalid token' });
    return;
	}

	(req as AuthenticatedRequest).user = payloadData;
  next()
};
