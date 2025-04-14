export type SiteConfig = typeof siteConfig;

export const SERVER_BASE_URL = ' https://a17c-103-211-12-178.ngrok-free.app';
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
