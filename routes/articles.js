const express =  require('express');
const router = express.Router();
const passport= require('passport');

let Article = require('../models/article');
let User = require('../models/user');
let Comment= require('../models/comment');

//Add Route
router.get('/add',ensureAuthenticated, function(req,res){
    res.render('add_article',{
        title:'Add Articles',
    });
});

//Add Submit Post Route
router.post('/add', function(req,res){
    let article=new Article();
    article.title=req.body.title;
    article.author=req.user.username;
    article.body=req.body.cbody;
    article.author_id=req.user._id;

    article.save(function(err){
        if(err){
            console.log(err);
            return;
        }else{
            res.redirect('/');
        }
    });
});

//Edit Article
router.get('/edit/:id',ensureAuthenticated, function(req,res){
    Article.findById(req.params.id, function(err,article){
        if(article.author_id != req.user._id)
        {
            req.flash('danger', 'Not Authorized');
            res.redirect('/');
        }
        else{
            res.render('edit_article',{
                title:'Edit Article',
                article:article,
            });
        }
    });
});

//Update edit Route
router.post('/edit/:id', function(req,res){
    let article={};
    article.title=req.body.title;
    article.author=req.body.author;
    article.body=req.body.body;

    let query={_id:req.params.id};

    Article.update(query, article, function(err){
        if(err){
            console.log(err);
            return;
        }else{
            res.render('article',{
                article:article,
            });
        }
    });
});

//Delete Article
router.delete('/:id', function(req,res){
    let query= {_id:req.params.id};

    Article.remove(query, function(err){
        if(err){
            console.log(err);
        }
        res.send('Success');
    });
});


//Get Single Article

router.get('/:id', function(req,res){
    Article.findById(req.params.id, function(err,article){
        let query={article_id: req.params.id}
        Comment.find(query,function(err,comments){
            User.find(comments.commenter_id, function(err,users){
                if(err){
                    console.log(err);
                }else{
                    res.render('article',{
                        article:article,
                        comments:comments,
                        users:users
                    });
                }
            });
        });
    });
});

//Add Comment
router.post('/:id', function(req,res){
    let comment=new Comment();
    comment.article_id=req.params.id;
    comment.comment_body=req.body.cbox;
    comment.commenter_id=req.user._id;
    comment.comment_time= new Date();

    comment.save(function(err){
        if(err){
            console.log(err);
            return;
        }else{
            res.redirect('/articles/'+req.params.id);
        }
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



module.exports=router;