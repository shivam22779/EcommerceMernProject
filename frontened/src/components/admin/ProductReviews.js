import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductReviews.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductReviews,
  deleteProductReview,
  resetSuccess,
} from "../../redux/features/productSlice";

import MetaData from "../MetaData";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import Sidebar from "./Sidebar";
import { Delete } from "@mui/icons-material";
import {
  MDBInput,
  MDBBtn,
  MDBSpinner,
  MDBValidationItem,
} from "mdb-react-ui-kit";

const ProductReviews = () => {
  const [productId, setProductId] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, productReviews, loading, success } = useSelector((state) => ({
    ...state.product,
  }));
  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    { field: "user", headerName: "User", minWidth: 200, flex: 0.6 },
    {
      field: "comment",
      headerName: "Comment",
      type: "number",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) => {
        return params.row.rating >= 3
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button>
              <Delete
                onClick={() => {
                  dispatch(
                    deleteProductReview({
                      reviewId: params.row.id,
                      productId,
                      alert,
                    })
                  );
                }}
              />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  productReviews &&
    productReviews.forEach((item) => {
      rows.push({
        id: item._id,
        user: item.name,
        comment: item.comment,
        rating: item.rating,
      });
    });

  const searchproductReviews = (e) => {
    e.preventDefault();
    dispatch(getProductReviews({ productId }));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, alert, dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(getProductReviews({ productId }));
      dispatch(resetSuccess());
    }
  }, [dispatch, success, productId]);

  return (
    <Fragment>
      <MetaData title="ALL Reviews - Admin" />

      <div className="dashboard">
        <Sidebar />
        <div className="reviewContainer">
          <div
            style={{
              margin: "auto",
              padding: "15px",
              maxWidth: "450px",
              alignContent: "center",
              marginTop: "120px",
            }}
          >
            <MDBValidationItem
              className="col-md-12"
              feedback="Please provide product id"
              invalid
            >
              <MDBInput
                label="Product Id"
                type="text"
                value={productId}
                name="productId"
                onChange={(e) => setProductId(e.target.value)}
                required
              />
            </MDBValidationItem>
            <div className="col-md-12">
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                disabled={!productId ? true : false}
                onClick={searchproductReviews}
              >
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Search
              </MDBBtn>
            </div>
          </div>
          <div className="productListContainer">
            <h1 className="productListHeading">ALL Reviews</h1>
            <DataGrid
              rows={rows}
              columns={columns}
              rowsPerPageOptions={[5]}
              pageSize={5}
              disableSelectionOnClick
              className="ProductListTable"
              autoHeight
              pagination
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ProductReviews;
