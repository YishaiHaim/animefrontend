//CRUD for orders
/* axios */
import axios from "axios";

/* action types */
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from "../constants/orderConstants";

import { CART_CLEAR_ITEMS } from "../constants/cartConstants";


/* action creator used to create orders by PlaceOrderScreen component  */
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

 
    // gets credentials of the current logged in user
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}` /* PASSING IN USER TOKEN AND IF THE USER IN AUTHORISED HE'LL HAVE FULL ACCESS TO HIS PROFILE INFORMATION */,
      },
    };


    /* API method to save the order details */
    const { data } = await axios.post(`https://backendecomsecond.onrender.com/api/orders/add/`, order, config);

    
     /* dispatch and payload sent to the reducer after a succesfull request  */
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

  
    // resets the cart's info at the local storage & state after on order was placed
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    });

    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


/* action creator used to create an order by the PlaceOrderScreen component  */
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    
    // pulls out the credentials of currently logged in user
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

  
     /* API method to get the order details */
    const { data } = await axios.get(`https://backendecomsecond.onrender.com/api/orders/${id}/`, config);

    /* dispatch&send payload to the reducer after a successfull get request */
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


/* action creator used to make a payment by the OrderScreen component  */
export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

   // pulls out the credentials of currently logged in user
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

   
     /* API method to save the order details */
    const { data } = await axios.put(
      `https://backendecomsecond.onrender.com/api/orders/${id}/pay/`,
      paymentResult,
      config
    );

   
    /* dispatch&send payload to the reducer after a successfull put request */
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


/* action creator used to fetch the user's orders by the ProfileScreen component */
export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    // pulls out the credentials of currently logged in user
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    /* API method to get the order details */
    const { data } = await axios.get(`https://backendecomsecond.onrender.com/api/orders/myorders/`, config);

    /* dispatch&send payload to the reducer after a successfull get request */
    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


/* action creator used to fetch all the users orders by the OrderListScreen component */
export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    // pulls out the credentials of currently logged in user
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    
     /* API method to get the order details made by all of the users */
    const { data } = await axios.get(`https://backendecomsecond.onrender.com/api/orders/`, config);

    /* dispatch&send payload to the reducer after a successfull get request */
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


/* action creator used to mark the delivery status of the orders by the OrderScreen component  */
export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });

    // pulls out the credentials of currently logged in user
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

   
    /* API method to update the order delivery status */
    const { data } = await axios.put(
      `https://backendecomsecond.onrender.com/api/orders/${order._id}/deliver/`,
      {},
      config
    );

    /* dispatch&send payload to the reducer after a successfull get request */
    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
