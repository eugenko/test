angular.module('app',['ngRoute','contenteditable']);

angular.module('app').config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl:'views/head.html'
	}).when('/page/main',{
		templateUrl:'views/head.html'
	})
	.when('/page/video',{
		templateUrl: 'views/video.html'
	})
	.when('/page/:page',{
		templateUrl: 'views/main.html'
	})
	.when('/public/:id',{
		templateUrl: 'views/show.html'
	})
	.otherwise({
        redirectTo: '/'
	});
	
});

angular.module('admin',['ngRoute', 'ui.tinymce','ngFileUpload','ngDialog']);

angular.module('admin').config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl:'views/admin/auth.html'
	})
	.when('/welcome_page',{
		templateUrl:'views/admin/main_admin.html'
	})
	.when('/main',{
			templateUrl:'views/admin/redact_main.html'
		})
		.when('/video',{
		templateUrl:'views/admin/red_video.html'
	})
		.when('/add_page',{		
		templateUrl:'views/admin/new_page.html'	
		})
	.when('/:page',{		
		templateUrl:'views/admin/list.html'	
		})
		.when('/edit/:page/:id',{		
		templateUrl:'views/admin/redact.html'	
		})
		.when('/add/:page',{		
		templateUrl:'views/admin/redact.html'	
		})
		.otherwise({
		redirectTo:'/'
	});
});
