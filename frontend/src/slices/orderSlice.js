import { createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name:"order",
    initialState:{
        orderDeatil: {},
        userOrders: [],
        loading: false
    },
    reducers:{
        createOrderRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        createOrderSuccess(state, action){
            return {
                ...state,
                loading: false,
                orderDeatil: action.payload
            }
        },
        createOrderFail(state, action){
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
    }
})

const { actions, reducer} = orderSlice

export const {
    createOrderFail,
    createOrderRequest,
    createOrderSuccess
} = actions

export default reducer