var express = require('express');
var router = express.Router();
var fun=require('../models/for_admin');


router.get('/:val',function(req,res){
	var data={};
    data.name_page=req.params.val;
	//console.log(data);
	data.table='content';
	fun.getData(data,res)
	
});

router.put('/',function(req,res){
	fun.redact(req.body,res)
	//console.log(req.body);
});


router.delete('/:id',function(req,res){
	var data={};
	 data.id=req.params.id;
	 data.table='content';
	 console.log(data);
	 fun.deleteData(data,res);
	
});

router.post('/',function(req,res){
	var data={};
	data=req.body;
	data.table='menu';
	
	fun.addPage(data,res);
});

router.delete('/del_page/:name_page',function(req,res){
	//console.log(req.params.name_page);
	fun.deletePage(req.params.name_page,res);

	});
	
router.post('/video',function(req,res){
	var data=req.body;
	data.name_page="video";
	
	
	fun.redact(data,res);
	
});

router.get('/video_del/:id',function(req,res){
	var data={};
	data.table='video';
	data.id=req.params.id;
	
	fun.deleteData(data,res);

});

	


module.exports = router;
