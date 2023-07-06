const Customer = require("../models/custMdl");

exports.creditControl = (req, res) => {
  const id = req.params.id;
  
  let { amount } = req.body;

  amount=Math.abs(Number(amount.trim()));
  
  // console.log(req.body);

  Customer.findOne({ accNo: id })
    .then((response) => {

      const CurrentBalance = response.currentBal +amount;
      Customer.findOneAndUpdate(
        { accNo: id },
        {
          $inc: { currentBal:amount },
          $push: {
            transactions: {
              transactionType: "credit",
              transactionDetails: {
              transferredFrom: "Self",
              transferredTo: "Self",
              balance: CurrentBalance,
              amount:amount,
              },
            },
          },
        }
      )
      .then((response) => {
        res.redirect(`/customers/${id}`);
      })
      .catch((err) => {
        res.json({ message: err._message });
        console.log(err);
      });
    })
    .catch((err) => {
      res.json({ message: err._message });
      console.log(err);
    });
};
