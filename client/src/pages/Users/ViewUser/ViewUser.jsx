import React, { useState, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
	AccountBalanceWalletOutlined,
	AttachMoneyOutlined,
	BorderColorOutlined,
	GroupsOutlined,
	Link, 
	MailOutline, 
	MilitaryTechOutlined,
	PermIdentity,
	RequestPageOutlined
 } from "@mui/icons-material";
import Swal from 'sweetalert2';
import { useAuthContext } from '../../../context/AuthContext';
import { getOneUser } from '../../../apiCalls/userApiCalls';
import { getOneLevel } from '../../../apiCalls/levelApiCalls';
import EditUserForm from '../EditUser/EditUserForm';
import AddReferralForm from '../AddReferral/AddReferralForm';
import useSetDocumentTitle from '../../../common-hooks/setDocumentTitle';
import styles from "./ViewUser.module.css";

export default function User() {
	const { user } = useAuthContext()
	const [ usrData, setUsrData ] = useState(null);
	const [ level, setLevel ] = useState(null);
	const [ mode, setMode ] = useState("edit");
	const usrId = useParams().id
	useSetDocumentTitle(`View User - ${usrData?.name}`)

	const changeMode = (selectedMode) => {
		setMode(selectedMode);
	}
	
	useLayoutEffect(() => {
		const getUser = async () => {
			try {
				let usr = await getOneUser(user.authToken, usrId);
				setUsrData(usr);
				let level = await getOneLevel(user.authToken, usr.level);
				setLevel(level.name);
			} catch(error) {
				console.log(error.cause);
				Swal.fire({
					icon: 'error',
					title: 'Oops',
					text: 'Something went wrong!',
					timer: 2000,
				})
			}
		}
		getUser();
	}, [user, usrId])


	return (usrData &&
		<div className={styles.user}>
			<div className={styles.userTitleContainer}>
				<h1 className={styles.userTitle}>{usrData.name} </h1>
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
						<span className={styles.userShowTitle}>Actions</span>
						<div className={styles.userShowInfo + " " + styles.link } onClick={() => changeMode("edit")}>
							<BorderColorOutlined className={styles.userShowIcon} />
							<span className={styles.userShowInfoTitle}>Edit User</span>
						</div>
						<div className={styles.userShowInfo + " " + styles.link} onClick={
							() => changeMode("referral")
						}>
							<Link className={styles.userShowIcon} />
							<span className={styles.userShowInfoTitle}> Add Referral </span>
						</div>
						<div className={styles.userShowInfo + " " + styles.link} onClick={
							() => changeMode("transaction")
						}>
							<AttachMoneyOutlined className={styles.userShowIcon} />
							<span className={styles.userShowInfoTitle}>Add Transaction</span>
						</div>
						<div className={styles.userShowInfo + " " + styles.link} onClick={
							() => changeMode("alltransaction")
						}>
							<RequestPageOutlined className={styles.userShowIcon} />
							<span className={styles.userShowInfoTitle}>List User Transactions</span>
						</div>
					</div>
				</div>
				{mode === "edit" ? <EditUserForm usrData={usrData}/> : mode === "referral" ? <AddReferralForm usrData={usrData} /> : mode === "transaction" ? <>Transaction </> : <>New Transaction</> }
			</div>
		</div>
	);
}
