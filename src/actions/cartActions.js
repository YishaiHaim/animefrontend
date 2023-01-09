// CRUD for cart
/* axios */
import axios from "axios";

/* action types */
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

/* action creator used at the CartScreen component */


/* method for adding products to the cart */
export const addToCart = (id, qty) => async (dispatch, getState) => {
 
   // fetches the product data using axios
  const { data } = await axios.get(`https://deployanimeecom-lt0t.onrender.com/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  
  // sets the cart's value of items in the local storage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};


/* method for removing products from the cart */
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

 // sets the cart's value of items in the local storage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};


/* action creator used by the ShippingScreen component */
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  
  // sets the address value in the local storage
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};


/* action creator used by the PaymentScreen component */
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });


  // sets the payment method value in the local storage
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
