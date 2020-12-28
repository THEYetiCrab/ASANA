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

//BCRYPT 

router.post('/create_pw', apiController.createPassword, apiController.storeUserCredentials, (req, res) => {
  return res.status(200).json(res.locals.result);
})

router.post('/check_pw', apiController.checkPassword,  (req, res) => {
  return res.status(200).send('saved');
});


module.exports = router;