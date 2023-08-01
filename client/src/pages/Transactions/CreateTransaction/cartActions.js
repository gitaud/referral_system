import { cloneDeep } from 'lodash';
export const ADD_TO_CART = "ADD TO CART";
export const INCREASE_QUANTITY = "INCREASE QUANTITY";
export const DECREASE_QUANTITY = "DECREASE QUANTITY";

export const addToCart =  (data) => {
	return { type: ADD_TO_CART, data }
}

export const increaseQuantity = (data) => {
	return { type: INCREASE_QUANTITY, data }
}

export const decreaseQuantity = (data) => {
	return { type: DECREASE_QUANTITY, data } 
}

export const defaultCartState = {
	categories: {},
	total: 0
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
			newState.total += item.price
			return newState;
		case INCREASE_QUANTITY:
			newState.categories[categoryId].items[item._id].quantity += 1;
			newState.categories[categoryId].items[item._id].total += item.price;
			newState.total += item.price
			return newState;
		case DECREASE_QUANTITY:
			if (newState.categories[categoryId].items[item._id].quantity === 1) {
				delete newState.categories[categoryId].items[item._id];
				newState.total -= item.price;
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
				newState.total -= item.price;
				return newState;
			}
		default:
			return state;
	}
}