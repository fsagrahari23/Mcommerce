const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  image:{
    type:String
  },
  name:
  {
    type: String,
    required: true
  },
  description:
  {
    type: String,
    required: true
  },
  category:
  {
    type: String,
    required: true
  },
  brand:
  {
    type: String,
    required: true
  },
  salePrice:
  {
    type: Number,
    required: true
  },
  discountPrice:
  {
    type: Number,
    required: true
  },
  totalStock:
  {
    type: Number,
    required: true
  }
},
{
  timestamps:true
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;