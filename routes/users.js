const express =  require('express');
const path = require('path');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const multer= require('multer');


//Bring User Model
let User = require('../models/user');

//Storing images
const storage= multer.diskStorage({
    destination:'./public/upload/',
    filename: function(req,file,cb){
        cb(null,file.fieldname+'.'+Date.now()+path.extname(file.originalname));
    }
});

//Init Upload
const upload=multer({
    storage: storage,
    limits: {fileSize: 3000000},
    fileFilter: function(req,file,cb){
        checkFileType(file,cb);
    }
}).single('uploadimg');

//Register Form
router.get('/register', function(req,res){
    res.render('register',{
        errors: req.flash('error')
    });
});

//Register Process
router.post('/register', function(req,res){
    const name=req.body.name;
    const email=req.body.email;
    const username=req.body.username;
    const state=req.body.state;
    const password=req.body.password;
    const displaypic='default.png';

    let newUser= new User({
        name:name,
        email:email,
        username:username,
        state:state,
        password:password,
        displaypic:displaypic
    });

    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(newUser.password, salt, function(err,hash){
            if(err){
                console.log(err);
            }
            newUser.password=hash;
            newUser.save(function(err){
                if(err){
                    if(err.code==11000)
                    {
                        req.flash('error','Email ID is already registered');
                        res.redirect('/users/register');
                    }
                    console.log(err);
                    return;
                }else{
                    res.redirect('/users/login');
                }
            });
        });
    });
});

//Login form
router.get('/login', function(req,res){
    res.render('login',{
        errors: req.flash('error'),
        success:req.flash('success')
    });
});

//Login Process
router.post('/login',function(req,res,next){
    passport.authenticate('local',{
        successRedirect:'/',
        failureRedirect:'/users/login',
        failureFlash: true
    })(req,res,next);
});

//Logout
router.get('/logout',ensureAuthenticated, function(req,res){
    var username = req.user.username;
    req.logout();
    req.flash('success','You have logged out '+username);
    res.redirect('/users/login');
});

//User Profile
router.get('/:id',function(req,res){
    User.findById(req.params.id,function(err,userdetails){
        res.render('user',{
            userdetails:userdetails
        })
    })
});

//Edit User
router.get('/edit/:id',ensureAuthenticated, function(req,res){
    res.render('edit_profile');
})

//Edit User Process
router.post('/edit/:id',upload, function(req,res){
    console.log(req.file);
    let user={};
    if(req.file==null)
    {
        console.log("No file selected");
    }
    else{
        user.displaypic=req.file.filename;
    }
    user.interest=req.body.interest;
    user.aboutme=req.body.about;
    let query={_id:req.params.id};
    User.update(query,user,function(err){
        if(err){
            console.log(err);
            return;
        }else{
            res.redirect('/');
        }
    })
});

//Add Friend

router.put('/:id', function(req,res){
    let query={_id:req.user.id};
    let fuser={$addToSet:{friendlist:req.params.id}};
    let query2={_id:req.params.id}
    let fuser2={$addToSet:{friendlist:req.user.id}};

    User.update(query2,fuser2, function(err){
        if(err){
            console.log(err);
        }
    });

    User.update(query, fuser, function(err){
        if(err){
            console.log(err);
        }
        res.send('Success');
    });
});

//Access Control
function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else {
        req.flash('error', 'You are not logged in');
        res.redirect('/users/login');
    }
}
//Check Upload File Type  
function checkFileType(file,cb){
    var filetypes=/jpeg|jpg|png|gif/;
    const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetype= filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true)
    }else{
        cb('Error: Image Only');
    }
}


module.exports=router;