const express = require("express");
const router = express.Router();
const { hasUserLoggedIn } = require('../middleware/auth');
const {processPayment, sendStripeApiKey} = require("../controllers/paymentController");


router.post("/payment/process", hasUserLoggedIn, processPayment);
router.get("/stripeapikey", hasUserLoggedIn, sendStripeApiKey);

module.exports = router;