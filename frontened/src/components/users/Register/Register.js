import React, { useState, useEffect, Fragment } from "react";
import "./Register.css";
import { useAlert } from "react-alert";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { register, clearErrors } from "../../../redux/features/authSlice";
import img from "../../../images/profile.png";
import { useLocation } from "react-router-dom";
import {UpdateUserProfile} from "../../../redux/features/authSlice"

const Register = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  };


  const [formValue, setFormValue] = useState(initialState);
  
  const [avatarPreview, setAvatarPreview] = useState(img);
  const alert = useAlert();
  const location = useLocation();
  const { email, password, name, avatar, confirmPassword } = formValue;
  const { loading, error, user } = useSelector((state) => ({ ...state.auth }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(location.pathname !== "/me/update"){
      if (password !== confirmPassword) {
        return alert.error("Password is not matching");
      }
  
      if (email && password && name && confirmPassword) {
        let updatedFormValue = "";

        if(formValue.avatar === null){
          updatedFormValue = { name, email, password };
        }
        else{
          updatedFormValue = { name, email, password, avatar};
        }
        
        dispatch(register({ updatedFormValue, navigate, alert }));
        
      }

    }
    else{
      if (email && name) {
        let updatedFormValue = "";
        if(formValue.avatar === null){
          updatedFormValue = { name, email};
        }
        else{
          updatedFormValue = { name, email, avatar};
        }
        dispatch(UpdateUserProfile({ updatedFormValue, navigate, alert }));
        // dispatch(loadUser())
      }
    }

   
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setFormValue({ ...formValue, avatar: reader.result });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setFormValue({ ...formValue, [name]: value });
    }
  };

  useEffect(() => {
    error && alert.error(error);
    dispatch(clearErrors());
    
  }, [error, alert, dispatch]);

  useEffect(() => {
    if (location.pathname === "/me/update") {
      setFormValue({...formValue,name: user.name, email: user.email});
      setAvatarPreview(user.avatar ? user.avatar.url : img );
    }

    // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        {(location.pathname!=="/me/update") ? <h5>Sign Up</h5> : <h5>Edit Profile</h5>}
        <MDBCardBody>
          <MDBValidation
            onSubmit={handleSubmit}
            noValidate
            className="row g-3"
            encType="multipart/form-data"
          >
            <MDBValidationItem
              className="col-md-12"
              feedback="Please provide your name"
              invalid
            >
              <MDBInput
                label="Name"
                type="text"
                value={name}
                name="name"
                onChange={onInputChange}
                required
              />
            </MDBValidationItem>
            <MDBValidationItem
              className="col-md-12"
              feedback="Please provide your email"
              invalid
            >
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
              />
            </MDBValidationItem>
            {location.pathname !== "/me/update" && (
              <Fragment>
                <MDBValidationItem
                  className="col-md-12"
                  feedback="Please provide your password"
                  invalid
                >
                  <MDBInput
                    label="Password"
                    type="password"
                    value={password}
                    name="password"
                    onChange={onInputChange}
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
                    value={confirmPassword}
                    name="confirmPassword"
                    onChange={onInputChange}
                    required
                  />
                </MDBValidationItem>
              </Fragment>
            )}
            <div id="registerImage" className="col-md-2">
              <img src={avatarPreview} alt="Avatar Preview" />
            </div>
            <MDBValidationItem
              className="col-md-10"
              feedback="Please select you profile"
              invalid
            >
              <MDBInput
                id="avatarInput"
                type="file"
                name="avatar"
                onChange={onInputChange}
                accept="image/*"
                required
              />
            </MDBValidationItem>
            <div className="col-md-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                {location.pathname!=="/me/update" ? "Register" : "Update" }
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        {location.pathname!=="/me/update" && <MDBCardFooter>
          <Link to="/login">
            <p>Already have an account ? Sign in</p>
          </Link>
        </MDBCardFooter>}
      </MDBCard>
    </div>
  );
};

export default Register;
