import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/features/orderSlice";
import "./Cart.css";
import CartItemCard from "./CartItemCard.js";
import { Typography } from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import {useAlert} from "react-alert";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { cartItems } = useSelector((state) => ({ ...state.ordersInfo }));
  const { isAuthenticated } = useSelector((state) => ({ ...state.auth }));

  const deleteCartItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const increaseQuantity = (item) => {
    const newQty = item.quantity + 1;
    
    if (item.stock <= item.quantity) return;

    dispatch(addToCart({ ...item, quantity: newQty }));
  };
  const decreaseQuantity = (item) => {
    const newQty = item.quantity - 1;
    if (item.quantity <= 1) return;
    dispatch(addToCart({ ...item, quantity: newQty }));
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate("/shipping");
    } else {
        navigate("/login");
        alert.error("Please login to add shipping details ");
    }
   
  };
  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No product in your cart</Typography>
          <Link to="/products">View products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {cartItems &&
              cartItems.map((item) => (
                <div key={item.product} className="cartContainer">
                  <CartItemCard item={item} deleteCartItem={deleteCartItem} />
                  <div className="cartInput">
                    <button onClick={() => decreaseQuantity(item)}>-</button>
                    <input type="number" value={item.quantity} readOnly />
                    <button onClick={() => increaseQuantity(item)}>+</button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossTotal">
              <div></div>
              <div className="cartGrossTotalBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={handleCheckout}>Check out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
