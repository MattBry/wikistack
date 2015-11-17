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

router.post('/', function(req,res){
    var page = new Page({
    	title: req.body.title,
    	content: req.body.content,
    	urlTitle: urlTitleMaker(req.body.title)
    })
    page.save().then(function(){
    res.redirect('/');
});
});


router.get('/add', function(req,res){
    //res.send("Retrieving the \"add a page\" form");
    res.render('addpage');
});

function urlTitleMaker(title) {
	return title.replace(/\s/g, "_").replace(/\W/g, "");
}
module.exports = router;