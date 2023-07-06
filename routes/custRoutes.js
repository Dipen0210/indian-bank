const express = require("express");
const bodyParser = require('body-parser');

// Importing all .js files
const { homePage } = require("../controllers/homePage");
const { custListControl } = require("../controllers/custListControl");
const { custDataControl } = require("../controllers/custDataControl");
const { loadcustomer,custControl } = require("../controllers/AddCustControl");
const { creditControl } = require("../controllers/creditControl");
const { debitControl } = require("../controllers/debitControl");
const { TransactionControl } = require("../controllers/TransactionControl");
const { FundTransferControl } = require("../controllers/FundTransferControl");


const router = express.Router();

// Middleware for parsing form data
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Routes defined and thier rendering
router.get("/", homePage);

router.get("/index",custListControl);

router.get("/addcustomer",loadcustomer);
router.post("/index",custControl);


router.get("/customers/:id",custDataControl);

router.get("/customers/:id/transactions",TransactionControl);

router.post("/customers/:id/addFunds",creditControl);

router.post("/customers/:id/withdrawFunds",debitControl);

router.post("/customers/:id/transferFunds",FundTransferControl);

module.exports = router;