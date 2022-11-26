import React, { useState } from "react";

/* react bootsrap */
import { Button, Form, Col } from "react-bootstrap";

/* components */
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

/* react redux */
import { useDispatch, useSelector } from "react-redux";

/* action creators */
import { savePaymentMethod } from "../actions/cartActions";

function PaymentScreen({ history }) {
  
  // pulls out the shipping address from the cart
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

  // state
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  
 /* redirects to the shipping screen of no shipping adrees was provided */
  if (!shippingAddress.address) {
    history.push("./shipping");
  }

  // handlers

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));

    
    // redirects to the place order screen afer choosing the payment method
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="paypal"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;

