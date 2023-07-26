import React, { lazy, Suspense  } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthContextProvider} from './context/AuthContext';
import { ChaoticOrbit } from '@uiball/loaders';
const ProtectedRoute = lazy(() => import('./common-components/protected-routes/ProtectedRoute'));
const Login = lazy(() => import( './pages/Auth/Login/LoginForm'));
const RequestPasswordReset = lazy(() => import('./pages/Auth/RequestPasswordReset/RequestPasswordResetForm'));
const ResetPassword = lazy(() => import('./pages/Auth/ResetPassword/ResetPasswordForm'));
const Home = lazy(() => import('./pages/Home/Home/Home'));
const UserList = lazy(() => import('./pages/Users/ListUsers/ListUsers'));
const ViewUser = lazy(() => import('./pages/Users/ViewUser/ViewUser'));
const CreateUserForm = lazy(() => import('./pages/Users/CreateUser/CreateUserForm'));
const TransactionList = lazy(() => import('./pages/Transactions/TransactionList/TransactionList'));
const CreateTransaction = lazy(() => import('./pages/Transactions/CreateTransaction/CreateTransaction'));
const ViewTransaction = lazy(() => import('./pages/Transactions/ViewTransaction/ViewTransaction'));
const ListMenuCategories = lazy(() => import('./pages/Menu/ListMenuCategories/ListMenuCategories'));
const CreateMenuCategory = lazy(() => import('./pages/Menu/CreateMenuCategory/CreateMenuCategory'));
const EditMenuCategory = lazy(() => import('./pages/Menu/EditMenuCategory/EditMenuCategory'));
const ViewCategory = lazy(() => import('./pages/Menu/ViewCategory/ViewCategory'));
const CreateMenuItem = lazy(() => import('./pages/Menu/CreateMenuItem/CreateMenuItem'));
const EditMenuItem = lazy(() => import('./pages/Menu/EditMenuItem/EditMenuItem'));


function App() {
	return (
		<AuthContextProvider>
			<Router>
				<Suspense fallback={
					<div 
						style={
							{ 
								display: "flex", 
								justifyContent: "center", 
								alignItems: "center", 
								minHeight: "100vh", 
								minWidth: "100%" 
							}}>
						<ChaoticOrbit size={80} lineWeight={5} speed={2} color={"black"} />
					</div>}>
					<Routes>
						<Route path="/" element={<ProtectedRoute />}>
							<Route path="/" element={<Home /> } />
							<Route path="/users" element={ <UserList /> } />
							<Route path="/user/:id" element={<ViewUser />} />
							<Route path="/users/new" element={<CreateUserForm /> } />
							<Route path="/transactions" element={<TransactionList />} />
							<Route path="/transactions/new" element={<CreateTransaction />} />
							<Route path="/transaction/:id" element={<ViewTransaction />} />
							<Route path="/menu" element={<ListMenuCategories  />} />
							<Route path="/menu/categories/new" element={<CreateMenuCategory />} />
							<Route path="/menu/categories/:id" element={<ViewCategory />} />
							<Route path="/menu/categories/:id/edit" element={<EditMenuCategory/>} />
							<Route path="/menu/categories/:id/items/new" element={<CreateMenuItem />} />
							<Route path="/menu/items/:id" element={<EditMenuItem />} />
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
