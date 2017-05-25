var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({defaultLayout : 'layout'});
var mongoose = require('mongoose');
mongoose.connect('mongodb://chuvak1102:1102110211021102@cluster0-shard-00-00-vc2tr.mongodb.net:27017,cluster0-shard-00-01-vc2tr.mongodb.net:27017,cluster0-shard-00-02-vc2tr.mongodb.net:27017/db?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', opts);

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     
  extended: true
}));


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT);
app.use(express.static(__dirname + '/web'));


// типа модель
var aboutModel = require('./app/Model/aboutModel.js');

// тесты
app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' &&
    req.query.test === '1';
    next();
});


// mongodb
var opts = {
    server: {
    socketOptions: { 
        keepAlive: 1 
    }
}};

// роутеры
app.get('/', function(req, res){
    res.render('index');
});

app.get('/tour', function(req, res){
    
    res.render('tour', {
        // result : aboutModel.getData(),
        // pageTestScript: '/test/tests-about.js'
    });
});

app.get('/about', function(req, res){
    
    res.render('about', {
        result : aboutModel.getData(),
        pageTestScript: '/test/tests-about.js'
    });
});

app.post('/submit', function(req, res){
    res.render('tour', {
        data : 't-data'
        // result : aboutModel.getData(),
        // pageTestScript: '/test/tests-about.js'
    });
    
    console.log(req.body.name);
    console.log(req.body.password);
});

// заголовки браузера
app.get('/headers', function(req,res){
    res.set('Content-Type','text/plain');
    var s = '';
    for(var name in req.headers)
    s += name + ': ' + req.headers[name] + '\n';
    res.send(s);
});

// пользовательская страница 404
app.use(function(req, res){
    res.status(404);
    res.render('404');
});

// пользовательская страница 500
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});
app.listen(app.get('port'), function(){
    console.log( 'пока что оно работает...');
});




