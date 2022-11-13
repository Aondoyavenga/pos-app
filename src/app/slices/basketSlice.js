import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    items: []
};
export const calcuAmt = (data) => {
    const total = data && data.reduce((a, v) => +v.price + a, 0);
    return total;
  };

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        // actions
        addToBasket: (state, action) =>{
            state.items = [...state.items, action.payload]
        },
        removeFromBasket: (state, action) =>{
            // console.warn(action.payload)
            const index = state.items.findIndex((basketItem) => basketItem.id == action.payload);
            let newBasket = [...state.items];
            if(index >= 0) {
                newBasket.splice(index, 1)
            }
            console.warn(`Can't remove item of null`)

            state.items = newBasket
        }
        
    },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;
export const selectItems = (state) =>state.basket.items;


export default basketSlice.reducer;