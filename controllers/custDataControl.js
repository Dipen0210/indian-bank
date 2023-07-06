const moment = require("moment-timezone");
const Customer = require("../models/custMdl");

exports.custDataControl = (req, res) => {
  Customer.findOne({ accNo: req.params.id }, (err, customerData) => {
    if (!err) {
      // console.log(customerData); 
      
      const modifiedAt = moment(customerData.updatedAt).tz("America/Los_Angeles").format(); 
      
      const dob = req.params.dob;
      
      Customer.find({ accNo: { $ne: req.params.id } }, (err, allCustomers) => {
        res.render("customer", {
          allCustomers,
          customerData,
          modifiedAt,
          dob,
        });
      });
    } else {
      console.log(err);
      res.json({ message: "Server Error!" });
    }
  });
};
