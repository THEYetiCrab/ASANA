const express = require('express');
const app = express();
const path = require('path');
const { exitCode } = require('process');


//routers:
const apiRouter = require('./routes/api.js');


//route handlers:
app.use('/test1')

// a new test.
//lets check out if this works. 

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
// serve index.html on the route '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});








app.listen(3000); //listens on port 3000 -> http://localhost:3000/