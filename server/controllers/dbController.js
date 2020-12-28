const { Client } = require('pg');
const database = new Client('postgres://cjcfvoek:k4H4MXifkzt8rWlXNAJ72lQp4S8-oxN4@suleiman.db.elephantsql.com:5432/cjcfvoek');
database.connect()

const dbController = {};

//Selects all rows from the transactions table.
dbController.getBankTransactions = (request, response, next) => {
  const text = 'SELECT * FROM user_transactions';
  database.query(text, (err, res) => {
    if (err) {
      return next(err)
    } else {
      response.locals.data = res.rows
      return next();
    }
  });
};

// deprecated method that allows developers to insert rows in. not used in any middleware routes. 
dbController.addBankInfo = (request, response, next) => {
  const queryValues = request.body.data
  const text = `INSERT INTO user_transactions ${queryValues};`;
  database.query(text, (err, res) => {
    if (err) {
      return next(err)
    } else {
      console.log('completed query')
      return next();
    }
  });
};

// Adds all transactions from the Plaid API in accordance with the predefined schema for what a transaction should look like 
dbController.addBankTransactions = (request, response, next) => {
  const queryValues = request.body;
  let queryText = 'INSERT INTO user_transactions (account_id, transaction_id, merchant_name, amount, account_type, date_of_transaction, category) VALUES'
  // this regular expression replace iterative loop replaces all single apostrophe's "'" with two apostrophe's "''" so SQL can read the requests. In our dummy data this only applies to "McDonald's"
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
      return next();
    }
  });
};

module.exports = dbController;
