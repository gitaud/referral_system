import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { deleteUser, getAllUsers } from "../../../apiCalls/userApiCalls";
import { useAuthContext } from '../../../context/AuthContext';
import useSetDocumentTitle from '../../../common-hooks/setDocumentTitle';
import './ListUsers.css';

export default function UserList() {

	useSetDocumentTitle("List of Users")
	
	const [users, setUsers] = useState([]);
	const { user } = useAuthContext();

	const token = JSON.parse(user).authToken;
	console.log(token);
	const handleDelete = async (id) => {
		try {
			await deleteUser(token, id);
			let allUsers = users.filter(user => user._id !== id);
			setUsers([...allUsers]);
		} catch(error) {
			console.log(error);
		}
	}

	useEffect(() => {
		const getUsers = async () => {
			if (token) {
				const users = await getAllUsers(token);
				console.log(users);
				setUsers([...users]);
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
					<Link className="userListLink" to={"/user/" + params.row._id}>
						<div className="userListUser">
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
							<button className="userListEdit">Edit</button>
						</Link>
						<DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row._id)} />
					</>
				)
			}
		}
	];
	return (users &&
		<div className="userList">
			<DataGrid
				rows={users}
				disableSelectionOnClick
				columns={columns}
				autoPageSize
				pagination
				checkboxSelection
				getRowId={row => row._id} />
		</div>
	)
}