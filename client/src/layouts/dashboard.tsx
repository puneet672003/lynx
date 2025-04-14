import { Navbar, NavbarContent } from '@heroui/navbar';
import { FiLogOut } from 'react-icons/fi';
import { Button } from '@heroui/button';

import { ThemeSwitch } from '@/components/theme-switch';

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode,
}) {
	return (
		<div className="relative flex flex-col h-screen">
			<Navbar className="pt-4 pb-2" maxWidth="xl" position="sticky">
				<NavbarContent justify="start">
					<h3 className="text-xl font-semibold">Dashboard</h3>
				</NavbarContent>
				<NavbarContent justify="end">
					<ThemeSwitch />
					<Button
						isIconOnly
						variant="solid"
						color="danger"
						onPress={() => {
							localStorage.removeItem('token');
							window.location.href = '/';
						}}
					>
						<FiLogOut size={20} />
					</Button>
				</NavbarContent>
			</Navbar>
			<main className="container mx-auto max-w-7xl px-6 flex-grow pt-2">
				{children}
			</main>
		</div>
	);
}
