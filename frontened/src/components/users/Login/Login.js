import React, { useState, useEffect } from 'react';
import "./Login.css";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBValidationItem
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {useAlert} from "react-alert"
import { login, clearErrors } from '../../../redux/features/authSlice';

const Login = () => {

  const initialState = {
    email: "",
    password: ""
}


const [formValue, setFormValue] = useState(initialState);
const { email, password } = formValue;
const { loading, error, isAuthenticated } = useSelector((state) => ({ ...state.auth}));
const alert = useAlert();

const dispatch = useDispatch();
const navigate = useNavigate();

const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
        dispatch(login({ formValue, navigate, alert }))
    }
}

const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
}

useEffect(() => {
  error && alert.error(error);
  dispatch(clearErrors());
   
  isAuthenticated && navigate("/account");
  // eslint-disable-next-line
}, [error, isAuthenticated])

  return (
    <div style={{ margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "120px" }}>
    <MDBCard alignment='center'>
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign In</h5>
        <MDBCardBody>
            <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
                <MDBValidationItem className="col-md-12" feedback="Please provide your email" invalid>
                    <MDBInput
                        label="Email"
                        type="email"
                        value={email}
                        name="email"
                        onChange={onInputChange}
                        required
                     
                    />
                </MDBValidationItem>
                <MDBValidationItem className="col-md-12" feedback="Please provide your password" invalid>
                    <MDBInput
                        label="Password"
                        type="password"
                        value={password}
                        name="password"
                        onChange={onInputChange}
                        required
                         />
                </MDBValidationItem>
                <div className="col-md-12">
                    <MDBBtn style={{ width: "100%" }} className="mt-2">
                        {
                            loading && (<MDBSpinner
                                size="sm"
                                role="status"
                                tag="span"
                                className="me-2" />)
                        }
                        Login
                    </MDBBtn>
                </div>
            </MDBValidation>
            <Link to="/forgetPassword">
              <div className= "mt-4 ">
              <p>Forgot Password</p>
              </div>
                        
                    </Link>
            
            </MDBCardBody>
                <MDBCardFooter>
                    <Link to="/register">
                        <p>Don't have an account ? Sign Up</p>
                    </Link>
                </MDBCardFooter>
            </MDBCard>
        </div>
  )
}

export default Login
