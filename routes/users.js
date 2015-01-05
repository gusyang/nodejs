var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res){ 
    console.log("user");
    var currentUser = req.session.user;
    
  res.render("userprofile",{title:currentUser.name,});
});


module.exports = router;
