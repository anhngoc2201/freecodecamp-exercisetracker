// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
mongoose.connect(`mongodb://`+ process.env.USERNAME + ':' + process.env.PASSWORD +`@` +process.env.MONGO_URL,{ useNewUrlParser: true })
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error: ' + err)
       })
autoIncrement.initialize(mongoose.connection);
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.set('view engine', 'pug')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.render(__dirname + '/views/index',{title:"Shorten URL",message:"Enter url"});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
