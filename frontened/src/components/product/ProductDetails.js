import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  addNewReview,
  clearErrors,
  getRelatedProducts,
} from "../../redux/features/productSlice";
import { addToCart } from "../../redux/features/orderSlice";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard.js";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Rating,
} from "@mui/material";
import Product from "../Home/Product";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();

  const { productDetails, loading, error, success, relatedProducts } =
    useSelector((state) => ({
      ...state.product,
    }));
  // const { cartItems } = useSelector((state) => ({ ...state.ordersInfo }));

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const increaseQuantity = () => {
    if (productDetails.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const addItemsToCart = () => {
    const cartData = {
      product: productDetails._id,
      name: productDetails.name,
      price: productDetails.price,
      image: productDetails.images[0].url,
      stock: productDetails.stock,
      quantity: quantity,
    };

    dispatch(addToCart(cartData));
    alert.success("Item added to cart");
  };

  const handleSubmintReview = () => {
    const data = { rating, comment, productId: params.id };
    dispatch(addNewReview({ data, alert }));
    // dispatch(getProductDetails(params.id));
    setOpen(false);
    setRating(0);
    setComment("");
  };

  useEffect(() => {
    dispatch(getProductDetails(params.id));

    // eslint-disable-next-line
  }, [params.id, success]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getRelatedProducts({ category: productDetails.category }));

    // eslint-disable-next-line
  }, [error, productDetails]);

  const options = {
    value: productDetails.rating ? productDetails.rating : 0,
    size: "large",
    readOnly: true,
    precision: 0.5,
    
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="productDetailsContainer">
          <div className="productDetails">
            <div>
              <Carousel component="img" sx={{ width: "20vmax" }}>
                {productDetails &&
                  productDetails.images &&
                  productDetails.images.map((item, i) => (
                    <img
                      key={item.url}
                      className="CarouselImage"
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div className="details_block">
              <div className="details_block1">
                <h2>{productDetails.name}</h2>
                <p>Product # {productDetails._id}</p>
              </div>
              <div className="details_block2">
                <Rating
                  {...options}
                  style={{ color: "red", fontSize: "2vmax" }}
                />
                <span className="details_block2_span">
                  ({productDetails.noOfReviews} Reviews)
                </span>
              </div>
              <div className="details_block3">
                <h1>{`₹${productDetails.price}`}</h1>
                <div className="details_block3_1">
                  <div className="details_block3_1_1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input type="number" value={quantity} readOnly />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={productDetails.stock < 1 ? true : false}
                    onClick={addItemsToCart}
                  >
                    Add to cart
                  </button>
                </div>
                <p>
                  Status:
                  <b
                    className={
                      productDetails.status < 1 ? "redColor" : "greenColor"
                    }
                  >
                    {productDetails.stock < 1 ? " OutOfStock" : " InStock"}
                  </b>
                </p>
              </div>
              <div className="details_block4">
                Description: <p>{productDetails.description}</p>
              </div>
              <button className="submitReview" onClick={submitReviewToggle}>
                Submit Review
              </button>
            </div>
          </div>

          <Dialog
            aria-labelledby="Simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(Number(e.target.value))}
                value={rating}
                size="large"
                
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ border: "2px solid black" }}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleSubmintReview}>Submit</Button>
            </DialogActions>
          </Dialog>

          <h3 className="reviewHeading">Reviews</h3>
          {productDetails.reviews && productDetails.reviews[0] ? (
            <div className="reviews">
              {productDetails.reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))}
            </div>
          ) : (
            <p className="noReviews">No reviews yet</p>
          )}

          <Fragment>
            {relatedProducts && relatedProducts.length > 0 && (
              <div className="relatedproductsContainer">
                {relatedProducts.length > 1 && <h4>Related Products </h4>}
                <div className="relatedproducts">
                  {relatedProducts
                    .filter((item) => item._id !== params.id)
                    .splice(0, 3)
                    .map((item, index) => (
                      <div key={item._id} className="relatedItem">
                        <Product product={item} />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </Fragment>
        </div>
      )}
    </Fragment>
  );
};

export default ProductDetails;
