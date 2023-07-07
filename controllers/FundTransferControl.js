const axios = require("axios");
const Customer = require("../models/custMdl");

exports.FundTransferControl = (req, res) => {
  let { amount } = req.body;

  amount = Math.abs(Number(amount.trim()));
  // console.log(req.body);

  const sender = req.params.id;
  const receiver = req.body.transferTo;


  Customer.find({ $or: [{ accNo: sender }, { accNo: receiver }] })
    .then((senderAndReceiver) => {
      let [s, r] = senderAndReceiver;
      const senderName = s.accNo === sender ? s.name : r.name;
      const receiverName = r.accNo === receiver ? r.name : s.name;

      // console.log(`Sent From ${senderName} to ${receiverName}`);
      
      //Debit Process
      Customer.findOne({ accNo: sender })
        .then((response) => {
          const CurrentBalance =
            response.currentBal + Number(-amount);
          if (CurrentBalance < 0) throw Error("Insufficient Amount!");
          Customer.findOneAndUpdate(
            { accNo: sender },

            {
              $inc: { currentBal: Number(-amount) },

              $push: {
                transactions: {
                  transactionType: "debit",
                  transactionDetails: {
                    transferredFrom: "Self",
                    transferredTo: receiverName,
                    balance: CurrentBalance,
                    amount: Number(amount),
                  },
                },
              },
            }
          )
            .then((response) => {
              addFunds();
            })
            .catch((err) => {
              res.send(`<h3> ${err.toString()}</h3>`);
            });
        })
        .catch((err) => {
          res.send(`<h3> ${err.toString()}</h3>`);
        });

      //Credit Prcoess
      const addFunds = () => {
        Customer.findOne({ accNo: receiver })
          .then((response) => {
            const CurrentBalance = response.currentBal + amount;
            Customer.findOneAndUpdate(
              { accNo: receiver },

              {
                $inc: { currentBal: amount },

                $push: {
                  transactions: {
                    transactionType: "credit",
                    transactionDetails: {
                      transferredFrom: senderName,
                      transferredTo: "Self",
                      balance: CurrentBalance,
                      amount: amount,
                    },
                  },
                },
              }
            )
              .then((response) => {
                res.redirect(`/customers/${sender}`);
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
    })
    .catch((err) => {
      res.json({ message: err._message });
      console.log(err);
    });
};
