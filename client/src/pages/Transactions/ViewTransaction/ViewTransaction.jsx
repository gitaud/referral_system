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
		const getTransaction = async () => {
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
		getTransaction();
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
							<span className={styles.transactionShowInfoTitle}>Customer: {transaction.customer_id?.name || 'Not Registered'}</span>
						</div>
						<span className={styles.transactionShowTitle}>Level and Commission</span>
						<div className={styles.transactionShowInfo}>
							<MilitaryTechOutlined className={styles.transactionShowIcon} />
							<span className={styles.transactionShowInfoTitle}>Level: {transaction.level?.name || 'Not Registered'}</span>
						</div>
						<div className={styles.transactionShowInfo}>
							<AccountBalanceWalletOutlined className={styles.transactionShowIcon} />
							<span className={styles.transactionShowInfoTitle}>Amount: Ksh {transaction.amount || 0}</span>
						</div>
						<div className={styles.transactionShowInfo}>
							<AccountBalanceWalletOutlined className={styles.transactionShowIcon} />
							<span className={styles.transactionShowInfoTitle}>Commission: Ksh {transaction.commission || 0}</span>
						</div>
						<div className={styles.transactionShowInfo}>
							<CalendarViewMonthOutlined className={styles.transactionShowIcon} />
							<span className={styles.transactionShowInfoTitle}>Date Recorded: {new Date(transaction.createdAt).toString().slice(0, 25)}</span>
						</div>
					</div>
				</div>
				<div className={styles.cartWrapper}>
					<p className={styles.showTitle}>Order Details</p>
					<hr className={styles.line} />
					<div className={styles.cart}>
						<div className={styles.itemInfo}>
							<p className={styles.itemName}>Item</p>
							<p className={styles.itemPrice}>Qty</p>
							<p className={styles.itemPrice}>Price</p>
							<p className={styles.itemPrice}>Total</p>
						</div>
						<hr className={styles.line} />
						<div className={styles.innerCart}>
							{(() => {
								let elems = [];
								for (let prop in transaction.items) {
									elems.push(
										<div key={transaction.items[prop].name}>
											<p className={styles.smallTitle}>{transaction.items[prop].name}</p>
											{(() => {
												let kids = [];
												for (let itemProp in transaction.items[prop].items) {
													kids.push(
														<div className={styles.cartItemInfo} key={itemProp}>
															<p className={styles.itemName}>
																{transaction.items[prop].items[itemProp].name}
															</p>
															<p className={styles.itemPrice}>
																{transaction.items[prop].items[itemProp].quantity}
															</p>
															<p className={styles.itemPrice}>
																Ksh {transaction.items[prop].items[itemProp].price}
															</p>
															<p className={styles.itemPrice}>
																Ksh {transaction.items[prop].items[itemProp].total}
															</p>
														</div>
													)
												}
												return kids;
											})()}
										</div>
									)
								}
								return elems;
							})()}
						</div>

						<hr className={styles.line} />
						<div className={styles.itemInfo}>
							<p className={styles.itemName}>
								Order Total:
							</p>
							<p className={styles.itemPrice}>Ksh {transaction.amount}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}