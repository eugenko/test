var express=require('express');
var mysql=require('mysql');
var fs = require('fs');  
var Promise=require('promise');
  

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
 // password : ' ',
  database: 'onecoin'
});


function getData(data,res)
{
	if(data.id)
	{
	connection.query("SELECT * FROM " + data.table + " WHERE id ='" + data.id + "'",function(err,result){
			if(!err)
		{
			res.json(result);
		}else{console.log(err)}
	});
	}
	else
	{
console.log(data);
 connection.query("SELECT * FROM " + data.table + " WHERE name_page ='" + data.name_page+"'" ,function(err,result){
			if(!err)
		{
			res.json(result);
		}else{console.log(err)}
	});
	}

}

function getVideo(res)
{
	connection.query("SELECT * FROM  video" ,function(err,result){
			if(!err)
		{
			res.json(result);
		}else{console.log(err)}
	});
}




function redact(data,res)
{
	if(data.name_page=='video')
	{
		connection.query("INSERT INTO " + data.name_page+ "(name,text,date,video) VALUES ('"+data.name+"','"+ data.text+"','"+ new Date()+"','"+data.video+"')",function(err,data){
			if(!err)
			{
				res.json('Success!');
			}else{console.log(err);}
		});
		
		//console.log(data);
	}else{ 
	if(!data.image){data.image='null'}
	if(!data.id)
	{
		connection.query("INSERT INTO " + data.table+ "(title,preview,text,image,date,name_page) VALUES ('"+data.title+"','"+data.preview+"','"+ data.text +"','"+ data.image +"','"+ new Date() +"','"+ data.name_page +"')",function(err,data){
			if(!err)
			{
				res.json('Публикация успешно сохранена');
			}else{console.log(err)}
		});
	}else{ 

		
		connection.query("UPDATE " + data.table + " SET title='"+ data.title +"', preview='"+data.preview+"', text='"+ data.text +"',image='"+ data.image +"', date= '"+ new Date() +"',name_page='"+ data.name_page +"' WHERE id='"+ data.id+"'",function(err,data){
			if(!err)
			{
				res.json('Публикация успешно сохранена');
			}else{console.log(err)}
		});	
	}
	}

	}
	


//function insertData(data,res)
//{
	
//}

function deleteData(data,res)
{
	
	if(data.table=='content'){
		connection.query("SELECT image FROM "+data.table+" WHERE  id="+data.id, function(err,dat){
			if(!err)
			{
		connection.query("DELETE FROM "+data.table+" WHERE  id="+data.id, function(err,data){
			if(!err)
			{
				
				if(dat[0].image!='null')
				{
				fs.unlink('public/uploads/'+dat[0].image);
				}
				res.json(true);
			}else{res.json(false);}
		});
			}
		});
	}
	else{
		console.log(data);
		
		connection.query("DELETE FROM "+data.table+" WHERE id='"+data.id+"'",function(err,data){
			if(!err)
			{
				res.json('success');
			}
		});
			
				
		}
	}



function addPage(data,res)
{//if not exists

//connection.query("SELECT id FROM content WHERE name_page='"+page+"'",function(err,result){
	//				if(!err)
		//			{
			//			console.log('1'+JSON.stringify(result));
				//		if(result=='')
					//	{
	connection.query("INSERT INTO " + data.table + "(page,value) VALUES ('" +data.name+ "','" +data.value+ "')",function(err,result){
		if(err)
		{
			res.json('false');
		}else{
			res.json('true');
		}
	});
	//	}
//}
}

function deletePage(page,res)
{
	
		
			//var promise = 
new Promise(function(resolve,reject){connection.query("SELECT * FROM content WHERE name_page='"+ page+"'",function(err,result){
				for(i=0;i<result.length;i++)
				{
					
				//new Promise(function(resolve,reject){
					delContent(result[i].image,result[i].id);
					//resolve(i);
				//}).then(function(flag){
					console.log(result.length,i);
					if(result.length==i+1)
				{
					resolve(page);
					console.log('yes')
				}
				}
				
			
				
				
				
			
			});

			
			
}).then(function(page){
	
	//console.log(page);
	connection.query("SELECT id FROM content WHERE name_page='"+page+"'",function(err,result){
					if(!err)
					{
						console.log('1'+JSON.stringify(result));
						if(result=='')
						{
							connection.query("DELETE  FROM menu WHERE page='"+page+"'",function(err,data){
							if (!err)
							{
								res.json(true);
							}else
							{res.json(false);}
						
						});	
						}
					}
		
	                 else{console.log('2'+err)}
					
		
	});
});
						

}
					
	

function delContent(img,id)
{
		
					connection.query("DELETE  FROM content WHERE id= '"+id+"'",function(err,data){
						if(err)
						{
							consle.log(err);
						}else{
							if(img!='null'){
					fs.unlink('public/uploads/'+img);
					}
							
						}
					});					
}



exports.getData=getData;
exports.redact=redact;
exports.deleteData=deleteData;
exports.addPage=addPage;
exports.deletePage=deletePage;
exports.getVideo=getVideo;