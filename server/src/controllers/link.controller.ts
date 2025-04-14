import { Router, Response } from 'express';

import { Link } from '../models/link.model';
import { generateId } from '../utils/id';
import { appendLink, findLinks } from '../utils/db';
import { AuthenticatedRequest } from '../models/auth.models';

export const generateLink = async (
	req: AuthenticatedRequest,
	res: Response
) => {
	if (!req.user) {
		res.status(401).json({ message: 'Unauthorized' });
		return;
	}

	const { originalUrl, customAlias, expiresAt } = req.body;
	if (!originalUrl) {
		res.status(400).json({ message: 'Original URL is required' });
		return;
	}

	const urlAlias = `${req.user.userId}${customAlias || generateId()}`;
	const existing = await findLinks({ userId: req.user.userId, urlAlias });

	if (existing.length) {
		res.status(409).json({ message: 'URL Alias already in use.' });
		return;
	}

	const newLink: Link = {
		userId: req.user.userId,
		originalUrl: originalUrl,
		urlAlias: urlAlias,
		createdAt: new Date(),
		expiresAt: expiresAt ? new Date(expiresAt) : null,
		totalClicks: 0,
		clicks: [],
	};

	await appendLink(newLink);
	const SERVER_BASE_URL = process.env['SERVER_BASE_URL'];

	res.json({
		originalUrl: originalUrl,
		shortUrl: `${SERVER_BASE_URL}/${newLink.urlAlias}`,
	});
};

export const getLink = async (req: AuthenticatedRequest, res: Response) => {
	if (!req.user) {
		res.status(401).json({ message: 'Unauthorized' });
		return;
	}
	const filteredLinks = await findLinks({ userId: req.user.userId });

	res.json({
		links: filteredLinks,
	});
};
