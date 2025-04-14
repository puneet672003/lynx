export type SiteConfig = typeof siteConfig;

export const SERVER_BASE_URL = 'http://localhost:8080';
export const siteConfig = {
	navItems: [
		{
			label: 'Home',
			href: '/',
		},
		{
			label: 'Sign In',
			href: '/sign-in',
		},
		{
			label: 'Dashboard',
			href: 'dashboard',
		},
	],
	links: {
		github: 'https://github.com/puneet672003/lynx/tree/main',
	},
};
