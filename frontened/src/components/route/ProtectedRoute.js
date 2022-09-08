import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import Loader from "../Loader/Loader";


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => ({
    ...state.auth,
  }));
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : isAuthenticated ? (
        children
      ) : (
        <LoadingToRedirect />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
