import React, { useLayoutEffect } from 'react';
import { logout, useAuthContext } from '../../context/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Topbar from '../topbar/Topbar';
import useSetDocumentTitle from '../../common-hooks/setDocumentTitle'


const ProtectedRoute = ({ redirectPath ="/login"}) => {
	const navigate = useNavigate();
	const { user, dispatch } = useAuthContext();

	useLayoutEffect(() => {
		if (user.isLoggedIn === false) {
			dispatch(logout());
			navigate(redirectPath);
		}
	}, [user, dispatch, navigate, redirectPath])
	useSetDocumentTitle("Home");
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