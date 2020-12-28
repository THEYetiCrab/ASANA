const { Client } = require('pg');
const database = new Client(process.env.POSTGRES_API);
database.connect()

const apiController = {};

apiController.getBankInfo = (request, response, next) => {
  const text = 'SELECT * FROM user_information_test LIMIT 50';
  database.query(text, (err, res) => {
    if (err) {
      return next(err)
    } else {
      response.locals.data = res.rows
      return next();
    }
  });
};


apiController.addBankInfo = (request, response, next) => {
  const queryValues = request.body.data
  const text = `INSERT INTO user_information_test ${queryValues};`;
  database.query(text, (err, res) => {
    if (err) {
      return next(err)
    } else {
      console.log('completed query')
      return next();
    }
  });
};

//
apiController.addBankTransactions = (request, response, next) => {
  const queryValues = request.body;
  let queryText = 'INSERT INTO user_information_test ( account_id, transaction_id, merchant_name, amount, account_type, date_of_transaction, category) VALUES'
  let reg = /'/
  for (let i = 0; i < queryValues.length; i++){
    if (queryValues[i].merchant_name !== null){
      queryValues[i].merchant_name = queryValues[i].merchant_name.replace(reg,"''");
    }
    if (i === queryValues.length - 1){
      queryText += `('${queryValues[i].account_id}', '${queryValues[i].transaction_id}', '${queryValues[i].merchant_name}', ${queryValues[i].amount}, '${queryValues[i].account_type}', '${queryValues[i].date_of_transaction}', '${queryValues[i].category}');`
    } else {
    queryText += ` ('${queryValues[i].account_id}', '${queryValues[i].transaction_id}', '${queryValues[i].merchant_name}', ${queryValues[i].amount}, '${queryValues[i].account_type}', '${queryValues[i].date_of_transaction}', '${queryValues[i].category}'),`
  }};
  database.query(queryText, (err, res) => {
    if (err) {
      return next(err)
    } else {
      console.log('completed query')
      return next();
    }
  });
};



module.exports = apiController;
