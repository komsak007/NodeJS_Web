var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',enSureauthenticated, function(req, res, next) {
  res.render('index', { title: 'Express' });
});
function enSureauthenticated(req,res,next){
    if (req.isAuthenticated()) {
      return next();
    }
    else {
      res.redirect('/users/login/');
    }
}
module.exports = router;
