const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cartId:String,
  items: [
    {
      productId: String,
      name: String,
      salePrice: Number,
      image: String,
      discountPrice: Number,
      quantity: Number,
    },
  ],
  addressInfo:{
  addressId: String,
  address: String,
  city: String,
  state: String,
  zipcode: String,
  phone: String,
  notes: String,
  total: Number,
  quantity: Number

  },
  
  orderStatus: {
    type: String,
    enum: ["pending", "processing", "Shipped", "delivered","Pending",
                "In Process",
                "In Shipping",
                "Rejected",
                "Delivered",],
    default: "pending",
  },
  paymentStatus:String,
  paymentMethod:String,
  totalAmount: Number,
  paymentStatus: String,
  OrderDate: {
    type: Date,
    default: Date.now,
  },
  updatedOrderDate: {
    type: Date,
    default: Date.now,
  },
  paymentId:String,
  payerId:String
},{
  timestamps: true
});

module.exports = mongoose.model("Order", OrderSchema);