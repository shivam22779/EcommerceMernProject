const express = require('express');
const router = express.Router();
const {getAllProducts,getAllProductsByAdmin, createProduct, updateProduct, deleteProduct, getSingleProduct, createProductReview, getProductReviews, deleteProductReview, getRelatedProducts} = require('../controllers/productController');
const { hasUserLoggedIn, authorizedRoles } = require('../middleware/auth');

router.post('/admin/product/new',hasUserLoggedIn,authorizedRoles("admin"), createProduct);
router.get('/products', getAllProducts);
router.get('/admin/products',hasUserLoggedIn,authorizedRoles("admin"), getAllProductsByAdmin);
router.get('/product/:id', getSingleProduct);
router.put('/admin/product/:id',hasUserLoggedIn,authorizedRoles("admin"), updateProduct);
router.delete('/admin/product/:id',hasUserLoggedIn,authorizedRoles("admin"), deleteProduct);
router.put('/review',hasUserLoggedIn, createProductReview);
router.get('/reviews', getProductReviews);
router.delete('/reviews',hasUserLoggedIn, deleteProductReview);

router.post('/related/products', getRelatedProducts);
module.exports = router;