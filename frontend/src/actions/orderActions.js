import axios from "axios"
import { createOrderFail, createOrderRequest, createOrderSuccess } from "../slices/orderSlice"

export const createOrder = order => async(dispatch) => {
  try {
    dispatch(createOrderRequest())
    const {data} = await axios.post(`/api/v1/order/new`, order)
    dispatch(createOrderSuccess(data))
  } catch (error) {
    dispatch(createOrderFail(error.response.data.message))
  }
}