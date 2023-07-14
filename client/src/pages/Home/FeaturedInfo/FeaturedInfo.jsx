import React, { useState, useLayoutEffect } from 'react';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { useAuthContext } from '../../../context/AuthContext';
import { getTransactionIncome } from '../../../apiCalls/transactionApiCalls';
import styles from "./FeaturedInfo.module.css";

export default function FeaturedInfo() {
	const { user } = useAuthContext();

	const [income, setIncome] = useState([]);
	const [percentage, setPercentage] = useState(0);

	useLayoutEffect(() => {
		const getIncome = async () => {
			try {
				const totals = await getTransactionIncome(user.authToken);
				totals.sort((a, b) => {
					return a.total - b.total
				})
				setIncome(totals);
				setPercentage(((totals[1].total - totals[0].total) / totals[0].total) * 100)
			} catch (err) {
				console.log(err);
			}
		}
		getIncome();
	}, [user]);

	return (
		<div className={styles.featured}>
			<div className={styles.featuredItem}>
				<span className={styles.featuredTitle}>Revenue</span>
				<div className={styles.featuredMoneyContainer}>
					<span className={styles.featuredMoney}>Ksh {income?.length > 1 ? income[1].total : 0}</span>
					<span className={styles.featuredMoneyRate}>{Math.floor(percentage)} % {percentage > 0 ? <ArrowUpward className={styles.featuredIcon} /> : <ArrowDownward className={styles.featuredIconnegative} />}</span>
				</div>
				<span className={styles.featuredSub}>Compared to last month's Ksh { income?.length > 1 ? income[0].total : 0}</span>
			</div>
		</div>
	);
}
