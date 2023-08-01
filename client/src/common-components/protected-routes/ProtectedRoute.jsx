import React, { useLayoutEffect } from 'react';
import { logout, useAuthContext } from '../../context/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Topbar from '../topbar/Topbar';


const ProtectedRoute = ({ redirectPath ="/login"}) => {
	const navigate = useNavigate();
	const { user, dispatch } = useAuthContext();

	useLayoutEffect(() => {
		if (user.isLoggedIn === false) {
			dispatch(logout());
			navigate(redirectPath);
		} else if (!user.isAdmin) {
			navigate("/forbidden")
		}
	}, [user, dispatch, navigate, redirectPath])
	return (
		<>
			<Topbar />
			<div className="container">
				<Sidebar />
				<Outlet />
			</div>
		</>
	)
}

export default ProtectedRoute;