import { nanoid } from 'nanoid';

export const generateId = (size: number = 4) => {
	const id = nanoid(size);
	return id;
};
