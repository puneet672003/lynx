import { Link } from '@heroui/link';
import {
	Navbar as HeroUINavbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from '@heroui/navbar';
import { link as linkStyles } from '@heroui/theme';
import clsx from 'clsx';

import { siteConfig } from '@/config';
import { ThemeSwitch } from '@/components/theme-switch';
import { GithubIcon } from '@/components/icons';

export const Navbar = () => {
	return (
		<HeroUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand className="gap-3 max-w-fit">
					<Link
						className="flex justify-start items-center gap-1"
						color="foreground"
						href="/"
					>
						{/* <Logo /> */}
						<p className="font-bold text-inherit">LYNX</p>
					</Link>
				</NavbarBrand>
				<div className="flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<Link
								className={clsx(
									linkStyles({ color: 'foreground' }),
									'data-[active=true]:text-primary data-[active=true]:font-medium'
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</Link>
						</NavbarItem>
					))}
				</div>
			</NavbarContent>

			<NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
				<NavbarItem className="flex gap-2">
					<Link isExternal href={siteConfig.links.github} title="GitHub">
						<GithubIcon className="text-default-500" />
					</Link>
					<ThemeSwitch />
				</NavbarItem>
			</NavbarContent>
		</HeroUINavbar>
	);
};
