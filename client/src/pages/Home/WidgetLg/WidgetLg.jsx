import React, { useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import { getAllTransactions } from "../../../apiCalls/transactionApiCalls";
import { KeShilling } from '../../../utils/currencyFormatter';
import styles from "./WidgetLg.module.css";

export default function WidgetLg() {
	const { user } = useAuthContext();

	const [transactions, setTransactions] = useState([]);

	useLayoutEffect(() => {
		const getTransactions = async () => {
			try {
				const today = new Date();
				const yesterday = new Date(today.setHours(0,0,0));
				const filterParams = `date_gte=${yesterday.toDateString()}&date_lte=${today.toDateString()}`
				const res = await getAllTransactions(user.authToken, filterParams);
				setTransactions(res)
			} catch (err) {
				console.log(err);
			}
		};
		getTransactions();
	}, [user]);

	return (
		<div className={styles.widgetLg}>
			<h3 className={styles.widgetLgTitle}>
				Latest Transactions
			</h3>
			<table className={styles.widgetLgTable}>
				<thead>
					<tr className={styles.widgetLgTr}>
						<th className={styles.widgetLgTh}>Date</th>
						<th className={styles.widgetLgTh}>Amount</th>
						<th className={styles.widgetLgTh}>Commission</th>
						<th className={styles.widgetLgTh}>Action</th>
					</tr>
				</thead>
				<tbody>
					{transactions && transactions.map((transaction) => (
						<tr className={styles.widgetLgTr} key={transaction._id}>
							<td className={styles.widgetLgDate}>{new Date(transaction.createdAt).toDateString()}</td>
							<td className={styles.widgetLgAmount}>{KeShilling.format(transaction.amount)}</td>
							<td className={styles.widgetLgAmount}>{transaction.commission || 0}</td>
							<td className={styles.widgetLgStatus}>
								<Link className={styles.widgetLgButton} to={`transaction/${transaction._id}`}>
									View
								</Link>
							</td>
						</tr>
					))
					}
				</tbody>
			</table>
		</div>
	)
}
