const express = require('express');
const plaidController = require('../controllers/plaidController.js');
const router = express.Router();
const apiController = require('../controllers/apiController.js');

router.post('/get_link_token', plaidController.getLinkToken, (req, res) =>  {
  return res.status(200).json(res.locals.linkToken);
});


router.post('/get_access_token', plaidController.getAccessToken, (req, res) => {
  console.log(res.locals.responseToken);
  return res.status(200).json(res.locals.responseToken);
});


router.get('/get_transactions', plaidController.getTransactions, (req,res) => {
  // console.log(res.locals.transactions)
  // redirect it to the post request to the data base. 
  
  return res.status(200).json(res.locals.transactions);
});


module.exports = router;