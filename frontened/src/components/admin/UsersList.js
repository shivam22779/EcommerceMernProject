import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";

import MetaData from "../MetaData";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import {
  getAllUsersByAdmin,
  clearErrors,
  deleteUserByAdmin,
  resetSuccess,
} from "../../redux/features/authSlice";
import Loader from "../Loader/Loader";

const UsersList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { users, error, loading, success } = useSelector((state) => ({
    ...state.auth,
  }));
  const columns = [
    { field: "id", headerName: "User ID", minWidth: 100, flex: 0.4 },
    { field: "email", headerName: "Email", minWidth: 150, flex: 0.6 },
    {
      field: "name",
      headerName: "Name",

      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 100,
      flex: 0.2,
      cellClassName: (params) => {
        return params.row.role === "admin"
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
            <Link to={`/admin/user/${params.row.id}`}>
              <Edit />
            </Link>
            <Button>
              <Delete
                onClick={() => {
                  dispatch(
                    deleteUserByAdmin({
                      id: params.row.id,
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

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  useEffect(() => {
    if (!users || success) {
      dispatch(getAllUsersByAdmin());
      dispatch(resetSuccess());
    }
    // eslint-disable-next-line 
  }, [users.length, dispatch, success]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, alert, dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ALL USERS- Admin" />

          <div className="dashboard">
            <Sidebar />
            <div className="productListContainer">
              <h1 className="productListHeading">ALL USERS</h1>
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
      )}
    </Fragment>
  );
};

export default UsersList;
