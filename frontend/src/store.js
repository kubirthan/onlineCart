import {combineReducers, configureStore} from '@reduxjs/toolkit'
import productsReducer from './slices/productsSlice'


const reducer = combineReducers({
    productsState: productsReducer
})

const store = configureStore({
    reducer
})

export default store