const express = require("express");
const { newOrder, getSingleOrder, myOrders, updateOrder, getAllOrders, deleteOrder } = require("../controllers/orderController");
const router = express.Router();
const { hasUserLoggedIn, authorizedRoles } = require('../middleware/auth');

router.post("/order/new", hasUserLoggedIn, newOrder);
router.get("/order/:id", hasUserLoggedIn, getSingleOrder);
router.get("/orders/me", hasUserLoggedIn, myOrders);
router.get("/admin/orders", hasUserLoggedIn,authorizedRoles("admin"), getAllOrders);
router.put("/admin/orders/:id", hasUserLoggedIn,authorizedRoles("admin"), updateOrder);
router.delete("/admin/orders/:id", hasUserLoggedIn,authorizedRoles("admin"), deleteOrder);

module.exports = router;