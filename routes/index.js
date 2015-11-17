var express = require('express');
var router = express.Router();
var models = require('../models/');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next){
	Page.find()
	.exec()
	.then(function(allPages){
		res.render('index', {pages: allPages});
	}).catch(next);
});


module.exports = router;