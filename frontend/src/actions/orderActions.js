import axios from 'axios'
import {
    ORDER_CREATE_FAIL, 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS, 
    CUSTOMER_ORDER_LIST_REQUEST,
    CUSTOMER_ORDER_LIST_SUCCESS,
    CUSTOMER_ORDER_LIST_FAIL,
    CUSTOMER_ORDER_DETAILS_RESET,
} from "../constants/orderConstants"


export const getCustomerOrderList = () => async (dispatch, getState) => {
    try {
      dispatch({
        type:  CUSTOMER_ORDER_LIST_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${userInfo?.jwtToken}`,
        },
      }
  
      const { data } = await axios.get(`/api/orders/customer`, config)
      dispatch({
        type: CUSTOMER_ORDER_LIST_SUCCESS,
        payload: data,
      })
      dispatch({type: CUSTOMER_ORDER_DETAILS_RESET})
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
  
      dispatch({
        type: CUSTOMER_ORDER_LIST_FAIL,
        payload: message,
      })
    }
  }


export const createOrder = (total_price, shipping_address) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_CREATE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.jwtToken}`,
        },
      }
  
      const { data } = await axios.post(`/api/orders`, {total_price, shipping_address}, config)
  
      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      })
      dispatch(getCustomerOrderList())
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: message,
      })
      }
    }