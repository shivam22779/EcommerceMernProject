import React, { Fragment, useEffect } from "react";
import "./Home.css";
import Product from "./Product.js";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import MetaData from "../MetaData";
import { getProducts } from "../../redux/features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  let { products, loading, error } = useSelector((state) => ({
    ...state.product,
  }));


  

  useEffect(() => {
    dispatch(getProducts({ keyword:"", currentPage:1, price:[0,25000], category:"", rating:0 }));
    // eslint-disable-next-line
  },[]);

  useEffect(()=>{
    error && alert.error(error);
    // eslint-disable-next-line
  }, [error])
    


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE"></MetaData>
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            {/* <h1>FIND YOUR AMAZING PRODUCTS HERE</h1> */}
          </div>

          <h2 className="homeHeading">Featured Products</h2>
          <div className="container">
            <MDBRow>
              {products &&
                products.map((product) => (
                  <MDBCol key={product._id}  className="col-sm-4">
                    <Product product={product} />
                  </MDBCol>
                ))}
            </MDBRow>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
