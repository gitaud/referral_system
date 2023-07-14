import React, { useState, useLayoutEffect } from 'react';
import { Link } from  'react-router-dom';
import { Visibility } from '@mui/icons-material';
import { useAuthContext } from '../../../context/AuthContext';
import { getAllUsers } from "../../../apiCalls/userApiCalls";
import styles from "./WidgetSm.module.css";

export default function WidgetSm() {
	const { user } = useAuthContext();

	const [users, setUsers] = useState([]);

	useLayoutEffect(() => {
		const getUsers = async () => {
			try {
				const res = await getAllUsers(user.authToken, "limit=true");
				setUsers(res)
			} catch (err) {
				console.log(err);
			}
		};
		getUsers();
	}, [user]);

	return (
		<div className={styles.widgetSm}>
			<span className={styles.widgetSmTitle}>New Members</span>
			<ul className={styles.widgetSmList}>

				{users && users.map((user) => (
					<li className={styles.widgetSmListItem} key={user._id}>
						<img src={user.img || "https://static.vecteezy.com/system/resources/previews/001/840/618/large_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"} alt="" className={styles.widgetSmImg} />
						<div className={styles.widgetSmUser}>
							<span className={styles.widgetSmUsername}>{user.name}</span>
							<span className={styles.widgetSmUserTitle}>{user.email}</span>
						</div>
						<Link to={`user/${user._id}`} className={styles.widgetSmButton}>
							<Visibility className={styles.widgetSmIcon} />
							Display
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
