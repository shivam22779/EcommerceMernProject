import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import LoadingToRedirect from "./LoadingToRedirect";


const AdminRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => ({
    ...state.auth,
  }));
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : isAuthenticated === true && user.role === "admin" ? (
        children
      ) : (
        <LoadingToRedirect />
      )}
    </Fragment>
  );
};

export default AdminRoute;
