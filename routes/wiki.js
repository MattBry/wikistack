var express = require('express');
var router = express.Router();

// router.get('/', function(req, res){
//     res.render('index');
// });

router.get('/', function(req,res){
    //res.send("Retrieving all wiki pages");
    res.redirect('/');
});

router.post('/', function(req,res){
    res.send("Submitting a new wiki page");
});


router.get('/add', function(req,res){
    //res.send("Retrieving the \"add a page\" form");
    res.render('addpage');
});


module.exports = router;