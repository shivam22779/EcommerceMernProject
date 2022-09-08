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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { changePassword, clearErrors } from "../../../redux/features/authSlice";
import "./ChangePassword.css";


const ChangePassword = () => {
  const initialState = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const alert = useAlert();

  const { oldPassword, newPassword, confirmPassword } = formValue;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(oldPassword && newPassword && confirmPassword){
      dispatch(changePassword({ formValue, navigate, alert }));
    }
   
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
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
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Update Password</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit}  className="row g-3">
            <MDBValidationItem
              className="col-md-12"
              feedback="Please provide your old password"
              invalid
            >
              <MDBInput
                label="oldPassword"
                type="password"
                value={oldPassword}
                name="oldPassword"
                onChange={onInputChange}
                required
              />
            </MDBValidationItem>
            <MDBValidationItem
              className="col-md-12"
              feedback="Please provide your new password"
              invalid
            >
              <MDBInput
                label="newPassword"
                type="password"
                value={newPassword}
                name="newPassword"
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
                label="Comfirm Password"
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={onInputChange}
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
                Update
              </MDBBtn>
            </MDBValidationItem>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default ChangePassword;
