const express = require('express');
const apiController = require('../controllers/apiController.js');
const router = express.Router();


router.get('/test', apiController.getBankInfo,  (req, res) =>  {
  console.log('inside')
  return res.status(200).json(res.locals.test)
})
router.post('/', (req,res) => {
  console.log('hello')
  return res.send(200);
  }
)

module.exports = router;