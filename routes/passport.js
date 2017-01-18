var express = require('express');
var router = express.Router();
var passport= require('passport');
var test=require('../models/passport');
var session=require('express-session');


router.post('/', function(req,res) {
 passport.authenticate('local', function (err, data) {
  res.json(data.id);
   console.log(data);
 })(req, res);
});

router.get('/',function(req,res){
	res.json(session.user);
	//if(!session.user)
	//{
		//res.json('0');
	//}else{res.json('1')}
	
});

router.delete('/',function(req,res){
	
	test.del_sess(res);
});

module.exports = router;