import { Request, Response } from 'express';

import { generateId } from '../utils/id';
import { findUserByEmail, appendUser } from '../utils/db';
import { generateToken } from '../utils/jwt';

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400).json({ message: 'Email and password are required.' });
		return;
	}

	const user = await findUserByEmail(email);
	if (!user || user.password !== password) {
		res.status(401).json({ message: 'Invalid credentials' });
		return;
	}
	const token = generateToken({ userId: user.userId, email: user.email });
	res.status(200).json({ token });
};

export const register = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400).json({ message: 'Email and password are required.' });
		return;
	}

	const user = await findUserByEmail(email);
	if (user) {
		res.status(409).json({ message: 'User with this email already exists' });
		return;
	}

	const userId = generateId();
	await appendUser({ userId, email, password });

	const token = generateToken({ userId, email });
	res.status(200).json({ token });
};
