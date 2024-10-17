import {combineReducers, configureStore} from '@reduxjs/toolkit'
import productsReducer from './slices/productsSlice'
import productReducer from './slices/productSlice'
import authreducer from './slices/authSlice'


const reducer = combineReducers({
    productsState: productsReducer,
    productState: productReducer,
    authState: authreducer
})

const store = configureStore({
    reducer
})

export default store