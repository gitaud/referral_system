import React, { useLayoutEffect, useState, useReducer } from 'react';
import ReactDOMServer from 'react-dom/server';
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { cloneDeep } from 'lodash';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import SearchUser from '../../../common-components/search-user/SearchUser';
import { useAuthContext } from '../../../context/AuthContext';
import { 
	initialize,
	UserContextProvider, 
	useUserContext  
} from '../../../context/UserContext'
import { getAllMenuCategories } from '../../../apiCalls/menuApiCalls';
import { createTransaction } from '../../../apiCalls/transactionApiCalls';
import useSetDocumentTitle from '../../../common-hooks/setDocumentTitle';
import { 
	defaultCartState, 
	addToCart,
	increaseQuantity,
	decreaseQuantity,
	redeemPoints,
	cartReducer 
} from './cartActions';
import CreatePDF from './CreatePDF';
import styles from "../styles/Menu.module.css";


const Inner = () => {
	useSetDocumentTitle("Create New Transaction");
	const navigate = useNavigate()
	const { user } = useAuthContext();
	const { searchedUser, dispatch } = useUserContext();
	const [categories, setCategories] = useState([]);
	const [ searchTrue, setSearchTrue ] = useState(false);
	const [ redeem, setRedeem ] = useState(false);
	const [ cart, dispatchCart ] = useReducer(cartReducer, defaultCartState);

	const handleChange = () => {
		if (searchTrue && searchedUser.user) {
			setRedeem(false);
			dispatchCart(redeemPoints({ redeem: false, points: searchedUser.user.commissionDue }))
		}
		setSearchTrue(!searchTrue);
	}

	const handleRedeem = () => {
		setRedeem(!redeem);
		dispatchCart(redeemPoints({ redeem: !redeem, points: searchedUser.user.commissionDue }))
	}

	const handleChangeUser = () => {
		setSearchTrue(true);
		setRedeem(false);
		dispatchCart(redeemPoints({redeem: false, points: searchedUser.user.commissionDue}))
		dispatch(initialize());
	}

	const printPdf = (transaction) => {
		transaction.cashier = user.name;
		const printElement = ReactDOMServer.renderToString(CreatePDF(transaction));
		console.log('About to print');
		html2pdf().from(printElement).toPdf().get('pdf').then(function(pdfObj) {
			pdfObj.autoPrint();
			console.log('printing');
			window.open(pdfObj.output('bloburl'), '_blank');
		});
	}

	const handleSubmit = async () => {
		try {
			if (cart.total === 0) {
				throw new Error("Add items to cart!", 
					{ cause : 
						{ response: 
							{ 
								data: "Empty Cart"
							}
						}
					}
				)
			}
			let cartObj = {};
			cartObj.items = cloneDeep(cart.categories);
			if (searchedUser.user) {
				cartObj.customer_id = searchedUser.user._id;
				cartObj.customer_level_id = searchedUser.user.level._id;
			} else {
				cartObj.customer_id = null;
				cartObj.customer_level_id = null;
			}
			cartObj.redeemed = redeem;
			cartObj.recorded_by = user.id;
			cartObj.amount = cart.trueTotal;
			cartObj.redeemedTotal = cart.redeemedTotal;
			Swal.fire({
				title: 'Saving',
				timer: 2000,
				didOpen: () => Swal.showLoading(),
			})
			const newTransaction = await createTransaction(user.authToken, cartObj);
			setTimeout(() => {
				Swal.fire({
					icon: 'success',
					title: 'Transaction Added',
					showConfirmButton: true,
					timer: 2000
				})
			}, 1500);
			navigate(`/transaction/${newTransaction._id}`);
			printPdf(newTransaction);
		} catch(error) {
			console.log(error);
			Swal.fire({
				icon: 'error',
				title: 'Oops',
				text: 'Cannot create order'
			})
		}
	} 

	useLayoutEffect(() => {
		const getMenuItems = async () => {
			try {
				let foundCategories = await getAllMenuCategories(user.authToken, null);
				setCategories(foundCategories);
			} catch (error) {
				Swal.fire({
					icon: 'error',
					title: 'Oops',
					text: 'Could not fetch menu items!',
					timer: 2000,
				})
			}
		}
		getMenuItems();
	}, [user])


	return (
		<div className={styles.wrapper}>
			<div className={styles.titleContainer}>
				<h1 className={styles.title}>Create New Transaction </h1>
				<div></div>
			</div>
			<div className={styles.container}>
				<div className={styles.menuItems}>
					{ categories && categories.map(category => 
						<div key={category._id}>
							<p className={styles.showTitle}>{category.name}</p>
							<div>
								{ category.items.map(item => 
									<div className={styles.itemInfo} key={item._id}>
										<p className={styles.itemName}>{item.name}</p>
										<p className={styles.itemPrice}>Ksh {item.price}</p>
										<button 
											className={styles.addButton} 
											onClick={ () =>
												dispatchCart(
													addToCart({ 
														categoryName: category.name, 
														categoryId: category._id, 
														item: item 
													})
												)
											}
										>Add</button>
									</div>	
								)}
							</div>
						</div>
					)}
				</div>
				<div className={styles.cartWrapper}>
					<p className={styles.showTitle}>Cart</p>
					<hr className={styles.line}/>
					<div className={styles.cart}>
						<div className={styles.itemInfo}>
							<p className={styles.itemPrice}>Item</p>
							<p className={styles.itemPrice}>Qty</p>
							<p className={styles.itemPrice}>Price</p>
							<p className={styles.itemPrice}>Amount</p>
							<p className={styles.itemPrice}></p>
						</div>
						<hr className={styles.line} />
						<div className={styles.innerCart}>
							{(() => {
								let elems = [];
								for (let prop in cart.categories) {
									elems.push(
										<div key={cart.categories[prop].name}>
											<p className={styles.smallTitle}>{cart.categories[prop].name}</p>
											{(() => {
												let kids = [];
												for (let itemProp in cart.categories[prop].items) {
													kids.push(
														<div className={styles.cartItemInfo} key={itemProp}>
															<p className={styles.itemName}>
																{cart.categories[prop].items[itemProp].name}
															</p>
															<p className={styles.itemPrice}>
																{cart.categories[prop].items[itemProp].quantity}
															</p>
															<p className={styles.itemPrice} style={{marginRight: '5px'}}>
																Ksh {cart.categories[prop].items[itemProp].price}
															</p>
															<p className={styles.itemPrice}>
																Ksh {cart.categories[prop].items[itemProp].total}
															</p>
															<div className={styles.qtyIcons}>
																<AddCircleOutline 
																	className={styles.qtyIcon}
																	onClick={() =>
																		dispatchCart(
																			increaseQuantity({
																				categoryName: cart.categories[prop].name,
																				categoryId: prop,
																				item: cart.categories[prop].items[itemProp]
																			})
																		)
																	}  
																/>
																<RemoveCircleOutline 
																	className={styles.qtyIcon}
																	onClick={() => 
																		dispatchCart(
																			decreaseQuantity({ 
																				categoryName: cart.categories[prop].name,
																				categoryId: prop,
																				item: cart.categories[prop].items[itemProp]
																			})
																		)
																	} 
																/>
															</div>
														</div>
													)
												} 
												return kids;
											})()}
										</div>
									)
								}
								return elems;
							})() } 
						</div>
					
						<hr className={styles.line} />
						<div className={styles.itemInfo}>
							<p className={styles.itemName}>
								Order Total: 
							</p>
							<p className={styles.itemPrice}></p>
							<p className={styles.itemPrice}>Ksh {cart.redeemedTotal}</p>
						</div>
						<div className={styles.setSearch}>
							<input className={styles.checkBox} value={searchTrue} checked={searchTrue} type="checkbox" id="searchUser" onChange={handleChange}/>
							<label htmlFor='searchUser' className={styles.itemName}>Add user?</label>
						</div>
						{ 
							searchTrue ? 
								searchedUser.user ? 
									<div>
										<div className={styles.itemInfo}>
											<p className={styles.itemName}>Name: {searchedUser.user.name}</p>
											<p className={styles.itemName}>Loyalty Points: {searchedUser.user.commissionDue} </p>
										</div>
										{cart.trueTotal ? 
											<div className={styles.setSearch}>
												<input className={styles.checkBox} value={redeem} checked={redeem} type="checkbox" id="redeemPoints" onChange={handleRedeem} />
												<label htmlFor='redeemPoints' className={styles.itemName}>Redeem Loyalty Points? </label>
											</div>
											:
											<></>
										}
										<div className={styles.displayUserButton}>
											<button className={styles.changeUserButton} onClick={handleChangeUser}>Change User</button>
										</div>
									</div>
								: 
									<SearchUser /> 
							:
							<></> 
						}
						<button className={styles.addButton} onClick={handleSubmit}>Create Order</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function CreateTransaction () {
	return(
		<UserContextProvider>
			<Inner />
		</UserContextProvider>
	)
}