var express = require('express');
var router = express.Router();

//Include the Data Model User
var User = require('../models/user');


//Get / render register page
router.get('/register', function(req, res){
    return res.render('register');
});

//Post / send data from register page
router.post('/register', function(req, res, next){
    console.log(req.body);
    const name = req.body.name;
    const  number = req.body.number;
    
    if(name && number){
        // create object with form input
        var userData = {
        name: name,
        number_plate: number 
        };

        // use schema's `create` method to insert document into Mongo
        User.create(userData, function (error, user) {
            if (error) {
            return next(error);
            } else {
            return res.send('Done sucessfully');
            }
        });

    }
});

// GET profiles/ => show the lists of registered vehicles
router.get('/profiles', (req,res,next)=>{
    User.find({}, function (err, users) {
        if (err) {
            return next(err);
        } else {
            return res.render('user_list',{users});
        }
    });
});

// GET details/ show the details about the vehicle
router.get('/details',(req,res,next)=>{
    const number_plate = req.query.number_plate;
    if(!number_plate){
        return res.redirect('/profiles');    
    }else{
        User.findOne({ number_plate:number_plate }, function(err, data) {
            if (err) {
                return next(err);
            } else {
                if (!data) {
                    return res.send('Data not found :(');
                } else {
                    console.log(data);
                    return res.render('user_profile', { data: data });
                }
            }
        });
    }
});

// GET canvas/ => render the canvas
router.get('/canvas',(req,res,next)=>{
    return res.render('canvas.pug');
});
module.exports = router;