import React, { useState, useLayoutEffect } from 'react';
import {
	AccountBalanceWalletOutlined,
	CalendarViewMonthOutlined,
	MilitaryTechOutlined,
	PermIdentity,
} from "@mui/icons-material";
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import { getOneTransaction } from '../../../apiCalls/transactionApiCalls';
import useSetDocumentTitle from '../../../common-hooks/setDocumentTitle';
import styles from "./ViewTransaction.module.css";

export default function ViewTransaction() {
	const { user } = useAuthContext()
	const transactionId = useParams().id;
	useSetDocumentTitle(`Transaction ${transactionId}`)
	const [ transaction, setTransaction ] = useState()

	useLayoutEffect(() => {
		const getUser = async () => {
			try {
				let data = await getOneTransaction(user.authToken, transactionId);
				setTransaction(data);
			} catch (error) {
				Swal.fire({
					icon: 'error',
					title: 'Oops',
					text: `${error?.cause?.response?.data || 'Something went wrong!'}`,
					timer: 2000,
				})
			}
		}
		getUser();
	}, [user, transactionId])


	return ( transaction &&
		<div className={styles.transaction}>
			<div className={styles.transactionTitleContainer}>
				<h1 className={styles.transactionTitle}>View Transaction </h1>
			</div>
			<div className={styles.transactionContainer}>
				<div className={styles.transactionShow}>
					<div className={styles.transactionShowBottom}>
						<span className={styles.transactionShowTitle}>Transaction Details</span>
						<div className={styles.transactionShowInfo}>
							<PermIdentity className={styles.transactionShowIcon} />
							<span className={styles.transactionShowInfoTitle}>Customer: {transaction.name}</span>
						</div>
						<span className={styles.transactionShowTitle}>Level and Commission</span>
						<div className={styles.transactionShowInfo}>
							<MilitaryTechOutlined className={styles.transactionShowIcon} />
							<span className={styles.transactionShowInfoTitle}>Level: {transaction.level}</span>
						</div>
						<div className={styles.transactionShowInfo}>
							<AccountBalanceWalletOutlined className={styles.transactionShowIcon} />
							<span className={styles.transactionShowInfoTitle}>Commission: Ksh {transaction.commission}</span>
						</div>
						<div className={styles.transactionShowInfo}>
							<CalendarViewMonthOutlined className={styles.transactionShowIcon} />
							<span className={styles.transactionShowInfoTitle}>Date Recorded: {new Date(transaction.createdAt).toString().slice(0, 25)}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}