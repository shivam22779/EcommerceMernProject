import React, { Fragment } from "react";
import "./ConfirmOrder.css";
import CheckoutSteps from "./CheckoutSteps.js";
import { useSelector} from "react-redux";
import MetaData from "../MetaData";
import { useNavigate, Link } from "react-router-dom";
import { Typography } from "@mui/material";



const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => ({
    ...state.ordersInfo,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));

  const subTotal = cartItems.reduce(
    (acc, item)=> acc + item.quantity * item.price, 0
  );

  // array.reduce(function(total, currentValue, currentIndex), initialValue)
  // total is the initial value or the previously returned value of the function

  const shippingCharges = subTotal > 1000 ? 0 : 200;
  const tax = subTotal * 0.18;

  const totalPrice = subTotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = ()=>{
    const data = {
      subTotal,
      shippingCharges,
      tax,
      totalPrice
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment")
  }

  return (
    <Fragment>
      <MetaData title="Confirm order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmShippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
          <Typography>Your Cart Items:</Typography>
          <div className="confirmCartItemsContainer">
            {cartItems &&
              cartItems.map((item) => (
                <div key={item.product}>
                  <img src={item.image} alt={item.name} />
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                  <span>
                    {item.quantity} X {item.price} ={" "}
                    <b>₹{item.price * item.quantity}</b>
                  </span>
                </div>
              ))}
          </div>
        </div>
        </div>
        
        {/*Order Summary */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹ {subTotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹ {shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹ {tax}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹ {totalPrice}</span>
            </div>
            <button onClick={proceedToPayment}>Proceed to Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
