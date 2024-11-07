const express = require("express");
const multer = require("multer");
const { handleImageUpload, addProduct,fetchAllProducts,editProduct,deleteProduct } = require("../../controllers/admin/product-controller");


const router = express.Router();

// Setup Multer with memoryStorage
const storage = new multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle image upload
router.post("/upload", upload.single('my_file'), handleImageUpload);
router.post("/add", addProduct);
router.get("/fetch",fetchAllProducts);
router.put("/edit/:id", editProduct);
router.get("/delete/:id", deleteProduct);

module.exports = router;
