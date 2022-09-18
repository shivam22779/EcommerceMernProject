import React, { Fragment, useEffect, useRef } from "react";
import "./Payment.css";
import CheckoutSteps from "./CheckoutSteps.js";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../MetaData";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CreditCard, Event, VpnKey } from "@mui/icons-material";
import { API } from "../../redux/api";
import {
  clearErrors,
  createOrder,
  clearCart,
} from "../../redux/features/orderSlice";

const Payment = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const navigate = useNavigate();

  const { shippingInfo, cartItems, error } = useSelector((state) => ({
    ...state.ordersInfo,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice) * 100,
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemPrice: orderInfo.subTotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const { data } = await API.post("/api/v1/payment/process", paymentData);
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder({ order, navigate, alert }));
          navigate("/success");
          localStorage.removeItem("cartItems");
          dispatch(clearCart());
        } else {
          alert.error("There's some issue while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    // eslint-disable-next-line
  }, [error]);
  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => handleSubmit(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCard />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <Event />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKey />
            <CardCvcElement className="paymentInput" />
          </div>
          <button type="submit" ref={payBtn} className="paymentFormBtn">
            {`Pay - ₹${orderInfo && Math.ceil(orderInfo.totalPrice)}`}
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
