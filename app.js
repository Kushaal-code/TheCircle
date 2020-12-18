const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const config=require('./config/database');
const passport= require('passport');
const flash=require('connect-flash');
const session=require('express-session');

mongoose.connect(config.database,{useCreateIndex: true, useNewUrlParser: true});
let db=mongoose.connection;

//Check connection
db.once('open',function(){
    console.log('Connected to mongodb');
});
db.on('error',function(err){
    console.log(err);
});

const app=express();

//Bring Models
let Article = require('./models/article');
let User = require('./models/user');



app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'pug');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Express-Session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

//Express-Flash
app.use(flash());


app.use(express.static(path.join(__dirname,'public')));

//Passport config
require('./config/passport')(passport);
//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*',function(req,res,next){
    res.locals.user = req.user || null;
    next();
});


//Home route
app.get('/', function(req, res){
    Article.find({},function(err,articles){
        if(err){
            console.log(err);
        }
        else{
            res.render('index',{
                title:'Articles',
                danger:req.flash('danger'),
                articles:articles
            });
        }
    });
});

//Route Files
let articles=require('./routes/articles');
let users=require('./routes/users');
app.use('/articles',articles);
app.use('/users',users);


app.listen(3000,function(){
    console.log('Server started at port: 3000');
});