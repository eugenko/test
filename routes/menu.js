var express = require('express');
var router = express.Router();
var db=require('../models/to_db');

router.get('/',function(req,res){
db.quers(res);
});


module.exports = router;
