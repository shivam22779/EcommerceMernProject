import React, { Fragment, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../../images/logo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import "./Header.css";
import { MDBBadge } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const linkSection = useRef(null);

  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => ({ ...state.ordersInfo }));
  const { user } = useSelector((state) => ({ ...state.auth }));

  const toggleHamburger = () => {
    linkSection.current.classList.toggle("resp-link-sec");
  };

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
          <MenuIcon
            fontSize="large"
            className="hamBurger"
            onClick={toggleHamburger}
          />

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
          {user === null && (
            <Link title="login" to="/login">
              <LoginIcon />
            </Link>
          )}

          <Link to="/cart">
            <MDBBadge pill color="danger" className="badgeClass">
              {cartItems.length}
            </MDBBadge>
            <span>
              <ShoppingCartIcon />
            </span>
          </Link>
        </div>
      </div>

      <div className="links " ref={linkSection}>
        <Link to="/" onClick={toggleHamburger}>
          Home
        </Link>
        <Link to="/products" onClick={toggleHamburger}>
          Products
        </Link>
        <Link to="/contact" onClick={toggleHamburger}>
          Contact Me
        </Link>
        <Link to="/about" onClick={toggleHamburger}>
          About Me
        </Link>
      </div>
    </Fragment>
  );
};

export default Header;
