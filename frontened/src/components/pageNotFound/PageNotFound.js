import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="pageContainer">
      <div>
        <h2>Oops! Page not found</h2>
        <h1>404</h1>
        <p>We can't find the page you are looking for...</p>

        <Link to="/">Go Back to home</Link>
      </div>
    </div>
  );
};

export default PageNotFound;
