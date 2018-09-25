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
mongoose.connect(`mongodb://` + process.env.USERNAME + ':' + process.env.PASSWORD + `@` + process.env.MONGO_URL, {
        useNewUrlParser: true
    })
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
app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
app.use(bodyParser.json())


function isValidDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false; // Invalid format
    var d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return false; // Invalid date
    return d.toISOString().slice(0, 10) === dateString;
}

var userModel = require('./models/user');
var exerciseModel = require('./models/exercise');

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
    response.render(__dirname + '/views/index', {
        title: "Shorten URL",
        message: "Enter url"
    });
});

app.post('/api/exercise/new-user', function(request, response) {
    var original_url = request.params.new;

    if (/((ftp|http|https):\/\/)?(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(request.params.input_url)) {
        var user = new userModel({
            username: request.body.username
        });
        user.save()
            .then(doc => {
                console.log(doc)
               /** response.send({
                    "user": doc
                });
                **/
            })
            .catch(err => {
                response.send({
                    "save database error": err
                });
            })
        //response.send( {"error":"accept"});
    } else {
        response.send({
            "error": "invalid URL"
        });
    }
  userModel.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    response.send(userMap);  
  });
});

app.post('/api/exercise/add', function(request, response) {
  userModel.findOne({
    _id: request.body.userId   // search query
  }) .then(doc => {
    //response.send( {"error":doc});\
 
   
    
    console.log("test success");
    response.redirect(301, targetUrl);
  
   
  })
  .catch(err => {
    response.send( {"error":err});
  });
  
  console.log(request.body.userId);
  console.log(mongoose.Types.ObjectId.isValid(parseInt(request.body.userId)));
  var exercise = new exerciseModel({
                userId: request.body.userId,
                date: request.body.date,
                description: request.body.description,
                duration: request.body.duration
            });
            exercise.save().then(doc => {
                response.send({
                    "user": doc
                });
            }).catch(err => {
                console.log(err);
                response.send({
                    "error save exercise": err
                });
            });

});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});