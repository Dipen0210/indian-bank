const express = require("express");
const app = express();

const PORT = 3000;

const ejs = require("ejs");
const cors = require("cors");

// importing routes folder
const customerRoute = require("./routes/custRoutes");

// importing connection.js
const connection = require("./connection");

app.use(cors()); // Json object 
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/",customerRoute);


// hosting Port and Database connection Checking
connection.then((response) => {
  app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
    });
  console.log("Database has been connected!");  
  })
  .catch((err) => {
    console.log(err);
  });

  
