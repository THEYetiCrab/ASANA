const express = require('express');
const apiController = require('../controllers/apiController.js');
const router = express.Router();


router.get('/userinfo/', apiController.getBankInfo,  (req, res) =>  {
  // const name = req.params.username
  return res.status(200).json(res.locals.data);
})

// need additional middleware functions to deconstruct API data into sql friendly format the data into array format etc. 
router.post('/userinfo', apiController.addBankInfo, (req,res) => {
  return res.status(200).json('success');
})
router.post('/post_data', apiController.addBankTransactions, (req, res) => {
  return res.status(200).json('success');
})

module.exports = router;