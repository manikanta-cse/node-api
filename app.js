/**
 * Created by kattamum on 11/2/2015.
 */

var express=require('express'),mongoose=require('mongoose'),bodyParser=require('body-parser');

//open a connection
var db=mongoose.connect('mongodb://localhost/bookAPI');

var Book=require('./models/bookModel');


var app=express();

var port=process.env.PORT ||3000;

app.use(bodyParser.urlencoded({extented:true}));
app.use(bodyParser.json());

bookRouter = require('./Routes/bookRoutes')(Book);

app.use('/api/books',bookRouter);
//app.use('/api/authors',authorRouter);


app.get('/', function (req,resp) {
resp.send('welcome to my express api');

});

app.listen(port, function () {
   console.log("running on port:"+port);
});

