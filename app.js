var express = require('express');
var app = express();
var swig = require('swig');
require('./filters')(swig);
var routes = require('./routes/');
var wikiRouter = require('./routes/wiki');

var bodyParser = require('body-parser');
var morgan = require('morgan');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

swig.setDefaults({cache: false});

app.use(morgan('dev'));
// app.use(function(request, response, next){
// 	console.log(request.method + " " + request.url + " " + response.statusCode);
// 	next();
// });

app.use('/', routes);
app.use('/wiki', wikiRouter);

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
	var err = new Error('could not find route');
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next){
	res.status(err.status || 500).send('ERROR: ' + err.message);
});

app.listen(3000, function(){
	console.log("server listening...");
});