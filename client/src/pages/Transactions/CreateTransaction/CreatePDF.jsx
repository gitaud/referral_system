import React, { useEffect } from 'react';
import { KeShilling } from '../../../utils/currencyFormatter';
import styles from "./pdf.module.scss";

export default function CreatePDF() {

	const transaction = JSON.parse(localStorage.getItem("transaction"))
	
	useEffect(() => {
		window.print();
		window.close();
	}, [transaction])

	return ( transaction &&
		<div className={styles.invoicePOS}>
			<div className={styles.topBar}>
				<p>ID: {transaction._id}</p>
			</div>
			<center className={styles.top}>
				<div className={styles.info}>
					<h2>KIJANA MSAFI</h2>
					<p>
						P.O BOX 12454 - 00400 Nrb<br />
						KRA PIN A0001230345T<br />
						Tel: 0722697202<br />
					</p>
				</div>
			</center>

			<div className={styles.info}>
				<p className={styles.itemtext}>Served by: {transaction.recorded_by.name}</p>
				<p className={styles.itemtext}>{new Date(transaction.createdAt).toString().slice(0, 25)}</p>
			</div>

			<div className={styles.bot}>

				<div id={styles.table}>
					<table>
						<tr className={styles.tabletitle}>
							<td className={styles.item}>
								<h2>Item</h2>
							</td>
							<td className={styles.Hours}>
								<h2>Qty</h2>
							</td>
							<td className={styles.Rate}>
								<h2>Total</h2>
							</td>
						</tr>
						{(() => {
							let elems = [];
							for (let prop in transaction.items) {
								elems.push(
									<>
										<tr>
											<td className={styles.item} colspan="3">
												<p className={styles.itemtext}>{transaction.items[prop].name}</p>
											</td>
										</tr>
										{(() => {
											let kids = [];
											for (let itemProp in transaction.items[prop].items) {
												kids.push(
													<tr key={itemProp}>
														<td className={styles.tableitem}>
															<p className={styles.itemtext}>{transaction.items[prop].items[itemProp].name}</p>
														</td>
														<td className={styles.tableitem}>
															<p className={styles.itemtext}>{transaction.items[prop].items[itemProp].quantity}</p>
														</td>
														<td className={styles.tableitem}>
															<p className={styles.itemtext}>{transaction.items[prop].items[itemProp].total}</p>
														</td>
													</tr>
												)
											}
											return kids;
										})()}
									<tr className={styles.service} />
									</>
								)
							}
							return elems;
						})()}
						<tr className={styles.tabletitle}>
							<td></td>
							<td className={styles.Rate}>
								<h2>Total</h2>
							</td>
							<td className={styles.payment}>
								<h2>{KeShilling.format(transaction.amount)}</h2>
							</td>
						</tr>
						<tr />
						{ transaction.customer_id &&
							<>
							<tr className={styles.tabletitle}>
								<td className={styles.tableitem}>
									<p className={styles.itemtext}>Name</p>
								</td>
								<td className={styles.tableitem}>
									<p className={styles.itemtext}>{transaction.customer_id.name}</p>
								</td>
							</tr>
							<tr className={styles.tabletitle}>
								<td className={styles.tableitem}>
									<p className={styles.itemtext}>Points Earned</p>
								</td>
								<td className={styles.tableitem}>
									<p className={styles.itemtext}>{transaction.commission}</p>
								</td>
							</tr>
							{	transaction.redeemed &&
								<tr className={styles.tabletitle}>
									<td className={styles.tableitem}>
										<p className={styles.itemtext}>Points Redeemed</p>
									</td>
									<td className={styles.tableitem}>
										<p className={styles.itemtext}>{transaction.amount - transaction.redeemedTotal}</p>
									</td>
								</tr>
							}
							<tr className={styles.tabletitle}>
								<td className={styles.tableitem}>
									<p className={styles.itemtext}>Total points</p>
								</td>
								<td className={styles.tableitem}>
									<p className={styles.itemtext}>{transaction.customer_id.commissionDue}</p>
								</td>
							</tr>
							</>
						}
					</table>
				</div>
				<div className={styles.legalcopy}>
					<p className={styles.itemtext}>Thanks & You're Always Welcome</p>
					<p className={styles.itemtext}>Developed by LEAN SIGMA ANALYTICS LTD</p>
					<p className={styles.itemtext}>Phone +254 708 440 459</p>
				</div>
			</div>
		</div >
		
	)
}