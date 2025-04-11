import { Route, Routes } from 'react-router-dom';

import IndexPage from '@/pages/index';
import SignIn from '@/pages/auth/sign-in';
import SignUp from '@/pages/auth/sign-up';

function App() {
	return (
		<Routes>
			<Route element={<SignIn />} path="sign-in" />
			<Route element={<SignUp />} path="sign-up" />
			<Route element={<IndexPage />} path="/" />
		</Routes>
	);
}

export default App;
