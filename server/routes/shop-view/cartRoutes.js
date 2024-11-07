const express = require('express');
const { 
  addToCart,

  updateCartItem,

  deleteCartItem,

  fetchCartItem


} = require('../../controllers/shop/cartController');

const router = express.Router();

router.post('/add', addToCart);

router.put('/update-cart/:id', updateCartItem);

router.delete('/delete/:userId/:productId',deleteCartItem);

router.get('/fetch/:id', fetchCartItem);

module.exports = router;



