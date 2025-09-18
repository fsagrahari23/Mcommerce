const Address = require('../../models/Adderess');


const addAddress = async (req, res) => {
  
  try{
    const { address, city, state, zipcode, phone, notes,userId} = req.body.formdata;
    
    if(!userId || !address || !city || !state || !zipcode || !phone || !notes){
      return res.json({
        success: false,
        message: "All fields are required",  
      });
    }
    const newAddress = new Address({
      userId,
      address,
      city,
      state,
      zipcode,
      phone,
      notes
    });
    await newAddress.save();
    res.status(200).json({
      success: true,
      message: "Address added successfully",  
    });


  }catch(err){
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error occurred",  
    });
  }
};
const fetchAddress = async (req, res) => {
  
  try{
    const {userId} = req.params;
    if(!userId){
      return res.status(400).json({
        success: false,
        message: "User id is required",  
      });
    }
    const addresses = await Address.find({userId});
    if(!addresses){
      return res.status(400).json({
        success: false,
        message: "Addresses not found",  
      });
    }
    res.status(200).json({
      success: true,
      data: addresses,
    });

  }catch(err){
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error occurred",  
    });
  }
};
const editAddress = async (req, res) => {
 
  try{
    const {userId,addId} = req.params;
    if(!userId || !addId){
      return res.status(400).json({
        success: false,
        message: "user id and address id are required",  
      });
    }
    const address = await Address.findById(addId);
    if(!address){
      return res.status(400).json({
        success: false,
        message: "Address not found",  
      });
    }
   
    await Address.findOneAndUpdate({userId,_id:addId},req.body);
    res.status(200).json({
      success: true,
      message: "Address updated successfully",  
    });

  }catch(err){
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error occurred",  
    });
  }
};
const deleteAddress = async (req, res) => {
  try{
    const {userId,addId} = req.params;
    if(!userId || !addId){
      return res.status(400).json({
        success: false,
        message: "user id and address id are required",  
      });
    }
    const address = await Address.findById({_id:addId,userId});
    if(!address){
      return res.status(400).json({
        success: false,
        message: "Address not found",  
      });
    }
    await Address.findOneAndDelete({userId,_id:addId});
    res.status(200).json({
      success: true,
      message: "Address deleted successfully",  
    });
    

  }catch(err){
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error occurred",  
    });
  }
};

module.exports = {addAddress,fetchAddress,editAddress,deleteAddress};