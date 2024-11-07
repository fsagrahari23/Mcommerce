const paypal = require('../../helper/paypal');
const Order = require("../../models/Order");
const cart = require("../../models/Cart");
const Product = require("../../models/Product");
const dotenv = require('dotenv');

dotenv.config();


const createOrder = async (req, res) => {
  try {
    const { userId, items, addressInfo, orderStatus, orderDate, paymentMethod, totalAmount, paymentId, payerId,cartId,paymentStatus } = req.body;

    // Calculate total from items
    const calculatedTotal = items.reduce((sum, item) => {
      return sum + (item.salePrice * item.quantity);
    }, 0).toFixed(2); // Ensure the total has two decimal places

    // Check if the calculated total matches the totalAmount from the request (optional)
    // if (parseFloat(calculatedTotal) !== parseFloat(totalAmount)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Calculated total amount does not match the provided total amount."
    //   });
    // }

    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: `${process.env.CLIENT_URL}/shop/paypal-return`,
        cancel_url: `${process.env.CLIENT_URL}/shop/paypal-cancel`,
      },
      transactions: [
        {
          item_list: {
            items: items.map(item => ({
              name: item.name,
              sku: item.productId,
              price: item.salePrice.toFixed(2), // Ensure price has two decimal places
              currency: 'USD',
              quantity: item.quantity
            })),
          },
          amount: {
            currency: 'USD',
            total: calculatedTotal, // Use the dynamically calculated total
          },
          description: 'Payment for items in cart',
        },
      ],
    };

    paypal.paypal.payment.create(create_payment_json, async function (error, payment) {
      if (error) {
        console.error('Error details:', JSON.stringify(error.response.details, null, 2));
        return res.status(500).json({
          success: false,
          message: "Some error occurred with PayPal",
        });
      } else {
        const newlyCreatedOrder = await Order.create({
          userId, items, addressInfo, orderStatus, orderDate, paymentMethod, totalAmount, paymentId, payerId,cartId,paymentStatus
        });

        const approvalUrl = payment.links.find(link => link.rel === 'approval_url').href;

        return res.status(201).json({
          success: true,
          message: "Payment created",
          data: approvalUrl,
          orderId: newlyCreatedOrder._id,
        });
      }
    });
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};


const capturePayment = async (req, res) => {
  
  try {
    const { orderId, payerId, paymentId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    order.paymentStatus = 'Paid';
    order.orderStatus = 'Shipped';
    order.paymentId = paymentId;
    order.payerId = payerId;

    for(let item of order.items){
      const product = await Product.findById(item.productId);
      if(!product){
        return res.status(404).json({
          success: false,
          message: `Not enough stock for these products ${product.name}`,
        });
      }
      product.totalStock -= item.quantity;
      await product.save();
    }
    
    
    const getCartId = order.cartId;
    await cart.findByIdAndDelete(getCartId);

    await order.save();
    

    res.status(201).json({
      success: true,
      message: "Payment captured",
      data: order,
    })

    
  }
  catch (err) {
    console.error('Error:', err);
    return res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
}

const getAllOrders = async (req, res) => {
  
  try {
    const {userId} = req.params;
    const  orders = await Order.find({userId});
    
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
}
const getOrderDetails = async (req, res) => {
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
}

module.exports = { createOrder , capturePayment ,getAllOrders,getOrderDetails};
