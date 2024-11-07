const { imageUploadUtil } = require("../../helper/cloudinary");
const Product = require("../../models/Product");
const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

// add new product
const addProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { image, name, description, category, brand, salePrice, discountPrice, totalStock } = req.body;
    const newproduct = new Product({
      image,
      name,
      description,
      category,
      brand,
      salePrice,
      discountPrice,
      totalStock
    });
    const result = await newproduct.save();
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
}

// fetch all product
const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
}

// edit a products
const editProduct = async (req, res) => {
  try {
    const product=await Product.findById(req.params.id);
    if(!product) return res.status(404).json({success:false, message:"Product not found"});

    const { image, name, description, category, brand, salePrice, discountPrice, totalStock } = req.body;
    // const newproduct = new Product({
    //   image,
    //   name,
    //   description,
    //   category,
    //   brand,
    //   salePrice,
    //   discountPrice,
    //   totalStock
    // });
    // const result = await Product.findByIdAndUpdate(req.params.id, newproduct);
    product.image = image || product.image;
    product.name = name || product.name;
    product.description = description || product.description;
    product.category = category || product.category;
    product.brand=brand ||product.brand;
    product.salePrice = salePrice || product.salePrice;
    product.discountPrice = discountPrice || product.discountPrice;
    product.totalStock = totalStock || product.totalStock;
    const result = await product.save();
    res.status(200).json({
      success: true,
      result,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
}

// delete a products

const deleteProduct = async (req, res) => {

  try {
    const product = await Product.findById(req.params.id);
    
    if(!product) return res.status(404).json({success:false, message:"Product not found"});


    const result = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      result,
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
}

module.exports = { handleImageUpload ,addProduct,fetchAllProducts,editProduct,deleteProduct};
