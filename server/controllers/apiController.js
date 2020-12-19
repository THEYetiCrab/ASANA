const apiController = {}

apiController.getBankInfo = (req, res, next) => {
  const test = 'test';
  console.log('test')
  res.locals.test = test;
  return next();
}

module.exports = apiController;