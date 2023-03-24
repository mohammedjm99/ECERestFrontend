import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data:null,
    isError: null,
    isLoading: false
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        fetchStart: (state)=>{
            state.isLoading = true;
            state.isError = null;
        },
        setProducts: (state,action)=>{
            state.data = action.payload;
            state.isLoading = false;
            state.isError = null;
        },
        fetchError: (state,action)=>{
            state.isLoading = false;
            state.isError = action.payload;
        },
    }
})
export const {fetchStart,setProducts,fetchError} = postsSlice.actions;

export default postsSlice.reducer;