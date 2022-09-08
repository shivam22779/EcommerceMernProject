import React from 'react';
import profile from "../../images/profile.png";
import {Rating} from "@mui/material"
import "./ProductDetails.css";



const ReviewCard = ({review}) => {
    
    const options = {
      value: review.rating,
      size: "large",
      readOnly: true,
      precision: 0.5
    };
        
  return (
    <div className="reviewCard">
        <img src={profile} alt="User" />
        <p>{review.name}</p>
        <Rating {...options} style={{color: "red", fontSize: "2vmax"}}/>
        <span >{review.comment}</span>
      
    </div>
  )
}

export default ReviewCard
