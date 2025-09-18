
const Product = require("../../models/Product");
const getFilteredProducts = async (req,res) => {
  try{
    const {category = [],brand = [],sortBy="Price: High to Low"} = req.query;
    let filters = {};
    if(category.length > 0){
      filters.category = {$in: category.split(",")};
    }
    if(brand.length > 0){
      filters.brand = {$in: brand.split(",")};
    }
    let sort = {};
    switch(sortBy){
      case "Price: Low to High":
        sort.salePrice = 1;
        break;
      case "Price: High to Low":
        sort.salePrice = -1;
        break;
      case "A to Z":
          sort.name = 1;
          break;
      case "Z to A":
            sort.name = -1;
            break;
      default:
        sort.salePrice = 1;
        break;
    }
 
    const products = await Product.find(filters).sort(sort);
    
    res.status(200).json({
      success:true,
      data:products
    });

  }catch(err){
    console.log(err);
     return res.status(500).json({
      success:false,
      message:"Some Error occured",
     });
    
  }
};

const getProductDetails = async (req,res) => {
  const {productId} = req.params;
  console.log(productId);
  try{
  
  const product = await Product.findById(productId);
  if(!product) return res.json({
    success:false,
    message:"Product not found"
  });
  res.status(200).json({
    success:true,
    data:product
  });
}catch(err){
  console.log(err);
  return res.status(500).json({
    success:false,
    message:"Some Error occured",
  });
}
};

module.exports = { getFilteredProducts ,getProductDetails}