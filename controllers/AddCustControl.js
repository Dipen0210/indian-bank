const Customer = require("../models/custMdl");

const loadcustomer = async(req,res) =>{
  try{
    res.render("addcustomer");
  }catch(err){
    console.log(err.message);
  }
} 

  const custControl = (req, res) => {
    const { name, address, dob, email, currentBal, phone, gender } = req.body;
    const customer = new Customer({
      name: req.body.name,
      email: req.body.email,
      address:req.body.address,
      dob:req.body.dob,
      currentBal: req.body.currentBal,
      phone:req.body.phone,
      gender:req.body.gender
    });

    customer.save((err, result) => {
      Customer.find()
      .sort("name")
      .exec((err, customers) => {
        if(!err){
  
          res.render("index", {
            customers, // it's collection name of our documents
          });
        }else{
          res.status(500);
        }
      });
      });
  };

  module.exports = {loadcustomer,custControl};