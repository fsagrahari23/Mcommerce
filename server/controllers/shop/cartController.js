const expres = require("express");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");


const addToCart = async (req, res) => {
  try{
    const {userId,productId,quantity} = req.body;
    if(!userId || !productId || quantity <= 0){
      return res.status(400).json({
        success:false,
        message:"All fields are required"
      })
    }
    const product = await Product.findById(productId);
    if(!product){
      return res.status(404).json({
        success:false,
        message:"Product not found"
      })
    }
    const cart = await Cart.findOne({userId});
    if(!cart){
      const newCart = new Cart({
        userId,
        items:[{
          productId,
          quantity
        }]
      })
      await newCart.save();
      return res.status(200).json({
        success:true,
        message:"Product added to cart"
      })
    }else{
      const itemIndex = cart.items.findIndex((p)=>p.productId.toString() === productId.toString());
      if(itemIndex > -1){
        cart.items[itemIndex].quantity += quantity;
        await cart.save();
        return res.status(200).json({
          success:true,
          message:"Product updated in cart"
        })
      }else{
        cart.items.push({productId,quantity});
        await cart.save();
        return res.status(200).json({
          success:true,
          message:"Product added to cart"
        })
      }
    }

  }catch(err){
    console.log(err); 
    res,json({
      success:false,
      message:"Internal server error"
    
    })
  }
}

const fetchCartItem = async (req, res) => {
 
  try{
    const userId = req.params.id;
    
    if(!userId){
      res.json({
        success:false,
        message:"User not found"
      })
    }
    const cart = await Cart.findOne({userId}).populate({path:"items.productId",select:"name salePrice image discountPrice"});
    if(!cart){
     return  res.json({
        success:false,
        message:"Cart not found"
      })
    }
    // console.log(cart);
    const validItem = cart.items.filter((p)=>p.productId);
    if(validItem.length < cart.items.length){
      cart.items = validItem;
      await cart.save();
     
    }
    const populateCartItems = validItem.map(item =>{
      return {
        productId:item.productId._id,
        name:item.productId.name,
        salePrice:item.productId.salePrice,
        image:item.productId.image,
        discountPrice:item.productId.discountPrice,
        quantity:item.quantity
      }
    })
    res.json({
      success:true,
      data :{
        ...cart._doc,
        items:populateCartItems
      }
    })

   

  }catch(err){
    console.log(err); 
   return res.json({
      success:false,
      message:"Internal server error"
    
    })
  }
}

const updateCartItem = async (req, res) => {
  
  try{
    const userId = req.params.id;
    // if(!userId){
    //   res.json({
    //     success:false,
    //     message:"User not found"
    //   })
    // }
    
    const{productId,quantity} = req.body;
    if(!productId || quantity <= 0){
      return res.status(400).json({
        success:false,
        message:"All fields are required"
      })
    }
    const cart = await Cart.findOne({userId});
    console.log(cart);
    if(!cart){
      res.json({
        success:false,
        message:"Cart not found"
      })
    }
    const itemIndex = cart.items.findIndex((p)=>p.productId.toString() === productId.toString());
    if(itemIndex > -1){
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      return res.status(200).json({
        success:true,
        message:"Product updated in cart"
      })
    }else{
      return res.status(404).json({
        success:false,
        message:"Product not found in cart"
      })
    }


    await cart.populate({path:"items.productId",select:"name salePrice image discountPrice"})

    const populateCartItems = validItem.map(item =>{
      return {
        productId:item.productId? item.productId._id : null,
        name:item.productId?item.productId.name:'Product not found',
        salePrice:item.productId?item.productId.salePrice:null,
        image:item.productId?item.productId.image:null,
        discountPrice:item.productId?item.productId.discountPrice:null,
        quantity:item.productId?item.quantity:null
      }
    })
    res.json({
      success:true,
      data :{
        ...cart._doc,
        items:populateCartItems
      }
    })

  }catch(err){
    console.log(err); 
    res.json({
      success:false,
      message:"Internal server error"
    
    })
  }
}
const deleteCartItem = async (req, res) => {
  
  try{
    const {userId,productId} = req.params;
      if(!userId,!productId){
        return res.status(400).json({
          success:false,
          message:"Invalid data provided"
        })
      }
  const cart = await Cart.findOne({userId}).populate({
    path:"items.productId",select:"name salePrice image discountPrice"
  });
  
 if(!cart){
  return res.satatus(400).json({
    success:false,
    message:"cart not found"
  })
 }
 cart.items = cart.items.filter(item => item.productId._id.toString()!== productId);
 await cart.save();

 await cart.populate({
  path:"items.productId",select:"name salePrice image discountPrice"
});
const populateCartItems = cart.items.map(item =>{
  return {
    productId:item.productId? item.productId._id : null,
    name:item.productId?item.productId.name:'Product not found',
    salePrice:item.productId?item.productId.salePrice:null,
    image:item.productId?item.productId.image:null,
    discountPrice:item.productId?item.productId.discountPrice:null,
    quantity:item.productId?item.quantity:null
  }
})
res.json({
  success:true,
  data :{
    ...cart._doc,
    items:populateCartItems
  }
})

  }catch(err){
    console.log(err); 
    res.json({
      success:false,
      message:"Internal server error"
    
    })
  }
}

module.exports = { addToCart, updateCartItem, deleteCartItem ,fetchCartItem}