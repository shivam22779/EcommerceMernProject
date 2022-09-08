import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../../images/logo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import "./Header.css";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const handleSubmitForSearch = (e) => {
    e.preventDefault();
    const search = searchInput.trim();
    if (search) {
      navigate(`/products/search?searchquery=${search}`);
      setSearchInput(" ");
    } else {
      navigate("/products");
    }
  };
  return (
    <Fragment>
      <div className="header">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Ecommerce" />
          </Link>
        </div>
        <div className="search">
          <form onSubmit={handleSubmitForSearch}>
            <input
              type="search"
              placeholder="Search your products here"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </form>
        </div>
        <div className="icons">
          <Link to="/cart">
            <ShoppingCartIcon />
          </Link>
          <Link to="/login">
            <LoginIcon />
          </Link>
        </div>
      </div>
      <div className="linkSection">
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
        </div>
      </div>
    </Fragment>
  );
};
          

export default Header;
