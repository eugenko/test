var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
 res.sendFile('C:/project/project/public/views/admin/admin_page.html');
//res.end('/public/views/admin/auth.html');
});



module.exports = router;
