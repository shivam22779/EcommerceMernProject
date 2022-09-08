import React, { Fragment, useEffect } from "react";

import "./NewProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProductByAdmin,
  getProductDetails,
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
const UpdateProduct = () => {
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
  const [oldImages, setOldImagesPreview] = useState([]);

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const params = useParams();
  const { error, loading, productDetails } = useSelector((state) => ({
    ...state.product,
  }));

  const handleInputChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const updateProductImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    setOldImagesPreview([]);

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
    const { name, price, description, category, stock } = inputData;
    let data = {};
    if (images.length > 0) {
      data = {
        name,
        price,
        description,
        category,
        stock,
        images,
      };
    } else {
      data = {
        name,
        price,
        description,
        category,
        stock,
      };
    }

    if (name && price && description && category && stock) {
      dispatch(updateProductByAdmin({ id: params.id, data, alert, navigate }));
    }
  };

  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, [params.id, dispatch]);

  useEffect(() => {
    if (productDetails && productDetails._id !== params.id) {
      dispatch(getProductDetails(params.id));
    } else {
      setInputData({
        ...inputData,
        name: productDetails.name,
        price: productDetails.price,
        description: productDetails.description,
        category: productDetails.category,
        stock: productDetails.stock,
      });
      setOldImagesPreview(productDetails.images);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    // eslint-disable-next-line
  }, [error, alert, dispatch, params.id, productDetails]);

  return (
    <Fragment>
      <MetaData title="Update Product" />
      <div className="dashboard">
        <Sidebar />
        <div style={{ width: "100%", backgroundColor: "white" }}>
          <div
            className="newProductContainer"
            style={{
              margin: "auto",
              padding: "15px",
              maxWidth: "450px",
              alignContent: "center",
              marginTop: "120px",
              position: "relative",
              zIndex: "2",
            }}
          >
            <MDBCard alignment="center">
              <h5>Update Product</h5>
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
                      required
                    />
                  </MDBValidationItem>
                  <MDBValidationItem className="col-md-12">
                    {/* <AccountTree /> */}
                    <select
                      label="Category"
                      onChange={handleInputChange}
                      name="category"
                      value={inputData.category}
                      required
                      style={{
                        width: "100%",
                        padding: "8px 6px",
                        border: "1px solid rgb(189, 184, 184)",
                        borderRadius: "5px",
                      }}
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
                      onChange={handleInputChange}
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
                      onChange={updateProductImageChange}
                      accept="image/*"
                      multiple
                      required
                    />
                  </MDBValidationItem>
                  <MDBValidationItem className="createProductFormImage">
                    {oldImages.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt="Old Product Preview"
                      />
                    ))}
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
                      Update
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

export default UpdateProduct;
