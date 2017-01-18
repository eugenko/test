angular.module('app').directive('textDirective',textDirective);


function textDirective()
{
		return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attrs, ngModel) {

            function read() {
                // view -> model
                var html = element.html();
                html = html.replace(/&nbsp;/g, "\u00a0");
                ngModel.$setViewValue(html);
            }
            // model -> view
            ngModel.$render = function() {
                element.html(ngModel.$viewValue || "");
            };

            }

}
}



angular.module('admin').directive('ngFiles', ['$parse', function ($parse) {

            function fn_link(scope, element, attrs) {
                var onChange = $parse(attrs.ngFiles);
                element.on('change', function (event) {
                    onChange(scope, { $files: event.target.files });
                });
            };

            return {
                link: fn_link
            }
        } ])