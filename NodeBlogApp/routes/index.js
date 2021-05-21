var express = require('express');
var router = express.Router();
var {check,validationResult} = require('express-validator');

var mongodb = require('mongodb');
var db = require('monk')('localhost:27017/BlogDB');

/* GET home page. */
router.get('/', function(req, res, next) {
  var blog = db.get('posts')
  blog.find({},{},function(err,blog){
      res.render('index', { posts:blog });
  });
});

router.get('/category/add', function(req, res, next) {
      res.render('addcategory');
});
router.post('/category/add',[
  check('name',"กรุณาป้อนชื่อประเภท").not().isEmpty()
], function(req, res, next) {
      var result = validationResult(req)
      var errors = result.errors
      if(!result.isEmpty()){
        res.render('addcategory',{errors:errors})
      }
      else{
        var category = db.get('categories')
        category.insert({
          name:req.body.name
        },function(err,success){
          if(err){
            req.sent(err)
          }
          else {
            res.redirect("/")
          }
        })
      }
});

module.exports = router;
