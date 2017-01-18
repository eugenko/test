var express = require('express');
var router = express.Router();
var db=require('../models/to_db');

router.get('/:page',function(req,res){
var page=req.params.page;
if(page=='undefined'){page='main'}
db.getContent(res,page,'name_page');
});

router.delete('/:id', function(req,res){
	var id=req.params.id;
	//console.log(id);
	db.getContent(res,id,'id');
});

module.exports = router;
