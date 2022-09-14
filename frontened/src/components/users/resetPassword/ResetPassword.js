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
import { resetPassword, clearErrors } from "../../../redux/features/authSlice";
import "./ResetPassword.css";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
    const state = {
        password: "",
        confirmPassword: ""
    }
    const [passwords, setPasswords] = useState(state);
    const { loading, error  } = useSelector((state) => ({ ...state.auth }));
    const alert = useAlert();
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(passwords.password && passwords.confirmPassword){
           const data = {
                passwords,
                token: params.token
            }
          dispatch(resetPassword({ data, alert, navigate }));
        }
    };

    useEffect(() => {
        error && alert.error(error);
        dispatch(clearErrors());
    
        // eslint-disable-next-line
      }, [error]);

      const handleChange = (e)=>{
        setPasswords({...passwords, [e.target.name]:e.target.value})
      }
       
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
        <h5>Reset Password</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit}  className="row g-3">
            <MDBValidationItem
              className="col-md-12"
              feedback="Please enter your password"
              invalid
            >
              <MDBInput
                label="Password"
                type="password"
                value={passwords.password}
                name="password"
                onChange={handleChange}
                required
              />
               </MDBValidationItem>
            <MDBValidationItem
              className="col-md-12"
              feedback="Please confirm your password"
              invalid
            >
              <MDBInput
                label="Confirm Password"
                type="password"
                value={passwords.confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
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
                Reset
              </MDBBtn>
            </MDBValidationItem>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
      </div>
    
  )
}


export default ResetPassword
