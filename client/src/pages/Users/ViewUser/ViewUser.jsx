import React, { useState, useLayoutEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
	AccountBalanceWalletOutlined,
	GroupsOutlined, 
	MailOutline, 
	MilitaryTechOutlined,
	PermIdentity
 } from "@mui/icons-material";
import Swal from 'sweetalert2';
import { useAuthContext } from '../../../context/AuthContext';
import { getOneUser } from '../../../apiCalls/userApiCalls';
import { getOneLevel } from '../../../apiCalls/levelApiCalls';
import EditOrCreateUserForm from '../EditOrCreateUser/EditOrCreateUserForm';
import useSetDocumentTitle from '../../../common-hooks/setDocumentTitle';
import styles from "./ViewUser.module.css";

export default function User() {
	const { user } = useAuthContext()
	const [ usrData, setUsrData ] = useState(null);
	const [ level, setLevel ] = useState(null);
	const usrId = useParams().id
	useSetDocumentTitle(`View User - ${usrData?.name}`)
	
	useLayoutEffect(() => {
		const getUser = async () => {
			try {
				let usr = await getOneUser(user.authToken, usrId);
				setUsrData(usr);
				console.log(usr);
				if (usr.level) {
					let level = await getOneLevel(user.authToken, usr.level);
					console.log(level);
					setLevel(level.name);
				}
			} catch(error) {
				Swal.fire({
					icon: 'error',
					title: 'Oops',
					text: 'Something went wrong!',
					timer: 2000,
				})
			}
		}
		getUser();
	}, [user, usrId]);


	return (usrData &&
		<div className={styles.user}>
			<div className={styles.userTitleContainer}>
				<h1 className={styles.userTitle}>{usrData.name} </h1>
				<Link to="/users/new">
					<button className={styles.userAddButton}>
						Create User
					</button>
				</Link>
			</div>
			<div className={styles.userContainer}>
				<div className={styles.userShow}>
					<div className={styles.userShowBottom}>
						<span className={styles.userShowTitle}>User Details</span>
						<div className={styles.userShowInfo}>
							<PermIdentity className={styles.userShowIcon} />
							<span className={styles.userShowInfoTitle}>{usrData.name}</span>
						</div>
						<span className={styles.userShowTitle}>Contact Details</span>
						<div className={styles.userShowInfo}>
							<MailOutline className={styles.userShowIcon} />
							<span className={styles.userShowInfoTitle}>Email: {usrData.email}</span>
						</div>
						<div className={styles.userShowInfo}>
							<PermIdentity className={styles.userShowIcon} />
							<span className={styles.userShowInfoTitle}>Phone: {usrData.phone}</span>
						</div>
						<span className={styles.userShowTitle}>Level and Commission</span>
						<div className={styles.userShowInfo}>
							<MilitaryTechOutlined className={styles.userShowIcon} />
							<span className={styles.userShowInfoTitle}>Level: {level || 'Not Subscribed'}</span>
						</div>
						<div className={styles.userShowInfo}>
							<GroupsOutlined className={styles.userShowIcon} />
							<span className={styles.userShowInfoTitle}>Referrals: {usrData.referrals_made.length }</span>
						</div>
						<div className={styles.userShowInfo}>
							<AccountBalanceWalletOutlined className={styles.userShowIcon} />
							<span className={styles.userShowInfoTitle}>Commission Earned: Ksh {usrData.commissionDue}</span>
						</div>
					</div>
				</div>
				<EditOrCreateUserForm reqType={"edit"} usrData={usrData}/>
			</div>
		</div>
	);
}
