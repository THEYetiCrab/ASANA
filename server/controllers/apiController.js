const { Client } = require('pg');
const database = new Client('postgres://cjcfvoek:k4H4MXifkzt8rWlXNAJ72lQp4S8-oxN4@suleiman.db.elephantsql.com:5432/cjcfvoek')
database.connect()
const apiController = {};

apiController.getBankInfo = (request, response, next) => {
  const text = 'SELECT * FROM user_information_test';
  database.query(text, (err, res) => {
    if (err) {
      return next(err)
    } else {
      response.locals.data = res.rows
      return next();
    }
  });
};


//populateQueryString

apiController.addBankInfo = (request, response, next) => {
  const queryValues = request.body.data
  const text = `INSERT INTO user_information_test ${queryValues};`;
  database.query(text, (err, res) => {
    if (err) {
      return next(err)
    } else {
      // response.locals.data = res.rows
      console.log('completed query')
      return next();
    }
  });
};



module.exports = apiController;