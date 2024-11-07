const express = require("express");

const router = express.Router();
const {addAddress,fetchAddress,editAddress,deleteAddress}= require("../../controllers/shop/address-controller");

router.post("/add",addAddress);
router.get("/get/:userId",fetchAddress);
router.put("/edit/:userId/:addId",editAddress);
router.delete("/delete/:userId/:addId",deleteAddress);
module.exports = router;