import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductsByAdmin,
  deleteProductByAdmin
} from "../../redux/features/productSlice";
import {useNavigate} from "react-router-dom";
import MetaData from "../MetaData";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Sidebar from "./Sidebar";



const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const {products, error} = useSelector((state) => ({ ...state.product }));
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 150, flex: 0.3 },
    { field: "name", headerName: "Name", minWidth: 200, flex: 0.4 },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 100,
      flex: 0.2,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 150,
      flex: 0.2,
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
            <Link to={`/admin/product/${params.row.id}`}>
              <Edit />
            </Link>
            <Button>
              <Delete onClick={()=>{
                // dispatch(deleteProductByAdmin({id: params.getValue(params.id, "id"), alert, navigate}));--> this was used earlier in older versions to get the value of any field in a particular row
                dispatch(deleteProductByAdmin({id: params.row.id, alert, navigate}));
              }}/>
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products && products.forEach((item)=>{
    rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
    });
  });

  useEffect(()=>{
    if(error){
        alert.error(error);
        dispatch(clearErrors());
    }

  }, [error, alert, dispatch]);

  useEffect(()=>{
    dispatch(getProductsByAdmin());

  }, [dispatch]);

  return <Fragment>
    <MetaData title="ALL PRODUCTS - Admin"/>

    <div className="dashboard">
        <Sidebar/>
        <div className="productListContainer">
            <h1 className="productListHeading">ALL PRODUCTS</h1>
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
  </Fragment>;
};

export default ProductList;
