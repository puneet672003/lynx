import { Request, Response } from 'express';
import { findLinks, updateStats } from '../utils/db';

export const handleRedirect = async (req: Request, res: Response) => {
	const { urlAlias } = req.params;

	const result = await findLinks(`[*urlAlias=${urlAlias}]`);
	const links = result.value;

	if (!links.length) {
		res.status(404).json({ message: 'Short link not found.' });
		return;
	}

	const device = req.device?.type || 'browser';

	updateStats(device, urlAlias);
	res.redirect(links[0].originalUrl);
};
