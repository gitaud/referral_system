import React from 'react';
import styles from "./pdf.module.css";

export default function CreatePDF(transaction) {
	return (
		<div className={styles.cartWrapper}>
			<div className={styles.topItems}>
				<p className={styles.topItem}>{new Date(transaction.createdAt).toString()}</p>
				<p className={styles.topItem}>ID: {transaction._id}</p>
			</div>
			<div className={styles.titleContainer}>
				<p className={styles.showTitle}>KIJANA MSAFI</p>
				<p className={styles.smallTopTitle}>P.O BOX 12454 - 00400 Nrb</p>
				<p className={styles.smallTopTitle}>KRA PIN A0001230345T</p>
				<p className={styles.smallTopTitle}>Tel: 0722697202</p>
			</div>
			<p>Served by: {transaction.cashier}</p>
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
					<p className={styles.itemPrice}></p>
					<p className={styles.itemPrice}></p>
					<p className={styles.itemPrice}>Ksh {transaction.amount}</p>
				</div>
				{ transaction.customer_id && 
					<div className={styles.userInfo}>
						<p className={styles.smallTitle}>Customer Info</p>
						<div className={styles.itemInfo}>
							<p className={styles.itemPrice}>Name: </p>
							<p className={styles.itemName}>{transaction.customer_id.name}</p>
						</div>
						<div className={styles.itemInfo}>
							<p className={styles.itemPrice}>Loyalty points: </p>
							<p className={styles.itemName}>{transaction.customer_id.commissionDue} points</p>
						</div>
					</div>
				}
				<div>
					<div className={styles.footer}>
						<p>Thanks & You're Always Welcome</p>
						<p>Developed by LEAN SIGMA ANALYTICS LTD</p>
						<p>Phone +254  708 440 459</p>
					</div>
				</div>
			</div>
		</div>
	)
}