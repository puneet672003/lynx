import { useNavigate } from 'react-router-dom';
import { Button } from '@heroui/button';
import { FaArrowCircleRight } from 'react-icons/fa';

import DefaultLayout from '@/layouts/default';

export default function IndexPage() {
	const navigate = useNavigate();

	return (
		<DefaultLayout>
			<div className="mb-8 flex flex-col justify-center items-center">
				<h1 className="text-5xl font-bold tracking-tight">
					Lynx<span className="text-secondary">.</span>
				</h1>
				<p className="mt-3 text-lg opacity-70">
					Simple URL shortening that just works.
				</p>
				<div className="mt-6">
					<Button
						color="secondary"
						size="lg"
						className="text-md"
						onPress={() => navigate('/sign-in')}
					>
						Get started <FaArrowCircleRight />
					</Button>
				</div>
			</div>
		</DefaultLayout>
	);
}
