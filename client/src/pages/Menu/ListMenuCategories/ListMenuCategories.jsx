import React, { useState, useLayoutEffect } from 'react';
import { Link } from "react-router-dom"
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { getAllMenuCategories, deleteMenuCategory } from "../../../apiCalls/menuApiCalls";
import { useAuthContext } from '../../../context/AuthContext';
import useSetDocumentTitle from '../../../common-hooks/setDocumentTitle';
import styles from '../styles/Table.module.css';

export default function ListMenuCategories() {

	useSetDocumentTitle("List Menu Categories")

	const [categories, setCategories] = useState([]);
	const { user } = useAuthContext();

	const token = user.authToken

	useLayoutEffect(() => {
		const getCategories = async () => {
			if (token) {
				const foundCategories = await getAllMenuCategories(token, '');
				setCategories(foundCategories);
			}
		};
		getCategories();
	}, [token]);

	const handleDelete = async (id) => {
		try {
			Swal.fire({
				title: 'Deleting',
				timer: 2000,
				didOpen: () => Swal.showLoading(),
			})
			await deleteMenuCategory(token, id);
			setTimeout(() => {
				Swal.fire({
					icon: 'success',
					title: 'Menu item deleted',
					showConfirmButton: true,
					timer: 2000
				}).then(result => {
					if (result.isConfirmed) {
						window.location.reload();
					}
				})
			}, 1500);
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops',
				text: `${error?.cause?.response?.data || "Something went wrong!"}`
			});
		}
	}

	const columns = [
		{
			field: "name",
			headerName: "Item",
			flex: 0.66,
			renderCell: (params) => {
				return (
					<Link className={styles.listLink} state={params.row} to={"/menu/categories/" + params.row._id}>
						<div className={styles.listItem}>
							{params.row.name}
						</div>
					</Link>
				)
			}
		},
		{
			field: "action",
			headerName: "Action",
			flex: 0.34,
			renderCell: (params) => {
				return (
					<>
						<Link to={"/menu/categories/" + params.row._id} state={params.row}>
							<button className={styles.listEdit}>Edit</button>
						</Link>
						<DeleteOutline className={styles.listDelete} onClick={() => handleDelete(params.row._id)} />
					</>
				)
			}
		}
	];
	return (
		<div className={styles.list}>
			<div className={styles.titleContainer}>
				<h1>Menu categories </h1>
			</div>
			<DataGrid
				rows={categories}
				disableSelectionOnClick
				columns={columns}
				autoPageSize
				pagination
				getRowId={row => row._id} />
			<Link to="/menu/categories/new">
				<button className={styles.createButton}>New Category</button>
			</Link>
		</div>
	)
}
