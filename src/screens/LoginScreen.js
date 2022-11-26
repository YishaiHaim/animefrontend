import React, { useState, useEffect } from "react";

/* react router */
import { Link } from "react-router-dom";

/* react bootstrap */
import { Row, Col, Button, Form } from "react-bootstrap";

/* components */
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

/* react redux */
import { useDispatch, useSelector } from "react-redux";

/* action creators */
import { login } from "../actions/userActions";

function LoginScreen({ location, history }) {
  /* usestates */
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();

  /* redirect setup */
  const redirect = location.search ? location.search.split("=")[1] : "/";

/* pull a partial state from the state in redux store */ 
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo, loading, error } = userLogin;

 
  /* redirects an already loggen in user to the homepage */
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  /* handlers */

  const submitHandler = (e) => {
    e.preventDefault();

    
    /* dispatches the action creator for login */
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
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

        <Button type="submit" variant="primary" className="mt-3">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer ?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
