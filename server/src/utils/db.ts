import fs from 'fs/promises';
import path from 'path';
import JsonQuery from 'json-query';

import { UserInDB } from '../models/auth.models';
import { Link } from '../models/link.model';

const USER_DB_PATH = path.resolve(__dirname, '../../db/users.json');
const LINKS_DB_PATH = path.resolve(__dirname, '../../db/links.json');

const readUsers = async (): Promise<UserInDB[]> => {
	try {
		const data = await fs.readFile(USER_DB_PATH, 'utf-8');
		return JSON.parse(data);
	} catch (error) {
		console.error('Error reading users:', error);
		return [];
	}
};

const writeUsers = async (users: UserInDB[]): Promise<void> => {
	try {
		await fs.writeFile(USER_DB_PATH, JSON.stringify(users, null, 2));
	} catch (error) {
		console.error('Error writing users:', error);
	}
};

const readLinks = async (): Promise<Link[]> => {
	try {
		const data = await fs.readFile(LINKS_DB_PATH, 'utf-8');
		return JSON.parse(data);
	} catch (error) {
		console.error('Error reading users:', error);
		return [];
	}
};

const writeLinks = async (links: Link[]): Promise<void> => {
	try {
		await fs.writeFile(LINKS_DB_PATH, JSON.stringify(links, null, 2));
	} catch (error) {
		console.error('Error writing users:', error);
	}
};

export const appendUser = async (user: UserInDB) => {
	const users = await readUsers();
	users.push(user);
	await writeUsers(users);
};

export const findUserByEmail = async (email: string) => {
	const users = await readUsers();
	return users.find((u) => u.email === email);
};

export const findUserById = async (userId: string) => {
	const users = await readUsers();
	return users.find((u) => u.userId === userId);
};

export const findLinks = async (query: string) => {
	const links = await readLinks();
	return JsonQuery(query, { data: links });
};

export const appendLink = async (link: Link) => {
	const links = await readLinks();
	links.push(link);
	await writeLinks(links);
};

export const updateStats = async (device: string, urlAlias: string) => {
	const links = await readLinks();
	const linkIndex = links.findIndex((l) => l.urlAlias === urlAlias);

	if (linkIndex !== -1) {
		const link = links[linkIndex];
		link.totalClicks++;
		link.clicks.push({ device: { type: device }, clickedAt: new Date() });

		links[linkIndex] = link;
		await writeLinks(links);
	}
};
