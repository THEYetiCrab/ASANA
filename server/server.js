const express = require('express');
const app = express();
const path = require('path');

//routers:
const apiRouter = require('./routes/api.js');
const plaidRouter = require('./routes/plaid.js')

//body parsers
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// We store the access_token in memory - in production, store it in a secure
// persistent data store
let ACCESS_TOKEN = null;
let PUBLIC_TOKEN = null;
let ITEM_ID = null;
// The payment_id is only relevant for the UK Payment Initiation product.
// We store the payment_id in memory - in production, store it in a secure
// persistent data store
let PAYMENT_ID = null;

//plaid vars
const plaid = require('plaid'); 
const { request } = require('http');
const client = new plaid.Client({
  clientID: '5fde32c9df1def00139866d6',
  secret: 'dcaa4faef979bb95480fed7da33be4',
  env: plaid.environments.sandbox, // need to download sandbox into this directory.
  options: {
    version: '2020-09-14',
  },
});

//route handlers:
app.use('/database', apiRouter);
app.use('/test',plaidRouter);

app.post('/api/info', function (request, response, next) {
  console.log(
  response.json({
    item_id: ITEM_ID,
    access_token: ACCESS_TOKEN,
    products: PLAID_PRODUCTS,
  })
  )
});

// plaid post request - will create the route / controllers later. 
let linkToken;
app.post('/test/get_link_token', (request, response) => {
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
      console.log(token);
      return response.status(200).json(response.locals.linkToken)
    }).catch((err) => {console.log(err)});
})

app.post('/test/get_access_token', (request, response) => {
  PUBLIC_TOKEN = request.body.public_token;
  console.log(PUBLIC_TOKEN, 'pub toke')
  client.exchangePublicToken(PUBLIC_TOKEN, function (error, tokenResponse){
    if (error != null) {
      const msg = 'Could not exchange public_token!';
      console.log(msg + '\n' + JSON.stringify(error));
      return response.json({
        error: msg,
      });
    }
    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;
    JSON.stringify(tokenResponse, null, 2);
    response.json({
      access_token: ACCESS_TOKEN,
      item_id: ITEM_ID,
      error: false,
    })
  })
})

app.get('/test/accounts', (request, response) => {
  client.getTransactions(ACCESS_TOKEN,'2020-11-01','2020-12-01')
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

    return response.send(simpTransactions);
  })
  .catch((err) => console.log('error : ' + err));
});


// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
// serve index.html on the route '/'
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../index.html'));
// });


// catch all for invalid requests that don't match any paths. 
app.use((req, res) => res.sendStatus(404));


app.listen(3000, () => {
  console.log(`Server listening on port: 3000`);
});