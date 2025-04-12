import { Request } from 'express';

export interface JwtPayload {
	userId: string;
	email: string;
}

export interface User {
	userId: string;
	email: string;
}

export interface UserInDB extends User {
	password: string;
}

export interface AuthenticatedRequest extends Request {
	user?: JwtPayload;
}
