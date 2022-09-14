import React, { Fragment, useEffect, useState } from "react";

import "./NewProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import MetaData from "../MetaData";

import { useAlert } from "react-alert";

import Sidebar from "./Sidebar";

import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBValidation,
  MDBBtn,
  MDBSpinner,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import {
  clearErrors,
  clearUserData,
  updateUserByAdmin,
  getUserDetailsByAdmin,
} from "../../redux/features/authSlice";
import Loader from "../Loader/Loader";


const UpdateUser = () => {
  const data = {
    name: "",
    email: "",
    role: "",
  };

  const [inputData, setInputData] = useState(data);

  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();
  const navigate = useNavigate();
  const { error, loading, userDetails } = useSelector((state) => ({
    ...state.auth,
  }));

  const onInputChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserByAdmin({ id: params.id, inputData, alert, navigate }));
    dispatch(clearUserData());
  };

  // Needs to understand why empty array is not working
  useEffect(() => {
    if (userDetails && userDetails._id !== params.id) {
      dispatch(getUserDetailsByAdmin(params.id));
    } else {
      setInputData({
        ...inputData,
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role,
      });
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    // eslint-disable-next-line
  }, [dispatch, params.id, userDetails, error, alert]);

  return (
    <Fragment>
      <MetaData title="Update User Role" />
      <div className="dashboard">
        <Sidebar />
        {loading ? (
          <Loader />
        ) : (
          <div style={{ width: "100%", backgroundColor: "white" }}>
            <div
              className="newProductContainer"
              style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "450px",
                alignContent: "center",
                marginTop: "120px",
                height: "125vh",
                
              }}
            >
              <MDBCard alignment="center">
                <h5>Update User Role</h5>
                <MDBCardBody>
                  <MDBValidation
                    onSubmit={handleSubmit}
                    noValidate
                    className="row g-3"
                  >
                    <MDBValidationItem
                      className="col-md-12"
                      feedback="Please provide your name"
                      invalid
                    >
                      <MDBInput
                        label="Name"
                        type="text"
                        value={inputData.name}
                        name="name"
                        onChange={onInputChange}
                        required
                      />
                    </MDBValidationItem>
                    <MDBValidationItem
                      className="col-md-12"
                      feedback="Please enter your email id"
                      invalid
                    >
                      <MDBInput
                        label="Email"
                        type="email"
                        value={inputData.email}
                        name="email"
                        onChange={onInputChange}
                        required
                      />
                    </MDBValidationItem>

                    <MDBValidationItem className="col-md-12">
                      {/* <AccountTree /> */}
                      <select
                        onChange={onInputChange}
                        name="role"
                        value={inputData.role}
                        style={{
                          width: "100%",
                          padding: "8px 6px",
                          border: "1px solid rgb(189, 184, 184)",
                          borderRadius: "5px",
                        }}
                        required
                      >
                        <option value="">Choose Role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </MDBValidationItem>

                    <div className="col-md-12">
                      <MDBBtn
                        style={{ width: "100%" }}
                        className="mt-2"
                        disabled={
                          loading
                            ? true
                            : false || inputData.role === ""
                            ? true
                            : false
                        }
                      >
                        {loading && (
                          <MDBSpinner
                            size="sm"
                            role="status"
                            tag="span"
                            className="me-2"
                          />
                        )}
                        Update
                      </MDBBtn>
                    </div>
                  </MDBValidation>
                </MDBCardBody>
              </MDBCard>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default UpdateUser;
