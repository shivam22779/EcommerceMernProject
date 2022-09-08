import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import "./Home.css";


const Product = ({ product }) => {
  const options = {
    value: product.rating,
    // size: "large",
    precision: 0.5,
    readOnly: true,
  };

  return (
    
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} className="ratingClass"/>
        {/* <span>{`(${product.noOfReviews} reviews)`}</span> */}
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
    
  );
};

export default Product;
