const Product = require("../models/products");
const Errorhandler = require("../utils/errorhandler");
const ApiFeatures = require("../utils/apifeatures");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");

// Create Product --> Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = req.body.images;
  

  const imagesLink = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLink.push({
      publicId: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLink;
  req.body.user = req.user._id;

  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

// Get all products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 3;
  // const productCount = await Product.count();
  // const totalPage = Math.ceil(productCount / Number(resultPerPage));

  const apiFeatures = new ApiFeatures(Product, req.query).search().filter();
  // .pagination(resultPerPage);
  let products = await apiFeatures.query;
  const filteredProductCount = products.length;
  const totalPage = Math.ceil(filteredProductCount / Number(resultPerPage));

  apiFeatures.pagination(resultPerPage);
  products = await apiFeatures.query.clone();

  res
    .status(200)
    .json({
      success: true,
      products,
      totalPage,
      filteredProductCount,
      resultPerPage,
    });
});

// Get all products(Admin)
exports.getAllProductsByAdmin = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({ success: true, products });
});

//Get single product
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new Errorhandler("Product doesn't exist", 404));
  }
  return res.status(200).json({ success: true, product });
});

//Update Product--> Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new Errorhandler("Product doesn't exist", 404));
  }

  if (req.body.images) {
    // Deleting product from cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].publicId);
    };

    const imagesLink = [];

    for (let i = 0; i < req.body.images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(req.body.images[i], {
        folder: "products",
      });

      imagesLink.push({
        publicId: result.public_id,
        url: result.secure_url,
      });
    };

    req.body.images = imagesLink;
  };

  //Adding updated image

  const newProduct = req.body;
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    newProduct,
    { new: true, runValidators: true }
  );
  res.status(200).json({ success: true, updatedProduct });
});

//Delete Product--> Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new Errorhandler("Product doesn't exist", 404));
  }

  // Deleting product from cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].publicId);
  }
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
});

// Create and update the review of a product
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  // if (!product) {
  //     return next(new Errorhandler("Product doesn't exist", 404));
  // };

  const isReviewed = product.reviews.find(
    (reviews) => reviews.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.rating = Number(rating);
        review.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.noOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((review) => {
    avg += review.rating;
  });

  product.rating = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res
    .status(200)
    .json({ success: true, message: "Product reviewed successfully" });
});

//Get all reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new Errorhandler("Product not found", 404));
  }

  res.status(200).json({ success: true, reviews: product.reviews });
});

//Delete review of a product
exports.deleteProductReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new Errorhandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((review) => {
    avg += review.rating;
  });

  let rating = 0;
  if (reviews.length === 0) {
    rating = 0;
  } else {
    rating = avg / reviews.length;
  }

  const noOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      noOfReviews,
      rating,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res
    .status(200)
    .json({ success: true, message: "Review deleted successfully" });
});


//get related products
exports.getRelatedProducts = catchAsyncErrors(async(req, res, next)=>{
  const category = req.body.category;

  const relatedProducts = await Product.find({category: category});
  res.status(200).json({success: true, relatedProducts });
})



