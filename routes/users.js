var express = require('express');
var router = express.Router();

//define users, logic in router?..
var users = {
    "gusid":{
        name:"gus",
        website:"http://gus.com"
    }
};

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});
/* GET user by name. */
router.get('/:username', function(req, res,next) {
    if(users[req.params.username]){
        next();
    } else{
        next(new Error(req.params.username + " doesnot exits!"));    }
    });


/* GET user by name. */
router.get('/:username', function(req, res) {
  res.send(JSON.stringify(users[req.params.username]));
});


module.exports = router;
