var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
/*
router.get('/user', function(req, res) {
  res.send('Router /user');
});
*/
module.exports = router;
