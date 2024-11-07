const express = require("express");

const { getFilteredProducts, getProductDetails } = require("../../controllers/shop/shopProducts");
const Product = require("../../models/Product");

const router = express.Router();

// Setup Multer with memoryStorage
router.get("/get", getFilteredProducts);
router.get("/get/:id", async (req,res) => {
  const {id} = req.params;
  console.log(id)
  try{
  
  const product = await Product.findById(id);
  if(!product) return res.status(404).json({
    success:false,
    message:"Product not found"
  })
  res.status(200).json({
    success:true,
    data:product
  })
}catch(err){
  console.log(err);
  return res.status(500).json({
    success:false,
    message:"Some Error occured",
  })
}
});
module.exports = router;
