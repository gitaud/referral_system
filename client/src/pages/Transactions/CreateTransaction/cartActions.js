import { cloneDeep } from 'lodash';
export const ADD_TO_CART = "ADD TO CART";
export const INCREASE_QUANTITY = "INCREASE QUANTITY";
export const DECREASE_QUANTITY = "DECREASE QUANTITY";
export const REDEEM_POINTS_TRUE = "REDEEM POINTS TRUE";
export const REDEEM_POINTS_FALSE = "REDEEM POINTS FALSE";

export const addToCart =  (data) => {
	return { type: ADD_TO_CART, data }
}

export const increaseQuantity = (data) => {
	return { type: INCREASE_QUANTITY, data }
}

export const decreaseQuantity = (data) => {
	return { type: DECREASE_QUANTITY, data } 
}

export const redeemPoints = (data) => {
	if (data.redeem === true) {
		return { type: REDEEM_POINTS_TRUE, data }
	} else {
		return { type: REDEEM_POINTS_FALSE, data }
	}
}

export const defaultCartState = {
	categories: {},
	trueTotal: 0,
	redeemedTotal: 0
}


export const cartReducer = (state, action) => {
	let newState = cloneDeep(state);
	let item = action.data.item;
	let categoryName = action.data.categoryName;
	let categoryId = action.data.categoryId;
	switch (action.type) {
		case ADD_TO_CART:
			if (!newState.categories.hasOwnProperty(categoryId)) {
				// handle 'cart has no category'
				let newCategory = {
					name: categoryName,
					items: {}
				};
				newState.categories[categoryId] = { ...newCategory };
			}
			if (!newState.categories[categoryId].items.hasOwnProperty(item._id)) {
				// handle 'category has no item'
				newState.categories[categoryId].items[item._id] = {
					_id: item._id,
					name: item.name,
					price: item.price,
					quantity: 0,
					total: 0
				}
			}
			newState.categories[categoryId].items[item._id].quantity += 1;
			newState.categories[categoryId].items[item._id].total += item.price;
			newState.trueTotal += item.price;
			newState.redeemedTotal += item.price;
			return newState;
		case INCREASE_QUANTITY:
			newState.categories[categoryId].items[item._id].quantity += 1;
			newState.categories[categoryId].items[item._id].total += item.price;
			newState.trueTotal += item.price;
			newState.redeemedTotal += item.price;
			return newState;
		case DECREASE_QUANTITY:
			if (newState.categories[categoryId].items[item._id].quantity === 1) {
				delete newState.categories[categoryId].items[item._id];
				newState.trueTotal -= item.price;
				newState.redeemedTotal -= item.price;
				let itemsInCategory;
				for (let prop in newState.categories[categoryId].items) {
					if (newState.categories[categoryId].items.hasOwnProperty(prop)) {
						itemsInCategory = true;
					}
				}
				if (!itemsInCategory) {
					delete newState.categories[categoryId];
				}
				return newState;
			} else {
				newState.categories[categoryId].items[item._id].total -= item.price;
				newState.categories[categoryId].items[item._id].quantity -= 1;
				newState.trueTotal -= item.price;
				newState.redeemedTotal -= item.price;
				return newState;
			}
		case REDEEM_POINTS_TRUE:
			if (action.data.points >= newState.trueTotal) {
				newState.redeemedTotal = 0;
			} else {
				newState.redeemedTotal -= action.data.points;
			}
			return newState;
		case REDEEM_POINTS_FALSE:
			newState.redeemedTotal = newState.trueTotal;
			return newState
		default:
			return state;
	}
}