var Promise=require('promise');
var mysql=require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
 // password : ' ',
  database: 'onecoin'
});




function quers(res)
{
		connection.query('SELECT*FROM menu',function(err,data){
			if(err)
			{
				res.json(err);
				
			}else{
				res.json(data);
			}
		});
}


function getContent(res,param,arg)
{
	connection.query("SELECT*FROM content WHERE "+ arg +"='"+ param +"'",function(err,data){
		if(err){
			res.json(err)
			}else{res.json(data); console.log(data)}
	});
}

exports.quers=quers;
exports.getContent=getContent;