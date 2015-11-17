var express = require('express');
var router = express.Router();
var models = require('../models/');
var Page = models.Page;
var User = models.User;
// router.get('/', function(req, res){
//     res.render('index');
// });

router.get('/', function(req,res){
    //res.send("Retrieving all wiki pages");
    res.redirect('/');
});


router.get('/add', function(req,res){
    //res.send("Retrieving the \"add a page\" form");
    res.render('addpage');
});

router.post('/', function(req,res,next){
    var userObject = {
    	name: req.body.name,
    	email: req.body.email
    }
    User.findOrCreate(userObject).then(function(user){
    	 var page = new Page({
    	title: req.body.title,
    	content: req.body.content,
    	tags: req.body.tags.split(" "),
    	author: user._id
    });
    	 return page.save();
	}).then(function(page){
		res.redirect(page.route);
	}).catch(next);
});

//in progress
router.get('/search', function(req,res,next){
    Page.findByTags( req.query.tags.split(" "))
    .exec()
    .then(function(pages){
        res.render('index', {pages: pages});
    }).catch(next);
});

router.get('/:urlTitle/similar', function(req,res, next){
    Page.findOne({ urlTitle: req.params.urlTitle })
    .exec()
    .then(function(page){
        return page.findSimilar()
        .exec()
        .then(function(similarPages){
        res.render('index', {pages: similarPages});
      }).catch(next);
    }).catch(next);
    
});

router.get('/:urlTitle', function(req,res, next){
    Page.findOne({ urlTitle: req.params.urlTitle })
    .exec()
    .then(function(foundPage){
        res.render('wikipage', foundPage);
      }).catch(next); // assuming you replaced mpromise
});



module.exports = router;