import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBValidationItem,
} from "mdb-react-ui-kit";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { forgotPassword, clearErrors } from "../../../redux/features/authSlice";
import "./forgotPassword.css";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const { loading, error  } = useSelector((state) => ({ ...state.auth }));
    const alert = useAlert();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(email){
          dispatch(forgotPassword({ email, alert }));
        }
    };

    useEffect(() => {
        error && alert.error(error);
        dispatch(clearErrors());
    
        // eslint-disable-next-line
      }, [error]);
       
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
        marginBottom: "120px"
      }}
    >
    <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Forgot Password</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit}  className="row g-3">
            <MDBValidationItem
              className="col-md-12"
              feedback="Please enter your email"
              invalid
            >
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={(e)=> setEmail(e.target.value)}
                required
              />
               </MDBValidationItem>
            <MDBValidationItem className="col-md-12">
              <MDBBtn type='submit' style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Send
              </MDBBtn>
            </MDBValidationItem>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
      </div>
    
  )
}

export default ForgetPassword
