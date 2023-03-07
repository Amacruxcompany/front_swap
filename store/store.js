import { configureStore } from "@reduxjs/toolkit";
import useImage from '../store/actions.js'

export const makeStore = () =>{
    return configureStore({
        reducer: {
            image: useImage
        }
    })
}

export const store = makeStore()