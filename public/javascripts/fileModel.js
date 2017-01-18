angular.module('admin').directive('uploadDirective',uploadDirective);

function uploadDirective($parse)
{
	return{
		
		restrict: 'A',
		link:function(scope, element, attrs)
		{
			var model=$parse(attrs.fileModel);
			var modelSetters=model.assign;
			
			element.bind('change',function(){
				scope.$apply(function(){
					modelSetters(scope,element[0].files[0]);
				})
			});//$scope.data.image;
		}
	}
	
}