import React, { lazy, Suspense  } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthContextProvider} from './context/AuthContext';
const ProtectedRoute = lazy(() => import('./common-components/protected-routes/ProtectedRoute'));
const Login = lazy(() => import( './pages/Auth/Login/LoginForm'));
const RequestPasswordReset = lazy(() => import('./pages/Auth/RequestPasswordReset/RequestPasswordResetForm'));
const ResetPassword = lazy(() => import('./pages/Auth/ResetPassword/ResetPasswordForm'));
const Home = lazy(() => import('./pages/Home/Home/Home'));
const UserList = lazy(() => import('./pages/Users/ListUsers/ListUsers'));
const ViewUser = lazy(() => import('./pages/Users/ViewUser/ViewUser'));
const CreateUserForm = lazy(() => import('./pages/Users/CreateUser/CreateUserForm'));
const TransactionList = lazy(() => import('./pages/Transactions/TransactionList/TransactionList'));
const CreateTransactionForm = lazy(() => import('./pages/Transactions/CreateTransaction/CreateTransactionForm'));
const ViewTransaction = lazy(() => import('./pages/Transactions/ViewTransaction/ViewTransaction'));


function App() {
	return (
		<AuthContextProvider>
			<Router>
				<Suspense fallback={<div><p>Loading</p></div>}>
					<Routes>
						<Route path="/" element={<ProtectedRoute />}>
							<Route path="/" element={<Home /> } />
							<Route path="/users" element={ <UserList /> } />
							<Route path="/user/:id" element={<ViewUser />} />
							<Route path="/users/new" element={<CreateUserForm /> } />
							<Route path="/transactions" element={<TransactionList />} />
							<Route path="/transactions/new" element={<CreateTransactionForm />} />
							<Route path="/transaction/:id" element={<ViewTransaction />} />
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
