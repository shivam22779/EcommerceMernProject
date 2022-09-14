import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { myOrders, clearErrors } from "../../redux/features/orderSlice";
import MetaData from "../MetaData";
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../Loader/Loader";
import { Launch } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./MyOrders.css";


const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => ({
    ...state.ordersInfo,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));

  const columns = [
    { field: "id", headerName: "Order Id", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
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
          <Link to={`/order/${params.row.id}`}>
            <Launch />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [error, dispatch, alert]);
  return (
    <Fragment>
      <MetaData title={`${user.name}'s Oders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            rowsPerPageOptions={[10]}
            pageSize={10}
            disableSelectOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography className="myOrdersHeading">{`${user.name}'s Oders`}</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
