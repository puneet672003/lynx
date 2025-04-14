import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import IndexPage from '@/pages/index';
import SignIn from '@/pages/auth/sign-in';
import SignUp from '@/pages/auth/sign-up';
import Dashboard from '@/pages/dashboard';

function App(): JSX.Element {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		const token = localStorage.getItem('token');

		setIsAuthenticated(token !== null);
	}, []);

	return (
		<Routes>
			{isAuthenticated ? (
				<>
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="*" element={<Navigate to={'/dashboard'} replace />} />
				</>
			) : (
				<>
					<Route path="sign-in" element={<SignIn />} />
					<Route path="sign-up" element={<SignUp />} />
					<Route path="/" element={<IndexPage />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</>
			)}
		</Routes>
	);
}

export default App;
