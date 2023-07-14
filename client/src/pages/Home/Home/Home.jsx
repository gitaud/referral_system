import React, { useState, useLayoutEffect, useMemo } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { getUserStats } from '../../../apiCalls/userApiCalls';
import useSetDocumentTitle from '../../../common-hooks/setDocumentTitle';
import FeaturedInfo from '../FeaturedInfo/FeaturedInfo';
import Chart from '../Chart/Chart';
import WidgetLg from '../WidgetLg/WidgetLg';
import WidgetSm from '../WidgetSm/WidgetSm';
import styles from './Home.module.css';


export default function Home() {
	useSetDocumentTitle("Referral System - Home");
	const { user } = useAuthContext();

	const [userStats, setUserStats] = useState([]);

	const MONTHS = useMemo(
		() => [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"June",
			"July",
			"Aug",
			"Sept",
			"Oct",
			"Nov",
			"Dec"
		],
		[]
	);

	useLayoutEffect(() => {
		const getStats = async () => {
			try {
				const res = await getUserStats(user.authToken);
				let stats = [];
				res.sort((a, b) => {
					return a._id - b._id
				})
				for (let indx = 0; indx < res.length; indx++){
					stats.push({
						name: MONTHS[res[indx]._id - 1],
						"Users Added": res[indx].total
					})
				}
				setUserStats(stats);
			} catch (err) {
				console.log(err);
			}
		}
		getStats();
	}, [MONTHS, user]);

	return (
		<div className={styles.home}>
			<FeaturedInfo />
			<Chart data={userStats} title="User Analytics" dataKey="Users Added" grid={true} />
			<div className={styles.homeWidgets}>
				<WidgetSm />
				<WidgetLg />
			</div>
		</div>
	)
}
