import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./ProcessOrder.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../MetaData";
import { useAlert } from "react-alert";
import { useParams, Link } from "react-router-dom";
import { Typography } from "@mui/material";
import {
  getOrderDetails,
  updateOrdersByAdmin,
  clearErrors,
  successReset,
} from "../../redux/features/orderSlice";
import Loader from "../Loader/Loader";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBSpinner,
  MDBValidationItem,
} from "mdb-react-ui-kit";

const ProcessOrder = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [status, setStatus] = useState("");

  const { orderDetails, error, loading, success } = useSelector((state) => ({
    ...state.ordersInfo,
  }));

  const processOrderHandler = (e) => {
    e.preventDefault();
    const data = {
      status: status,
    };
    dispatch(updateOrdersByAdmin({ id: params.id, data, alert }));
  };

  useEffect(() => {
    dispatch(getOrderDetails(params.id));
    dispatch(successReset());
  }, [params.id, dispatch, success]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <Sidebar />
        <div className="processOrderInfo">
          {loading ? (
            <Loader />
          ) : (
            <div className="processOrderContainer">
              <div className="confirmOrderProcess">
                <div>
                  {/* <Typography>Order Summary</Typography> */}
                  <div className="confirmShippingArea">
                    {/* Shipping Info  */}
                    <Typography>Shipping Info</Typography>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p>Name:</p>
                        <span>
                          {orderDetails &&
                            orderDetails.user &&
                            orderDetails.user.name}
                        </span>
                      </div>
                      <div>
                        <p>Phone:</p>
                        <span>
                          {orderDetails &&
                            orderDetails.shippingInfo &&
                            orderDetails.shippingInfo.phoneNo}
                        </span>
                      </div>
                      <div>
                        <p>Address:</p>
                        <span>
                          {orderDetails &&
                            orderDetails.shippingInfo &&
                            `${orderDetails.shippingInfo.address}, ${orderDetails.shippingInfo.city}, ${orderDetails.shippingInfo.state}, ${orderDetails.shippingInfo.pinCode}, ${orderDetails.shippingInfo.country}`}
                        </span>
                      </div>
                    </div>
                    {/* Payment */}
                    <Typography>Payment</Typography>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p
                          className={
                            orderDetails &&
                            orderDetails.paymentInfo &&
                            orderDetails.paymentInfo.status === "succeeded"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {orderDetails &&
                          orderDetails.paymentInfo &&
                          orderDetails.paymentInfo.status === "succeeded"
                            ? "PAID"
                            : "NOT PAID"}
                        </p>
                      </div>
                      <div>
                        <p>Amount:</p>
                        <span>
                          ₹
                          {orderDetails &&
                            orderDetails.totalPrice &&
                            orderDetails.totalPrice}
                        </span>
                      </div>
                    </div>
                    {/* Order Status */}
                    <Typography>Order Status</Typography>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p
                          className={
                            orderDetails &&
                            orderDetails.orderStatus &&
                            orderDetails.orderStatus === "Delivered"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {orderDetails &&
                            orderDetails.orderStatus &&
                            orderDetails.orderStatus}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CartItems Details */}
                  <div className="confirmCartItems">
                    <Typography>Your Cart Items:</Typography>
                    <div className="confirmCartItemsContainer">
                      {orderDetails &&
                        orderDetails.orderItems &&
                        orderDetails.orderItems.map((item) => (
                          <div key={item.product}>
                            <img src={item.image} alt={item.name} />
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                            <span>
                              {item.quantity} X {item.price} ={" "}
                              <b>₹{item.price * item.quantity}</b>
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/*Order Summary */}
              <div
                className="newProductContainer1"
                style={{
                  display:
                    orderDetails && orderDetails.orderStatus === "Delivered"
                      ? "none"
                      : "block",
                }}
              >
                <MDBCard alignment="center">
                  <h5 className="mt-2">Process Order</h5>
                  <MDBCardBody>
                    <MDBValidation
                      onSubmit={processOrderHandler}
                      noValidate
                      className="row g-3"
                      encType="multipart/form-data"
                    >
                      <MDBValidationItem className="col-md-12">
                        {/* <AccountTree /> */}
                        <select
                          onChange={(e) => {
                            setStatus(e.target.value);
                          }}
                          className="selectProcessOrderTag"
                          name="status"
                          value={status}
                          required
                        >
                          <option value="">Status</option>
                          {orderDetails &&
                            orderDetails.orderStatus === "Processing" && (
                              <option value="Shipped">Shipped</option>
                            )}
                          {orderDetails &&
                            orderDetails.orderStatus === "Shipped" && (
                              <option value="Delivered">Delivered</option>
                            )}
                        </select>
                      </MDBValidationItem>

                      <div className="col-md-12">
                        <MDBBtn
                          className="mt-2 processOrderBtn"
                          disabled={
                            loading
                              ? true
                              : false || status === ""
                              ? true
                              : false
                          }
                        >
                          {loading && (
                            <MDBSpinner
                              size="sm"
                              role="status"
                              tag="span"
                              className="me-2"
                            />
                          )}
                          Update
                        </MDBBtn>
                      </div>
                    </MDBValidation>
                  </MDBCardBody>
                </MDBCard>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
