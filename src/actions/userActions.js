// CRUD for user
/* axios */
import axios from "axios";

/* action types*/
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_FAIL,
  USER_DELETE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../constants/userConstants";

import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";


/* action creator used to log in the user by the LoginScreen component & header */
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    
    /* post request to retrieve the user's token */
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "https://deployanimeeecom.onrender.com/api/users/login/",
      { username: email, password: password },
      config
    );

    
    /* dispatch&send payload to the reducer after a successfull post request */
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    
    // sets the user's log in info value in the local storage to verify if logged in
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


/* action creator used to log out a user by LoginScreen component & header */
export const logout = () => (dispatch) => {
  /* REMOVE USER INFO FORM LOCAL STORAGE */
  localStorage.removeItem("userInfo");

  
  /* dispatch to remove the user's info after logout in the form store */
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({
    type: USER_DETAILS_RESET,
  });
  
  /* dispatch to reset the order details made by the user afer log out */
  dispatch({
    type: ORDER_LIST_MY_RESET,
  });
 
  /* dispatch to reset the user's list details after log out */
  dispatch({
    type: USER_LIST_RESET,
  });
};


/* action creator used to register a new user by the RegisterScreen component & header */
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

   
    /* post request to retrieve the user's token */
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "https://deployanimeeecom.onrender.com/api/users/register/",
      { name: name, email: email, password: password },
      config
    );

    /* dispatch&send payload to the reducer after a successfull post request */
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    
    
    /*logs in the user immediately after the registration */
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

   
    // sets the user's log in info value in the local storage to verify if logged in
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


/* action creator used to get the user's details by the ProfileScreen component  */
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

   
    // pulls out the credentials of the currently logged in user
    const {
      userLogin: { userInfo },
    } = getState();

  
    /* get request to retrieve the user's data */
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}` /* PASSING IN USER TOKEN AND IF THE USER IN AUTHORISED HE'LL HAVE FULL ACCESS TO HIS PROFILE INFORMATION */,
      },
    };

    // USING ${id} BECAUSE WHILE ACCESSING NORMAL USER WE'LL PASS STRING 'profile' BUT WHILE ACCESSING ADMIN PANEL WE'LL PASS THE 'id' SO LINK HAS TO BE DYNAMIC
    const { data } = await axios.get(`https://deployanimeeecom.onrender.com/api/users/${id}/`, config);

    /* dispatch&send payload to the reducer after a successfull get request */
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


/* action creator used to update the user's credentials by the ProfileScreen component  */
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    // pulls out the credentials of the currently logged in user
    const {
      userLogin: { userInfo },
    } = getState();

   
    /* put request to set the user's credentials */
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}` /* PASSING IN USER TOKEN AND IF THE USER IN AUTHORISED HE'LL HAVE FULL ACCESS TO HIS PROFILE INFORMATION */,
      },
    };

    // USING ${id} BECAUSE WHILE ACCESSING NORMAL USER WE'LL PASS STRING 'profile' BUT WHILE ACCESSING ADMIN PANEL WE'LL PASS THE 'id' SO LINK HAS TO BE DYNAMIC
    const { data } = await axios.put(`https://deployanimeeecom.onrender.com/api/users/profile/update`, user, config);

   /* dispatch&send payload to the reducer after a successfull put request */
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    
    /* logs in the user with the updated credential */
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    
     /*sets the updated user's credentials value in the local storage */
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


/* action creator used to get the user's list by the UserList screen  */
export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    // pulls out the credentials of the currently logged in user
    const {
      userLogin: { userInfo },
    } = getState();

    
    /* get request to set the user's list */
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}` /* PASSING IN USER TOKEN AND IF THE USER IS ADMIN WE'LL BE ABLE TO SEE LIST OF USERS */,
      },
    };

    const { data } = await axios.get(`https://deployanimeeecom.onrender.com/api/users/`, config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


/* action creator used to delete a user by the UserList screen */
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    // pulls out the credentials of the currently logged in user
    const {
      userLogin: { userInfo },
    } = getState();

    
    /* delete request to delete the user */
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}` /* PASSING IN USER TOKEN AND IF THE USER IS ADMIN WE'LL BE ABLE TO DELETE THE USER */,
      },
    };

    const { data } = await axios.delete(`https://deployanimeeecom.onrender.com/api/users/delete/${id}`, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


/* action creator used to edit a user by the UserUpdate screen */
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    // pulls out the credentials of the currently logged in user
    const {
      userLogin: { userInfo },
    } = getState();

    
    /* put request to edit the user's credentials */
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}` /* PASSING IN USER TOKEN AND IF THE USER IS ADMIN WE'LL BE ABLE TO EDIT THE USER */,
      },
    };

    const { data } = await axios.put(
      `https://deployanimeeecom.onrender.com/api/users/update/${user._id}/`,
      user,
      config
    );

    dispatch({
      type: USER_UPDATE_SUCCESS,
    });

    
    /* reloads the user's data after updating */
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
