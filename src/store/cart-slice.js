import { createSlice } from '@reduxjs/toolkit';
import { fetchCartData } from './cart-actions';

const initialCartState = {
	items: [],
	totalQuantity: 0, //no of items in cart not items.length
	changed: false
};

const cartSlice = createSlice({
	name: 'cart',
	initialState: initialCartState,
	reducers: {
		addItemToCart(state, action){
			const newItem = action.payload.item;
			state.totalQuantity++;
			state.changed = true;
			const existingItem = state.items.find(item => item.id === newItem.id);

			if(!existingItem) {
				state.items.push({
					id: newItem.id,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
					name: newItem.title
				});
			} else {
				existingItem.quantity++;
				existingItem.totalPrice += newItem.price;
			}
		},
		removeItemFromCart(state, action){
			const id = action.payload;
			state.totalQuantity--;
			state.changed = true;
			const existingItem = state.items.find(item => item.id === id);
			if(existingItem.quantity === 1) {
				state.items = state.items.filter(item => item.id !== id);
			} else {
				existingItem.quantity--;
				existingItem.totalPrice -= existingItem.price;
			};
		},
	},
	extraReducers: { // we use automatically created actions by 'createAsyncThunk'
		[fetchCartData.fulfilled]: (state, action) => {
			console.log('data reducer:' ,action.payload);
			state.totalQuantity = action.payload.totalQuantity;
			state.items = action.payload.items;
		}
	}
});

export const cartActions = cartSlice.actions;
export default cartSlice;