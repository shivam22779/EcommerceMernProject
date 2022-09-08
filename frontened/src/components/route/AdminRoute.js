import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux";
import Loader from "../Loader/Loader";

const AdminRoute = ({children}) => {

    const navigate = useNavigate();
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
      navigate("/login")
    )}
  </Fragment>
      
  )
}

export default AdminRoute
