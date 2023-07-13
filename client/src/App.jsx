import React, { lazy, Suspense  } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthContextProvider} from './context/AuthContext';
const ProtectedRoute = lazy(() => import('./common-components/protected-routes/ProtectedRoute'));
const Login = lazy(() => import( './pages/Auth/Login/LoginForm'));
const RequestPasswordReset = lazy(() => import('./pages/Auth/RequestPasswordReset/RequestPasswordResetForm'));
const ResetPassword = lazy(() => import('./pages/Auth/ResetPassword/ResetPasswordForm'));
const UserList = lazy(() => import('./pages/Users/ListUsers/ListUsers'));
const ViewUser = lazy(() => import('./pages/Users/ViewUser/ViewUser'));
const CreateUserForm = lazy(() => import('./pages/Users/CreateUser/CreateUserForm'));
const TransactionList = lazy(() => import('./pages/Transactions/TransactionList/TransactionList'));


function App() {
	return (
		<AuthContextProvider>
			<Router>
				<Suspense fallback={<div><p>Loading</p></div>}>
					<Routes>
						<Route path="/" element={<ProtectedRoute />}>
							<Route path="/users" element={ <UserList /> } />
							<Route path="/user/:id" element={<ViewUser />} />
							<Route path="/users/new" element={<CreateUserForm /> } />
							<Route path="/transactions" element={<TransactionList />} />
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
