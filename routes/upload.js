var express = require('express');
var router = express.Router();
//var fun=require('../models/upload');

//router.post('/',function(req,res){
	//	console.log("IMAGE/////////////////////////////////////////////"+JSON.stringify(req.body));
	//fun.uploadImage(req.body,res);
	
//});

//module.exports = router;




//  var express = require('express'); 
    var app = express(); 
    var bodyParser = require('body-parser');
    var multer = require('multer');

    app.use(function(req, res, next) { //allow cross origin requests
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    
    app.use(express.static('public/'));
	//app.use(express.static(path.join(__dirname, '/public')));
    app.use(bodyParser.json());  

    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './public/uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
           // cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
			  cb(null,file.originalname);
			console.log(file);
        }
    });

    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');

   
    router.post('/', function(req, res) {
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
			// console.log(file);
        });
    });
	
	module.exports = router;