var express = require('express');
var app = express();
var router = express.Router();

//Include the Data Model User
var User = require('../models/user');


//Get / homepage
router.get('/home', function(req, res){
     res.render('home');
});


module.exports = router;
 