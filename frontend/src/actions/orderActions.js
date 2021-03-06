import axios from 'axios'
import {
    ORDER_CREATE_FAIL, 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS, 
    CUSTOMER_ORDER_LIST_REQUEST,
    CUSTOMER_ORDER_LIST_SUCCESS,
    CUSTOMER_ORDER_LIST_FAIL,
    VENDOR_ORDER_LIST_REQUEST,
    VENDOR_ORDER_LIST_SUCCESS,
    VENDOR_ORDER_LIST_FAIL,
    ADMIN_ORDER_LIST_REQUEST,
    ADMIN_ORDER_LIST_SUCCESS,
    ADMIN_ORDER_LIST_FAIL,
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


export const createOrder = (order) => async (dispatch, getState) => {
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
  
      const { data } = await axios.post(`/api/orders`, order, config)
  
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

//admin
    export const getAllOrderList = () => async (dispatch, getState) => {
      try {
        dispatch({
          type:  ADMIN_ORDER_LIST_REQUEST,
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
    
        const { data } = await axios.get(`/api/orders`, config)
        dispatch({
          type: ADMIN_ORDER_LIST_SUCCESS,
          payload: data,
        })
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    
        dispatch({
          type: ADMIN_ORDER_LIST_FAIL,
          payload: message,
        })
      }
    }


    //vendor
    export const getVendorOrderList = () => async (dispatch, getState) => {
      try {
        dispatch({
          type:  VENDOR_ORDER_LIST_REQUEST,
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
    
        const { data } = await axios.get(`/api/orders/vendor`, config)
        dispatch({
          type: VENDOR_ORDER_LIST_SUCCESS,
          payload: data,
        })
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    
        dispatch({
          type: VENDOR_ORDER_LIST_FAIL,
          payload: message,
        })
      }
    }