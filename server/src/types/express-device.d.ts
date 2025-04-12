import 'express';
import { RequestHandler } from 'express';

declare module 'express' {
	interface Request {
		device?: {
			type?: string;
			name?: string;
		};
	}
}

declare module 'express-device' {
	export function capture(): RequestHandler;
}