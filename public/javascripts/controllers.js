angular.module('app').controller('MainControll',MainControll);
angular.module('app').controller('getContent',getContent);
angular.module('app').controller('getPublic',getPublic);
angular.module('app').controller('videoController', videoController);



function MainControll($http,$scope)
{
	$http.get('/menu').then(function(res){
		$scope.menu=res.data;
	});
};


function getContent($http,$scope,$routeParams)
{
	//var page= $routeParams.page;
	
	$http.get('/content/'+$routeParams.page).then(function(res){
			$scope.result=res.data;
		});
};

function getPublic($http,$routeParams,$scope)
{
	console.log(JSON.stringify($routeParams));
	//if($routeParams=={}){$routeParams='1';}
	$http.delete('/content/'+ $routeParams.id).then(function(res){
		
		$scope.result=res.data;
	});
}



angular.module('admin').controller('adminControll',adminControll);
angular.module('admin').controller('TinyMceController',TinyMceController);
angular.module('admin').controller('authController',authController);
angular.module('admin').controller('sessionController', sessionController);
angular.module('admin').controller('contentController', contentController);
angular.module('admin').controller('listController', listController);
angular.module('admin').controller('pubController', pubController);
angular.module('admin').controller('addPageController', addPageController);
angular.module('admin').controller('videoController', videoController);


function adminControll($http,$scope,ngDialog)
{


start();

function start(){
	$http.get('/menu').then(function(res){
		$scope.one=res.data;
		//console.log(JSON.stringify(res.data));
	});
	
}
	
	
	
	
	$scope.del_one=function(data){
		$scope.data=data;
		$scope.data.type="страницу";
		
		ngDialog.open({template:'views/admin/modal.html',
						scope:$scope});
						
	$scope.ok=function(){
			
		$http.delete('for_admin/del_page/'+data.page).then(function(res){
			if(res.data==true)
			{
				start();
			}
			else{console.log('error');}
			
				});
				ngDialog.close();
			}
			
	$scope.close_=function()
	{
		ngDialog.close();
	}
}
}


function authController($http,$scope,$location)
{
	
	$scope.login=function()
	{
			//console.log($scope.user);
			$http.post('/login',$scope.user).then(function(res){
				if(res.data!=null)
				{
					  $location.path('/welcome_page');
                      $location.replace();

				}
             else{

               $scope.error="An error in a password or user name";
				}
				
			});
	}
	};

	
function sessionController($http,$location,$scope)
{
	var url=$location.url();
	var new_url;
	if(url=='/'){new_url='/welcome_page'}
	
	//console.log(JSON.stringify(url));
	$http.get('/login').then(function(res){
		//console.log(res.data);
		if(!res.data)
		{
			$location.path('/');
            $location.replace();
			
		}else{
			
			$location.path(new_url);
            $location.replace();
		}
	});
	
	$scope.del_sess=function()
	{
		$http.delete('/login').then(function(res){
			if(res.data==null)
			{
				$location.path('/');
            $location.replace();
			}
		});
	}
	
}


function contentController($scope,$http,$location)
{
	 //code from DB
		$http.get('/for_admin'+$location.url()).then(function(res){
			$scope.data=res.data[0];
			});
		
	 //code from DB end
	 
	 //code from upade
	 
	 $scope.save=function(table)//можно попробовать сократить
	 {	
	 $scope.data.table=table;
    $http.put('/for_admin',$scope.data).then(function(res){
		var result={};
		if(res.data)
		{
			result.style="bg-success";
			result.text=" Публикация успешно сохранена!";
			result.image="glyphicon glyphicon-ok";
		}
		else
		{
			result.style="bg-danger";
			result.text=" Не удалось сохранить публикацию!";
			result.image="glyphicon glyphicon-remove";
		}
		$scope.result=result;
		
	});	 
	 
	 }
	 
	 //code from upade end
	 
	  $scope.getContent = function() {
    console.log('Editor content:', $scope.data.text);
  };
	 
	 
	 
	 //tiny code
	 $scope.tinymceOptions = { //можно попробовать сократить
    plugins: 'link image code',
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
	 };
	 //tiny code end
	 
};


function listController($location,$http,$scope,ngDialog)
{
	function get_list()//function get data_list
	{
	$http.get('/for_admin'+$location.url()).then(function(res){
		$scope.page=$location.url();
		$scope.items=res.data;
		console.log(JSON.stringify($scope.page));
			});
	}
	
	get_list();
			
				
			
			$scope.del_one=function(one)//function delete pub
			{
				$scope.data=one;
				$scope.data.type='публикацию';
			$scope.data.value=one.title;
				
				        ngDialog.open({template:'views/admin/modal.html',
						scope:$scope});
						
				$scope.ok=function()
				{
					$http.delete('/for_admin/'+one.id).then(function(res){
					//	console.log(res.data);
					ngDialog.close();
					get_list();
					});
					
				}
				
				$scope.close_=function()
				{
					ngDialog.close();
					get_list();
					
				}
					
						
		
			}
						
}


