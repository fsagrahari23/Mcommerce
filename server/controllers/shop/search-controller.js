const Product = require("../../models/Product");


const searchProducts = async (req, res) => {
  try {

    const {searchKeyWord}= req.params;
    
    if(!searchKeyWord || typeof searchKeyWord !== "string"){
      return res.status(400).json({
        success: false,
        message: "Search key word is required",
      });
    }
    const regX = new RegExp(searchKeyWord, 'i');
    const createSearchQuery={
      $or: [
        { name: regX },
        { description: regX },
        { category: regX },
        { brand: regX },
        
      ]
    }
    
    const products = await Product.find(createSearchQuery);
    
    return res.status(200).json({
      success: true,
      data: products,
    });

  }
  catch (err) {
    console.error('Error:', err);
    return res.status(500).json({
      success: false,
      message: "Some error occurred",
    });

  }
}

module.exports = { searchProducts }