import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {useParams} from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../redux/features/orderSlice";
import MetaData from "../MetaData";

import { Typography } from "@mui/material";

import Loader from "../Loader/Loader";

import { Link } from "react-router-dom";
import "./OrderDetails.css";

const OrderDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { orderDetails, error, loading } = useSelector((state) => ({
    ...state.ordersInfo,
  }));

  useEffect(() => {
    dispatch(getOrderDetails(params.id));
  }, [params.id, dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{orderDetails && orderDetails._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{orderDetails.user && orderDetails.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {orderDetails.shippingInfo &&
                      orderDetails.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {orderDetails.shippingInfo &&
                      `${orderDetails.shippingInfo.address}, ${orderDetails.shippingInfo.city}, ${orderDetails.shippingInfo.state}, ${orderDetails.shippingInfo.pinCode}, ${orderDetails.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      orderDetails.paymentInfo &&
                      orderDetails.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                     {
                      orderDetails.paymentInfo &&
                      orderDetails.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"
                    }
                  </p>
                </div>
                <div>
                  <p>Amount:</p>
                  <span>
                    ₹ {orderDetails.totalPrice &&
                      orderDetails.totalPrice}
                  </span>
                </div>
              </div>
              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
              <div>
                  <p className={orderDetails.orderStatus && orderDetails.orderStatus === "Delivered" ? "greenColor" : "redColor"}>{orderDetails.orderStatus && orderDetails.orderStatus}</p>
                  
                </div>

              </div>
            </div>
            <div className="orderDetailsCartItems">
                <Typography>Order Items:</Typography>
                <div className="orderDetailsCartItemsContainer">
                    {orderDetails.orderItems && orderDetails.orderItems.map((item)=>(
                        <div key={item.product}>
                        <img src={item.image} alt={item.name} />
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                        <span>
                          {item.quantity} X {item.price} ={" "}
                          <b>₹ {item.price * item.quantity}</b>
                        </span>
                      </div>

                    ))} 
                </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
