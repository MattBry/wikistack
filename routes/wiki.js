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

router.post('/', function(req,res){
    var page = new Page({
    	title: req.body.title,
    	content: req.body.content,
    })
    page.save().then(function(p){
        //res.redirect('/');
        //res.json(p);
        //res.send(p.urlTitle);
        res.redirect(p.route);
    });
});

router.get('/:urlTitle', function(req,res, next){
    Page.findOne({ urlTitle: req.params.urlTitle })
    .exec()
    .then(function(foundPage){
        res.render('wikipage', foundPage);
      }).catch(next); // assuming you replaced mpromise
});




module.exports = router;