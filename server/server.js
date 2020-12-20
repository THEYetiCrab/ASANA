const express = require('express');
const app = express();
const path = require('path');

//routers:
const apiRouter = require('./routes/api.js');

//body parsers
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//route handlers:
app.use('/database', apiRouter);

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