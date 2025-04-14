import { Link } from '@heroui/link';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { addToast } from '@heroui/toast';
import { Card, CardHeader, CardBody } from '@heroui/card';

import DefaultLayout from '@/layouts/default';
import { api } from '@/api/axios';

function SignIn() {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = Object.fromEntries(new FormData(e.currentTarget));

		api
			.post('/auth/login', data)
			.then((res) => {
				if (res?.token) {
					localStorage.setItem('token', res.token);
					addToast({ description: 'Logged in', color: 'success' });
					window.location.href = '/';
				} else {
				}
			})
			.catch((err) => addToast({ description: err.message, color: 'danger' }));
	};

	return (
		<DefaultLayout>
			<section className="flex flex-col items-center">
				<Card className="w-full md:max-w-lg flex flex-col gap-4">
					<CardHeader className="flex justify-center my-2">
						<h1 className="text-2xl">Sign in</h1>
					</CardHeader>

					<CardBody>
						<Form
							className="w-full flex flex-col gap-4"
							onSubmit={handleSubmit}
						>
							<Input
								isRequired
								errorMessage="Please enter a valid email"
								label="Email"
								labelPlacement="inside"
								name="email"
								placeholder="Enter your email"
								type="email"
							/>
							<Input
								isRequired
								label="Password"
								labelPlacement="inside"
								name="password"
								placeholder="Enter your password"
								type="password"
							/>
							<div className="flex flex-col gap-2 items-center w-full mt-4">
								<Button fullWidth color="secondary" type="submit">
									Submit
								</Button>
								<div>
									or&nbsp;&nbsp;
									<Link href="/sign-up" color="secondary">
										Register Now
									</Link>
								</div>
							</div>
						</Form>
					</CardBody>
				</Card>
			</section>
		</DefaultLayout>
	);
}

export default SignIn;
