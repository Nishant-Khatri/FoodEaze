import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect';

const initialState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.items=[...state.items, action.payload];
    },
    removeFromBasket: (state,action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);

      if (index >= 0) {
        state.items.splice(index, 1); // Remove one item at the found index
      } else {
        console.warn(`Can't remove product (id: ${action.payload.id}) from basket as it is not there in the basket.`);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket} = basketSlice.actions



export const selectBasketItemsWithId = createSelector(
    (state) => state.basket.items,
    (_, id) => id,
    (items, id) => items.filter((item) => item.id === id)
  );

export const selectBasketItems= (state) => state.basket.items;

export const selectBasketTotal=(state)=>
     state.basket.items.reduce((total,item)=> total+=item.price,0);



export default basketSlice.reducer;