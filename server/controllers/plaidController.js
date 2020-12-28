const plaidController = {};


//plaid vars
const plaid = require('plaid'); 
const { request } = require('http');
const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.sandbox, 
  options: {
    version: '2020-09-14',
  },
});
// We store the access_token in memory - in production, store it in a secure
// persistent data store.
let ACCESS_TOKEN = '';

plaidController.getLinkToken = (request, response, next) => {
// plaid post request - will create the route / controllers later. 
    let linkToken;
    client.createLinkToken({
      user: {
        client_user_id: 'user-id',
      },
      client_name: 'Plaid QuickStart',
      products: ['transactions'],
      country_codes: ['US'],
      language: 'en',
    }).then(
      token => {
      linkToken = token.link_token
      response.locals.linkToken = linkToken
      return next()
    }).catch((err) => {
      console.log(err)
      return next(err);
    });
  };

  plaidController.getAccessToken = (request, response, next) => {
    PUBLIC_TOKEN = request.body.public_token;
    console.log(PUBLIC_TOKEN, 'pub toke')
    client.exchangePublicToken(PUBLIC_TOKEN, function (error, tokenResponse){
      if (error != null) {
        const msg = 'Could not exchange public_token!';
        console.log(msg + '\n' + JSON.stringify(error));
        return next(error); 
      }
      ACCESS_TOKEN = tokenResponse.access_token;
      ITEM_ID = tokenResponse.item_id;
      JSON.stringify(tokenResponse, null, 2);
      response.locals.responseToken = {
        access_token: ACCESS_TOKEN,
        item_id: ITEM_ID,
        error: false,
      };
      return next();
    });
};

plaidController.getTransactions = (request, response, next) => {
  client.getTransactions(ACCESS_TOKEN,'2020-10-01','2020-12-25')
  .then(data => {
    // return response.send(data);
    //add transactions to the database
    console.log(data.accounts)
    const transactions = data.transactions; //array of transactions
    const simpTransactions = []; 
    let accountRef = {}; 

    data.accounts.forEach((account) => {
      accountRef[account.account_id] = account.subtype; 
    })
    
    transactions.forEach((trx) => {
      //trx is one transaction object
      let simpTrx = {
        account_id: trx.account_id, 
        merchant_name: trx.merchant_name, 
        amount: trx.amount, 
        account_type: accountRef[trx.account_id], 
        date_of_transaction: trx.date, 
        category: trx.category[0], 
        transaction_id: trx.transaction_id
      }; 

      simpTransactions.push(simpTrx); 
    })
    console.log(simpTransactions)
    // response.locals.transactions = simpTransactions;
    request.body = simpTransactions;
    return next();
  })
  .catch((err) => {
    console.log('error : ' + err)
    return next(err)
  });
};

  module.exports = plaidController; 