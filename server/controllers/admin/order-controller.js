const Order = require("../../models/Order");

const getAllOrders = async (req, res) => {
  
  try {
    
    const  orders = await Order.find();
    
    if(orders.length === 0){
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }else{
      return res.status(200).json({
        success: true,
        data: orders,
      });
    }
  }catch (err) {
    console.error('Error:', err);
    return res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};
const getOrderDetails = async (req, res) => {
  console.log(req.params);
  try {
    const {id} = req.params;
    const  order = await Order.findById(id);
    if(!order){
      return res.status(404).json({
        success: false,
        message: "No order found",
      });
    }else{
      return res.status(200).json({
        success: true,
        data: order,
      });
    }
  }catch (err) {
    console.error('Error:', err);
    return res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

const updateOrder=  async (req, res) => {
  console.log(req.params);
  try {
    const {id} = req.params;
    const  order = await Order.findById(id);
    if(!order){
      return res.status(404).json({
        success: false,
        message: "No order found",
      });
    }else{
      console.log(req.body.orderStatus);
      order.orderStatus = req.body.orderStatus;
      await order.save();
      return res.status(200).json({
        success: true,
        data: order,
      });
    }
  }catch (err) {
    console.error('Error:', err);
    return res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

module.exports = {getAllOrders,getOrderDetails,updateOrder};