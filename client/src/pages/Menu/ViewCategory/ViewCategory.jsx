import React, { useLayoutEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom"
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { getMenuCategory, deleteMenuItem } from "../../../apiCalls/menuApiCalls";
import { useAuthContext } from '../../../context/AuthContext';
import useSetDocumentTitle from '../../../common-hooks/setDocumentTitle';
import styles from '../styles/Table.module.css';

export default function ViewCategory() {
	const categoryId = useParams().id
	const { user } = useAuthContext();
	const [ category, setCategory ] = useState({ items: [] })
	
	useLayoutEffect(() => {
		const getCategory = async () => {
			try {
				const categoryFound = await getMenuCategory(user.authToken, categoryId);
				setCategory(categoryFound);
			} catch(error) {
				Swal.fire({
					icon: 'error',
					title: 'Oops',
					text: `${error?.cause?.response?.data || "Could not fetch category"}`
				})
			}
		}
		getCategory();
	}, [user, categoryId])

	useSetDocumentTitle(`View Category - ${category.name}`);

	const handleDelete = async (id) => {
		try {
			Swal.fire({
				title: 'Deleting',
				timer: 2000,
				didOpen: () => Swal.showLoading(),
			})
			await deleteMenuItem(user.authToken, id);
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
				text: "Something went wrong!"
			});
		}
	}

	const columns = [
		{
			field: "name",
			headerName: "Item",
			flex: 0.50,
			renderCell: (params) => {
				return (
					<div className={styles.listItem}>
						{params.row.name}
					</div>
				)
			}
		},
		{ field: "price", headerName: "Price", flex: 0.25 },
		{
			field: "action",
			headerName: "Action",
			flex: 0.25,
			renderCell: (params) => {
				return (
					<>
						<Link to={"/menu/items/" + params.row._id} state={params.row} >
							<button className={styles.listEdit}>Edit</button>
						</Link>
						<DeleteOutline className={styles.listDelete} onClick={() => handleDelete(params.row._id)} />
					</>
				)
			}
		}
	];
	return (category &&
		<div className={styles.list}>
			<div className={styles.titleContainer}>
				<h1>{category.name}</h1>
				<Link to={`/menu/categories/${category._id}/edit`} state={category.name}>
					<button className={styles.editButton}>Edit</button>
				</Link>
			</div>
			<DataGrid
				rows={category.items}
				disableSelectionOnClick
				columns={columns}
				autoPageSize
				pagination
				getRowId={row => row._id} />
			<Link to={`/menu/categories/${category._id}/items/new`} state={category.name}>
				<button className={styles.createButton}>Add Item</button>
			</Link>
		</div>
	)
}
