import React, { useState, useEffect } from "react";

/* react bootstrap */
import { Row, Col, Button, Form, Table } from "react-bootstrap";

/* react router bootstrap */
import { LinkContainer } from "react-router-bootstrap";

/* components */
import Message from "../components/Message";
import Loader from "../components/Loader";

/* react redux */
import { useDispatch, useSelector } from "react-redux";

/* action creator */
import { getUserDetails, updateUserProfile } from "../actions/userActions";

import { listMyOrders } from "../actions/orderActions";

/* action type */
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

function ProfileScreen({ history }) {
  /* usestates */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  
  /* pull a partial state from the state in redux store */
  const userDetails = useSelector((state) => state.userDetails);

  const { user, loading, error } = userDetails;

  
   /* verify user login */
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

 
   /* verify success of userUpdateProfile, if success=true > reset the state  */
  const userUpdateProfle = useSelector((state) => state.userUpdateProfle);

  const { success } = userUpdateProfle;

  
  /* pulls out the user order details to display on page*/
  const orderListMy = useSelector((state) => state.orderListMy);

  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

 
  /* sends user to the login page if the user is not logged in/shows profile data if logged in */
  useEffect(() => {
    // user is not loggen in in this phase, redirect
    if (!userInfo) {
      history.push("/login");
    } else {
      
      // action dispatch to retrieve the user's info
      if (!user || !user.name || success || userInfo._id !== user._id) {
        /* (userInfo._id !== user._id) BECAUSE DURING USER EDIT STATE CHANGES SO WE WANT TO FIRE DISPATCH AGAIN HERE IF THE DATA ISN'T SAME AS THE USER AS WE ARE LOGGED IN  */
        // RESETTING PROFILE BEFORE FETCHING DATA SO THAT WE ALWAYS HAVE UPDATED DATA
        dispatch({ type: USER_UPDATE_PROFILE_RESET });

        // fetches user data
        dispatch(getUserDetails("profile"));

        // fetches user order details
        dispatch(listMyOrders());
      } else {
        
        // information is fetched correctly at this phase > set state
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  /* HANDLERS */

  const submitHandler = (e) => {
    e.preventDefault();

    /* disables the submit button if the passwords dont match */
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage("");
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="passwordConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Update
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h2>My Orders</h2>

        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>
                    {order.createdAt ? order.createdAt.substring(0, 10) : null}
                  </td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt ? (
                        order.paidAt.substring(0, 10)
                      ) : null
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm">Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default ProfileScreen;
