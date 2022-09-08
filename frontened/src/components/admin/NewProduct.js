import React, { Fragment, useEffect } from "react";

import "./NewProduct.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  addNewProductByAdmin,
} from "../../redux/features/productSlice";
import MetaData from "../MetaData";

import { useAlert } from "react-alert";

import Sidebar from "./Sidebar";
import { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBValidation,
  MDBBtn,
  MDBSpinner,
  MDBValidationItem,
} from "mdb-react-ui-kit";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Camera",
  "Skirt",
  "SmartPhones",
];
const NewProduct = () => {
  const data = {
    name: "",
    price: 0,
    description: "",
    category: "",
    stock: 0,
  };
    

  const [inputData, setInputData] = useState(data);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => ({
    ...state.product,
  }));

  const onInputChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const createProductImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: inputData.name,
      price: inputData.price,
      description: inputData.description,
      category: inputData.category,
      stock: inputData.stock,
      images
    };
    dispatch(addNewProductByAdmin({ data, alert, navigate }));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, alert, dispatch]);

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductBackground">
          <div
            className="newProductContainer"
            style={{
              margin: "auto",
              padding: "15px",
              maxWidth: "450px",
              alignContent: "center",
              marginTop: "50px",
            }}
          >
            <MDBCard alignment="center">
              <h5>Create Product</h5>
              <MDBCardBody>
                <MDBValidation
                  onSubmit={handleSubmit}
                  noValidate
                  className="row g-3"
                  encType="multipart/form-data"
                >
                  <MDBValidationItem
                    className="col-md-12"
                    feedback="Please provide product name"
                    invalid
                  >
                    <MDBInput
                      label="Product Name"
                      type="text"
                      value={inputData.name}
                      name="name"
                      onChange={onInputChange}
                      required
                    />
                  </MDBValidationItem>
                  <MDBValidationItem
                    className="col-md-12"
                    feedback="Please enter price"
                    invalid
                  >
                    <MDBInput
                      label="Price"
                      type="number"
                      value={inputData.price}
                      name="price"
                      onChange={onInputChange}
                      required
                    />
                  </MDBValidationItem>
                  <MDBValidationItem
                    className="col-md-12"
                    feedback="Please provide product description"
                    invalid
                  >
                    <MDBInput
                      style={{ height: "100px" }}
                      label="Description"
                      type="text"
                      value={inputData.description}
                      name="description"
                      textarea="true"
                      rows={4}
                      onChange={onInputChange}
                      required
                    />
                  </MDBValidationItem>
                  <MDBValidationItem className="col-md-12">
                    {/* <AccountTree /> */}
                    <select
                      onChange={onInputChange}
                      name="category"
                      required
                      className="selectTagNewProduct"
                    >
                      <option value="">Choose Category</option>
                      {categories.map((ctgry) => (
                        <option key={ctgry} value={ctgry}>
                          {ctgry}
                        </option>
                      ))}
                    </select>
                  </MDBValidationItem>
                  <MDBValidationItem
                    className="col-md-12"
                    feedback="Please enter stock details"
                    invalid
                  >
                    <MDBInput
                      label="Stock"
                      type="number"
                      value={inputData.stock}
                      name="stock"
                      onChange={onInputChange}
                      required
                    />
                  </MDBValidationItem>

                  <MDBValidationItem
                    className="col-md-12 createProductFormFile"
                    feedback="Please provide image for this product"
                    invalid
                  >
                    <MDBInput
                      id="avatarInput"
                      type="file"
                      name="avatar"
                      onChange={createProductImageChange}
                      accept="image/*"
                      multiple
                      required
                    />
                  </MDBValidationItem>
                  <MDBValidationItem className="createProductFormImage">
                    {imagesPreview.map((image, index) => (
                      <img key={index} src={image} alt="Product Preview" />
                    ))}
                  </MDBValidationItem>
                  <div className="col-md-12">
                    <MDBBtn
                      style={{ width: "100%" }}
                      className="mt-2"
                      disabled={loading ? true : false}
                    >
                      {loading && (
                        <MDBSpinner
                          size="sm"
                          role="status"
                          tag="span"
                          className="me-2"
                        />
                      )}
                      Create
                    </MDBBtn>
                  </div>
                </MDBValidation>
              </MDBCardBody>
            </MDBCard>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
