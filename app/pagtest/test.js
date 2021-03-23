
'use strict';

var myApp=angular.module('myApp.pagtest', ['ngRoute']);
var tkn=localStorage.getItem("token");
var usId=localStorage.getItem("userId");
console.log(tkn);
myApp.run(function($http){
  $http.defaults.headers.common.Authorization=tkn;
});


myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pag', {
    templateUrl: 'pagtest/test.html',
    controller: 'StudentCtrl'
  });
}]);

myApp.controller('StudentCtrl', function ($scope, $http) {

       $scope.maxSize = 5;     // Limit number for pagination display number.
       $scope.totalCount = 0;  // Total number of items in all pages. initialize as a zero
       $scope.pageIndex = 0;   // Current page number. First page is 1.-->
       $scope.pageSize= 5;
    //    $scope.pageSizeSelected1 = "false";
    //    $scope.mobileNumber = "";
       $scope.numPages=0;

     function getEmployeeList () {
        $http.get("https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/language/v1/getAllLanguageByPagination/{pageNumber}/{pageSize}?pageNumber="+$scope.pageIndex+"&pageSize="+$scope.pageSize).then(
                       function (response) {
                           $scope.Students = response.data.content;
                           $scope.totalCount = response.data.totalElements;
                           console.log($scope.totalCount);
                       },
                       function (err) {
                           var error = err;
                       });
    }

    //Loading Students list on first time
    getEmployeeList();

    //This method is calling from pagination number
    $scope.pageChanged = function () {
        getEmployeeList();
    };

    //This method is calling from dropDown
    $scope.changePageSize = function () {
        $scope.pageIndex = 0;
       getEmployeeList();
    };

});
