import React, { useLayoutEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import { AuthContextProvider, useAuthContext } from './context/AuthContext';
import useSetDocumentTitle from './common-hooks/setDocumentTitle';
const Sidebar = lazy(() => import('./common-components/sidebar/Sidebar'));
const Topbar = lazy(() => import( './common-components/topbar/Topbar'));
const Login = lazy(() => import( './pages/Auth/Login/LoginForm'));
const RequestPasswordReset = lazy(() => import('./pages/Auth/RequestPasswordReset/RequestPasswordResetForm'));
const ResetPassword = lazy(() => import('./pages/Auth/ResetPassword/ResetPasswordForm'));
const UserList = lazy(() => import('./pages/Users/ListUsers/ListUsers'));

const Homepage = () => {

	const navigate = useNavigate();
	const { user } = useAuthContext();
	useLayoutEffect(() => {
		if (user.isLoggedIn === false) {
			navigate("/login");
		}
	})
	useSetDocumentTitle("Home");
	return(
		<>
			<Topbar />
			<div className="container">
				<Sidebar />
				<Outlet />
			</div>
		</>
	)
}

function App() {
	return (
		<AuthContextProvider>
			<Router>
				<Suspense fallback={<div><p>Loading</p></div>}>
					<Routes>
						<Route path="/" element={ <Homepage />}>
							<Route path="/users" element={ <UserList /> } />
						</Route>
						<Route path="/login" element={<Login />} />
						<Route path="/reset/password" element={<RequestPasswordReset />} />
						<Route path="/reset/:token" element={<ResetPassword />} />
					</Routes>
				</Suspense>
			</Router>
		</AuthContextProvider>
	);
}

export default App;
