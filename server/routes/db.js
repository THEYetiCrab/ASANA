const express = require('express');
const dbController = require('../controllers/dbController.js');
const router = express.Router();

// gets all transactions from the database for a specific user - also invoked when we /get_transactions in the plaid.js file
router.get('/userinfo/', dbController.getBankTransactions,  (req, res) =>  {
  
  return res.status(200).json(res.locals.data);
})

//deprecated route. used during development to test database querying / inserting rows. 
router.post('/userinfo', dbController.addBankInfo, (req,res) => {
  return res.status(200).json('success');
})

//Adds transaction information to the database from the Plaid API given user credentials 
//this functionality is included in the "GET" request in 'plaid.js'.
router.post('/post_data', dbController.addBankTransactions, (req, res) => {
  return res.status(200).json('success');
})

module.exports = router;