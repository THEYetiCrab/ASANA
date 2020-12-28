const { Client } = require('pg');
const database = new Client('postgres://cjcfvoek:k4H4MXifkzt8rWlXNAJ72lQp4S8-oxN4@suleiman.db.elephantsql.com:5432/cjcfvoek');
database.connect()

const bcrypt = require('bcrypt');
const saltRounds = 10;

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


// DID SOMEONE SAY BCRYPT????



apiController.createPassword = (request, response, next) => {
  const { password, username } = request.body;
  bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) { 
      return next(err);
    }
    console.log('created hash', hash);
    response.locals.test = hash
    request.body = {hash, username,}
    return next();
  });
};


apiController.checkPassword = (request, response, next) => {
  const { password, username } = request.body;
  const text = `SELECT * FROM bc_storage WHERE username='${username}'`;
  let data;
    database.query(text, (err, res) => {
    if (err) {
      return next(err)
    } else {
      data = res;
      console.log(data.rows)
    }
  }).then(console.log('hello'))
  //make async^^ then method isn't working because of query. 
  bcrypt.compare(password, data.rows[0].hash, function(err, res) {
      if (err) return next(err);
      if(res) {
        response.locals.result = res;
        return next();
      } else {
       response.locals.result = false;
       return next();
    }  
  });
};

//PW DB METHODS
apiController.storeUserCredentials = (request, response, next) => {
  console.log('storing controller')
  console.log(request.body)
  const { username, hash } = request.body;
  const text = `INSERT INTO bc_storage (username, hash) VALUES ('${username}', '${hash}');`;
  database.query(text, (err, res) => {
    if (err) {
      return next(err)
    } else {
      console.log('completed query')
      return next();
    }
  });
}


module.exports = apiController;
