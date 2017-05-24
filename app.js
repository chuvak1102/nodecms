var express = require('express');
var app = express();
var handlebars = require('express-handlebars')
.create({defaultLayout : 'layout'});
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




