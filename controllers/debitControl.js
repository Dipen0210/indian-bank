const Customer = require("../models/custMdl");

exports.debitControl = (req, res) => {
  const id = req.params.id;
  let { amount } = req.body;
  amount = amount.trim();
  Customer.findOne({ accNo: id })
    .then((response) => {
      const CurrentBalance = response.currentBal + Number(-amount);
      if (CurrentBalance < 0) throw Error("Insufficient Funds!");
      Customer.findOneAndUpdate(
        { accNo: id },

        {
          $inc: { currentBal: Number(-amount) },

          $push: {
            transactions: {
              transactionType: "debit",
              transactionDetails: {
                transferredFrom: "Self",
                transferredTo: "Self",
                balance: CurrentBalance,
                amount: Number(amount),
              },
            },
          },
        }
      )
        .then((response) => {
          res.redirect(`/customers/${id}`);
        })
        .catch((err) => {
          res.send(`<h3> ${err.toString()}</h3>`);
        });
    })
    .catch((err) => {
      res.send(`<h3> ${err.toString()}</h3>`);
    });
};
