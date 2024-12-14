import axios from "axios"
import { adminOrdersFail, adminOrdersRequest, adminOrdersSuccess, createOrderFail, createOrderRequest, createOrderSuccess, deleteOrderFail, deleteOrderRequest, deleteOrderSuccess, orderDetailFail, orderDetailRequest, orderDetailSuccess, updateOrderfail, updateOrderSuccess, userOrdersFail, userOrdersRequest, userOrdersSuccess } from "../slices/orderSlice"

export const createOrder = order => async(dispatch) => {
  try {
    dispatch(createOrderRequest())
    const {data} = await axios.post(`/api/v1/order/new`, order)
    dispatch(createOrderSuccess(data))
  } catch (error) {
    dispatch(createOrderFail(error.response.data.message))
  }
}

export const userOrders = async(dispatch) => {
    try {
        dispatch(userOrdersRequest())
        const { data} = await axios.get(`/api/v1/myorders`)
        dispatch(userOrdersSuccess(data))
    } catch (error) {
        dispatch(userOrdersFail(error.response.data.message))
    }
}

export const orderDetail = id => async(dispatch) => {
    try {
        dispatch(orderDetailRequest())
        const {data} = await axios.get(`/api/v1/order/${id}`)
        dispatch(orderDetailSuccess(data))
    } catch (error) {
        dispatch(orderDetailFail(error.response.data.message))
    }
}

export const adminOrders = async(dispatch) => {
    try {
      dispatch(adminOrdersRequest())
      const {data} =  await axios.get(`/api/v1/admin/orders`)
      dispatch(adminOrdersSuccess(data))
    } catch (error) {
      dispatch(adminOrdersFail(error.response.data.message))
    }
}

export const deleteOrder = id => async(dispatch) => {
  try {
    dispatch(deleteOrderRequest())
    const {data} = await axios.delete(`/api/v1/admin/order/${id}`)
    dispatch(deleteOrderSuccess(data))
  } catch (error) {
    dispatch(deleteOrderFail(error.response.data.message))
  }
}

export const updateOrder = (id, orderData) => async(dispatch) => {
  try {
    dispatch(userOrdersRequest())
    const {data} = await axios.put(`/api/v1/admin/order/${id}`, orderData)
    dispatch(updateOrderSuccess(data))
  } catch (error) {
    dispatch(updateOrderfail(error.response.data.message))
  }
}