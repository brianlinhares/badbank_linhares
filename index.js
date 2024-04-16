var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
const e = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//================================Serve static files from public directory================================
app.use(express.static('public'));
app.use(cors());
//================================CREATE ACCOUNT================================
app.get('/account/create/:name/:email/:password/:role', function (req, res) {
    dal.find(req.params.email).
        then((users) => {
        if(users.length > 0){
            console.log('User name is taken. Please select another.');
            res.send('User name is taken. Please select another.');    
            }
        else{
            const decodePassword = decodeURIComponent(req.params.password);
            bcrypt.hash(decodePassword, saltRounds).then(function(hash) {
            dal.create(req.params.name,req.params.email,hash,req.params.role).
            then((user) => {
                console.log(user);
                res.send(user);            
            }); 
            });
            }
        });
    });
//================================LOGIN================================ 
app.get('/account/login/:email/:password', function (req, res) {
    dal.find(req.params.email).
        then((user) => {
            if(user.length > 0){
                const decodePassword = decodeURIComponent(req.params.password);
                bcrypt.compare(decodePassword, user[0].password).then(function(result) {
                    if (result){
                        res.send(user[0]);
                    }
                    else{
                        res.send('LOGIN FAILED: INCORRECT PASSWORD');
                    }
                });
            }
            else{
                res.send('LOGIN FAILED: USER NOT FOUND');
            }
    });
});
//================================FIND ACCOUNT================================
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});
//================================FINDONE ACCOUNT================================
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});
//================================DEPOSIT/WITHDRAW================================
app.get('/account/update/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});
//================================ALL ACCOUNTS================================
app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});
//================================LISTEN AND PORT================================
var port = process.env.PORT || 3000;
app.listen(port);
console.log('RUNNING ON PORT: ' + port);