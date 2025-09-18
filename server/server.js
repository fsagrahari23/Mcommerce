const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
// const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');

const Authrouter = require('./routes/auth/Auth-routes');
const adminProductsRouter = require('./routes/admin/productRoute');
const shopProductsRouter = require('./routes/shop-view/productsRoute');
const cartRouter = require('./routes/shop-view/cartRoutes');
const shopAddressRouter = require('./routes/shop-view/address-routes');
dotenv.config();

const app = express();

dotenv.config();

// Enable CORS for React frontend
app.use(cors({
  origin:process.env.CLIENT_URL ,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization','Cache-Control'],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;
// create a database connection 

mongoose.connect(`mongodb+srv://monu:${process.env.MONGO_PASS}@cluster0.bgnsdfg.mongodb.net/`).then(() => {
  console.log('Database connected successfully');
}).catch((err) => {
  console.log(err);
});
app.use('/api/auth', Authrouter);
app.use('/api/admin/products', adminProductsRouter);
app.use('/api/shop/products', shopProductsRouter);
app.use('/api/shop/cart',cartRouter);
app.use('/api/shop/address',shopAddressRouter);
app.use('/api/shop/order', require('./routes/shop-view/order-route'));
app.use('/api/admin/order', require('./routes/admin/orderRoutes'));
app.use('/api/shop/search', require('./routes/shop-view/search-routes'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));  