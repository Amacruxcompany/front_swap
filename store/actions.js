import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllListImageCurrency } from "@/services/getDataServices";

//Estado inicial
const initialState = {
    imagesArray: []
}

//acciones
export const useImage = createSlice({
    name: 'image',
    initialState,
    reducers:{
        addImage: (state, action) =>{
            state.imagesArray = [...action.payload]
        }
    }
})

export const { addImage } = useImage.actions

export default useImage.reducer;
