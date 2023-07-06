const mongoose = require("mongoose");
require("dotenv").config();

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@bankcluster.6dk0fj2.mongodb.net/bank?retryWrites=true&w=majority`;
// const uri = "mongodb://127.0.0.1:27017/bank";

// Connect to MongoDB Atlas
const connection = mongoose.connect(uri, {
  
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = connection;