
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var authenticate = require('./routes/authenticate');
var http = require('http');
var path = require('path');

var countries = require('./data/countries');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/countrymodule', function(req, res){
    res.render('country');
});

// provide a JSON endpoint for countries
app.get('/countries/:country_name', function(req, res){
    console.log(req.params);
    console.log(req.url);
    console.log(req.query);
    res.json(200, countries.getCountryByName(req.params.country_name));
});

app.get('/countries/languages/:code', function (req, res) {

    res.json(200, countries.getCountriesByLanguageCode(req.params.code));
});

// handle login requests - non standard - for test only
app.post('/login', authenticate.login);

app.post('/test', function (req, res) {
    console.log(req.body);
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
    //console.log(countries.getCountriesByLanguageCode('en'));

});
