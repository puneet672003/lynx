import DefaultLayout from '@/layouts/default';

export default function IndexPage() {
	return (
		<DefaultLayout>
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<h1 className="text-3xl">Hello</h1>
				<h3 className="text-xl">World</h3>
			</section>
		</DefaultLayout>
	);
}
