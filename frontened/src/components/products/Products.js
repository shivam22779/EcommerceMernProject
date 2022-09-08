import React, { useEffect, Fragment, useState } from "react";
import "./Products.css";
import { getProducts } from "../../redux/features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import Product from "../Home/Product.js";
import MetaData from "../MetaData";
import { useLocation } from "react-router-dom";
import { Typography, Slider } from "@mui/material";
import Pagination from "react-js-pagination";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Camera",
  "Skirt",
  "SmartPhones",
];
const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const alert = useAlert();

  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => ({ ...state.product }));

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  let searchQuery = query.get("searchquery");

  if (searchQuery === null) {
    searchQuery = "";
  }

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    dispatch(
      getProducts({
        keyword: searchQuery,
        currentPage,
        price,
        category,
        rating,
      })
    );
    // eslint-disable-next-line
  }, [currentPage, searchQuery, price, category, rating, dispatch]);

  useEffect(() => {
    error && alert.error(error);
    // eslint-disable-next-line
  }, [error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Products"></MetaData>

          <div className="container ">
            <div className="row justify-content-md-center">
              <div className="filterContainer col-md-3">
                <div className="filterBox">
                  <Typography>Price</Typography>

                  <Slider
                    value={price}
                    size="large"
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    className="sliderClass"
                    min={0}
                    max={2500}
                  />
                </div>

                <div className="list-group">
                  <Typography>Category</Typography>

                  <form className="list-group-item categoryTest">
                    {categories.map((item) => (
                      <Fragment key={item}>
                        <div>
                          <input
                            type="radio"
                            className="common_selector brand"
                            name="category"
                            checked={category === item}
                            value={item}
                            onChange={(e) => setCategory(e.target.value)}
                          />
                          {item}
                        </div>
                        <hr />
                      </Fragment>
                    ))}
                  </form>
                </div>

                <div className="ratings">
                  <Typography>Ratings Above</Typography>
                  <Slider
                    value={rating}
                    size="large"
                    onChange={(e, newRating) => {
                      setRating(newRating);
                    }}
                    aria-labelledby="continuous-slider"
                    min={0}
                    max={5}
                    valueLabelDisplay="auto"
                  />
                </div>
              </div>

              <div className="productContainer col-md-9" id="container">
                <h2 className="homeHeading">Products</h2>
                {products.length === 0 && (
                  <div
                    style={{
                      width: "max-content",
                      margin: "20% auto",
                      font: "600 2rem Roboto",
                    }}
                  >
                    No Products found
                  </div>
                )}
                <MDBRow className="justify-content-center">
                  {products &&
                    products.map((product) => (
                      <MDBCol
                        key={product._id}
                        className="col-md-3 col-sm-3 my-2"
                      >
                        <Product product={product} />
                      </MDBCol>
                    ))}
                </MDBRow>
                <div className="paginationBox">
                  {resultPerPage < productsCount && (
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resultPerPage}
                      totalItemsCount={productsCount}
                      onChange={setCurrentPage}
                      nextPageText="Next"
                      previousPageText="Previous"
                      firstPageText="1st"
                      lastPageText="last"
                      itemClass="page-item"
                      linkClass="page-link"
                      activeClass="pageItemActive"
                      activeLinkClass="pageLinkActive"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
