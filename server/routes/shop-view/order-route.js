const express = require("express");

const router = express.Router();
const {
  createOrder,
  capturePayment,
  getAllOrders,
  getOrderDetails} = require("../../controllers/shop/order-controller");

router.post("/create",createOrder);
router.post("/capture",capturePayment);
router.get("/list/:userId",getAllOrders);
router.get("/details/:id",getOrderDetails);


module.exports = router;