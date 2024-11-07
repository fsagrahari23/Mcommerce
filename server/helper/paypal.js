const dotenv = require('dotenv')
dotenv.config()
const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode:'sandbox',
  client_id: process.env.PAYPAL_CLIENTID,
  client_secret:process.env.PAYPAL_SECRET,
  debug: true
})

module.exports = {paypal}