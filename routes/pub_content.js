var express = require('express');
var router = express.Router();
var fun=require('../models/for_admin');


router.get('/:id',function(req,res){
	var data={};
    data.id=req.params.id;
	console.log(data);
	data.table='content';
	fun.getData(data,res)
	
});



module.exports = router;
