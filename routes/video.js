var express = require('express');
var router = express.Router();
var fun=require('../models/for_admin');



router.get('/',function(req,res){
	
	
	fun.getVideo(res);
	
});

module.exports = router;