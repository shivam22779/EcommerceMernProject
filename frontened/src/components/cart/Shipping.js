import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Shipping.css";
import { useAlert } from "react-alert";
import { saveShippingInfo } from "../../redux/features/orderSlice";
import MetaData from "../MetaData";
import { useNavigate } from "react-router-dom";

import { Country, State } from "country-state-city";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBValidation,
  MDBBtn,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import CheckoutSteps from "./CheckoutSteps.js";

const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => ({ ...state.ordersInfo }));

  const [address, setAddress] = useState(shippingInfo.address);
  const [state, setState] = useState(shippingInfo.state);
  const [city, setCity] = useState(shippingInfo.city);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const handleSubmit = () => {
    if (phoneNo.length !== 10) {
      alert.error("Phone no should be of 10 digits long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, state, city, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };
  return (
    <Fragment>
      <MetaData title="Shipping Details" />
      <CheckoutSteps activeStep={1} />
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
          <h5>Shipping Details</h5>
          <MDBCardBody>
            <MDBValidation
              onSubmit={handleSubmit}
              noValidate
              className="row g-3"
            >
              <MDBValidationItem
                className="col-md-12"
                feedback="Please provide address"
                invalid
              >
                <MDBInput
                  label="Address"
                  type="text"
                  value={address}
                  name="name"
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </MDBValidationItem>
              <MDBValidationItem
                className="col-md-12"
                feedback="Please provide City"
                invalid
              >
                <MDBInput
                  label="City"
                  type="text"
                  value={city}
                  name="city"
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </MDBValidationItem>
              <MDBValidationItem
                className="col-md-12"
                feedback="Please provide pincode"
                invalid
              >
                <MDBInput
                  label="Pin code"
                  type="number"
                  value={pinCode}
                  name="pinCode"
                  onChange={(e) => setPinCode(e.target.value)}
                  required
                />
              </MDBValidationItem>
              <MDBValidationItem
                className="col-md-12"
                feedback="Please provide phone no."
                invalid
              >
                <MDBInput
                  label="Phone no"
                  type="number"
                  value={phoneNo}
                  name="phoneNo"
                  onChange={(e) => setPhoneNo(e.target.value)}
                  required
                />
              </MDBValidationItem>
              <div className="selectClass">
                {/* <Public /> */}
                <select
                  required
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Country</option>
                  {Country &&
                    Country.getAllCountries().map((item) => (
                      <option value={item.isoCode} key={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              {country && (
                <div className="selectClass">
                  {/* <TransferWithinAStation/> */}
                  <select
                    required
                    name="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="">State</option>
                    {State &&
                      State.getStatesOfCountry(country).map((item) => (
                        <option value={item.isoCode} key={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
              <div className="col-md-12">
                <MDBBtn style={{ width: "100%" }} className="mt-2">
                  Add
                </MDBBtn>
              </div>
            </MDBValidation>
          </MDBCardBody>
        </MDBCard>
      </div>
    </Fragment>
  );
};

export default Shipping;
