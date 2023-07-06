const Customer = require("../models/custMdl");

exports.custListControl = (req, res) => {
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
};
