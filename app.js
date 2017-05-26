var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({defaultLayout : 'layout'});
var mongoose = require('mongoose');
var app = express();
var Router = require("./app/Core/Router.js")

// mongodb
var opts = {
    server: {
    socketOptions: { 
        keepAlive: 1 
    }
}};

Router(app);

mongoose.connect('mongodb://chuvak1102:1102110211021102@cluster0-shard-00-00-vc2tr.mongodb.net:27017,cluster0-shard-00-01-vc2tr.mongodb.net:27017,cluster0-shard-00-02-vc2tr.mongodb.net:27017/db?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', opts);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT);
app.use(express.static(__dirname + '/web'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     
  extended: true
}));

// типа модель
var aboutModel = require('./app/Model/aboutModel.js');

// тесты
app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' &&
    req.query.test === '1';
    next();
});

app.listen(app.get('port'), function(){
    console.log( 'пока что оно работает...');
});
