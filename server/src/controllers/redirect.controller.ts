import { Request, Response } from 'express';
import { findLinks, updateStats } from '../utils/db';

export const handleRedirect = async (req: Request, res: Response) => {
	const { urlAlias } = req.params;
	const links = await findLinks({ urlAlias });

	if (!links.length) {
		res.status(404).json({ message: 'Short link not found.' });
		return;
	}

	const link = links[0];
	const device = req.device?.type || 'browser';

	if (link.expiresAt !== null && link.expiresAt < new Date()) {
		res.status(403).json({ message: 'Short link expired.' });
		return;
	}

	updateStats(device, urlAlias);
	res.redirect(links[0].originalUrl);
};
