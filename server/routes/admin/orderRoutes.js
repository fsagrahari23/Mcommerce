const express = require("express");

const { getAllOrders , getOrderDetails,updateOrder} = require("../../controllers/admin/order-controller");
const router = express.Router();

router.get("/list", getAllOrders);
router.get("/details/:id",getOrderDetails);
// router.delete("/delete/:id",deleteOrder);
router.put("/update/:id",updateOrder);
module.exports = router;