import React, { useState, useLayoutEffect } from 'react';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom"
import { DataGrid } from '@mui/x-data-grid';
import { getAllUsers } from "../../../apiCalls/userApiCalls";
import { useAuthContext } from '../../../context/AuthContext';
import useSetDocumentTitle from '../../../common-hooks/setDocumentTitle';
import styles from './ListUsers.module.css';

export default function UserList() {

	useSetDocumentTitle("List of Users")
	
	const [users, setUsers] = useState([]);
	const { user } = useAuthContext();

	const token = user.authToken

	useLayoutEffect(() => {
		const getUsers = async () => {
			try {
				if (token) {
					const users = await getAllUsers(token);
					setUsers([...users]);
				}
			} catch (error) {
				Swal.fire({
					icon: 'error',
					title: 'Oops',
					text: 'Something went wrong!',
					timer: 2000,
				})
			}
		};
		getUsers();
	}, [token]);

	const columns = [
		{
			field: "user",
			headerName: "Username",
			flex: 0.33,
			renderCell: (params) => {
				return (
					<Link className={styles.userListLink} to={"/user/" + params.row._id}>
						<div className={styles.userListUser}>
							{params.row.name}
						</div>
					</Link>
				)
			}
		},
		{ field: "email", headerName: "Email", flex: 0.33 },
		{
			field: "action",
			headerName: "Action",
			flex: 0.34,
			renderCell: (params) => {
				return (
					<>
						<Link to={"/user/" + params.row._id}>
							<button className={styles.userListEdit}>View</button>
						</Link>
					</>
				)
			}
		}
	];
	return (users &&
		<div className={styles.userList}>
			<DataGrid
				rows={users}
				disableSelectionOnClick
				columns={columns}
				autoPageSize
				pagination
				getRowId={row => row._id} />
		</div>
	)
}