function pubController($http,$scope,$routeParams,Upload,$window)
{

	
	$http.get('/pub_content/'+$routeParams.id).then(function(res){//можно попробовать сократить
			$scope.data=res.data[0];
			
		//	console.log(JSON.stringify(res.data));
			});
	
	$scope.save=function(table)
	 {	

	$scope.data.name_page=$routeParams.page;
	 $scope.data.table=table;
	 
	 

	 if($scope.file)
{
	
	$scope.data.image=$scope.file.name;
	 upload($scope.file);
	 console.log($scope.file);
}
	 

	 
    $http.put('/for_admin',$scope.data).then(function(res){
		
		var result={};
		if(res.data)
		{
			result.style="bg-success";
			result.text=" Публикация успешно сохранена!";
			result.image="glyphicon glyphicon-ok";
		}
		else
		{
			result.style="bg-danger";
			result.text=" Не удалось сохранить публикацию!";
			result.image="glyphicon glyphicon-remove";
		}
		$scope.result=result;
		
		

	});	 
	 
	 }
	
	
	//tiny code можем сократить
	 $scope.tinymceOptions = {//можно попробовать сократить
    plugins: 'link image code',
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
	 };
	 //tiny code end
	 ////////////////////////////////////////////////////////////////////////////////////////////////////////////
	 
	   upload = function (file) {
        Upload.upload({
            url: './upload', 
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
            } else {
                $window.alert('an error occured');
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
           $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    };
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	 
}



function addPageController($http,$scope)
{
	$scope.new_page=function()
	{
	$http.post('/for_admin',$scope.page).then(function(res){
		console.log(res.data);
		var result={};
		if(res.data=='true')
		{
			result.style="bg-success";
			result.text=" Страница успешно создана!";
			result.image="glyphicon glyphicon-ok";
		}
		else
		{
			result.style="bg-danger";
			result.text=" Не удалось создать страницу!";
			result.image="glyphicon glyphicon-remove";
		}
		$scope.result=result;
	});
	}
}


function videoController($http,$scope,$sce,ngDialog)
{
	function start()
	{
		
	
	var scope=[];
	
	$http.get('/video').then(function(res){
		var data=res.data;
		
		for(var i=0;i<data.length;i++)
		{
			
			 data[i].video=$sce.trustAsResourceUrl(data[i].video);
			 scope.push(data[i]);
			 
			
		}
		}).then(function(){
			$scope.videos=scope;
		
		
		});
	}
	
	
	start();
		
		$scope.add=function(data)
		{
			$http.post('/for_admin/video',data).then(function(res){
				
				var result={};
		if(res.data)
		{
			result.style="bg-success";
			result.text=" Видео успешно добавлено!";
			result.image="glyphicon glyphicon-ok";
		}
		else
		{
			result.style="bg-danger";
			result.text=" Не удалось добавить видео!";
			result.image="glyphicon glyphicon-remove";
		}
		$scope.result=result;
		start();
				
			});
		}
		
		
		$scope.del=function(one)
		{
			one.type='видео';
			one.value=one.name;
			$scope.data=one;
		/*	arr=$scope
			
		if(	dialog(arr,delVideo(one,$http),ngDialog,$scope,$http)==true)
		{
			start();															ТОЖЕ подумать !!!
			console.log('The function has been complited');
		}*/
				

						 ngDialog.open({template:'views/admin/modal.html',
						scope:$scope});
						
				$scope.ok=function()
				{
					$http.get('/for_admin/video_del/'+one.id).then(function(res){
					if(res.data)
					{
					ngDialog.close();
					start();
					}
				});
				}
				
				$scope.close_=function()
				{
					ngDialog.close();
					
				}	
	
	}
}



 function TinyMceController($scope) {//...............................................tiny
  $scope.tinymceModel = 'Initial content';

  $scope.getContent = function() {
    console.log('Editor content:', $scope.tinymceModel);
  };

  $scope.setContent = function() {
    $scope.tinymceModel = 'Time: ' + (new Date());
  };

  $scope.tinymceOptions = {
    plugins: 'link image code',
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
  };
};//.........................................///////////////////////////////////......tiny


/*function dialog(data,act,ngDialog,$scope,$http)
{
	 ngDialog.open({template:'views/admin/modal.html',
						scope:data});
						
		$scope.ok=function(){return act}
			
	$scope.close_=function()
	{																									Подумать!!!
		ngDialog.close();
	}
	
	//return $scope.ok;
	console.log(ok);
}

function delVideo(val,$http)
{
	var query=$http.get('/for_admin/video_del/'+val.id).then(function(res){
		if(res.data)
		{
			return true;
		}
	});
	//return query;
	console.log(query);
}*/