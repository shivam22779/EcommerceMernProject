import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllOrdersByAdmin,
  deleteOrdersByAdmin,
} from "../../redux/features/orderSlice";
import { useNavigate } from "react-router-dom";
import MetaData from "../MetaData";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Sidebar from "./Sidebar";

const OrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { allOrders, error } = useSelector((state) => ({
    ...state.ordersInfo,
  }));
  const columns = [
    { field: "id", headerName: "Order Id", minWidth: 200, flex: 0.6 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.3,
      cellClassName: (params) => {
        return params.row.status === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
            <Link to={`/admin/order/${params.row.id}`}>
              <Edit />
            </Link>
            <Button>
              <Delete
                onClick={() => {
                  dispatch(
                    deleteOrdersByAdmin({
                      id: params.row.id,
                      alert,
                      navigate,
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

  allOrders &&
    allOrders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, alert, dispatch]);

  useEffect(() => {
    dispatch(getAllOrdersByAdmin());
  }, [dispatch]);

  return (
    <Fragment>
      <MetaData title="ALL ORDERS - Admin" />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 className="productListHeading">ALL ORDERS</h1>
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
    </Fragment>
  );
};

export default OrderList;
