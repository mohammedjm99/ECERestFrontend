import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    cartItems:[],
    cartAmount:0
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addProduct: (state,action)=>{
            state.cartItems.push(action.payload);
            state.cartAmount++;
        },
        deleteProduct: (state,action)=>{
            state.cartItems = state.cartItems.filter(item=>item._id!==action.payload);
            state.cartAmount--;
        },
        controlQuantity: (state,action)=>{
            state.cartItems.forEach(item=>{
               if(item._id === action.payload.id) action.payload.control === "increase" ? item.quantity++ : item.quantity--;
            });
        },
        clear: (state)=>{
            state.cartItems = [];
            state.cartAmount = 0;
        }
    }
});

export const {addProduct,deleteProduct,controlQuantity,clear} = cartSlice.actions;
export default cartSlice.reducer;
