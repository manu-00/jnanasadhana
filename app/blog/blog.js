'use strict';

var myApp=angular.module('myApp.blog', ['ngRoute','angularUtils.directives.dirPagination'])
var tkn=localStorage.getItem("token");
  myApp.run(function($http) {
    $http.defaults.headers.common.Authorization = tkn;
  }); 
  
myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/blog', {
    templateUrl: 'blog/blog.html',
    controller: 'blogCtrl'
  });
}])

myApp.controller('blogCtrl', ['$scope','blogService', function($scope,blogService) {
  $scope.blog={
    title:"",
    description:"",
    uploadedBy:"user",
 
};

//Edit blog
$scope.editblog = function(x)
{
  console.log(x);
 $scope.blog.name = x.name;
 $scope.blog.phoneNumber = x.phoneNumber;
 $scope.blog.emailId = x.emailId;
 $scope.blog.role = x.role;
 $scope.blog.blogId = x.blogId;
}

$scope.clearForm = function(x)
{
 $scope.blog.title = "";
 $scope.blog.description = "";
}

//Get ALl blogs
getAllblogs()
$scope.blogs=[];
function getAllblogs()
{
  blogService.getAllblogs().then(function(response){
    angular.forEach(response.data.posts,function(value,index){
      $scope.blogs.push({createdAt:value.createdAt,description:value.description,
        title:value.title,uploadedBy:value.uploadedBy,keywords:value.keywords,blogId:value._id})
    })
    console.log($scope.blogs);

})
}
// Add Elements

$scope.addblogs = function()
{  
  console.log($scope.blog);
  blogService.addblogs($scope.blog).then(function(response){
    console.log(response.status);

    if(response.data.responseCode == 201)
    {
      window.alert("success");
       getAllblogs();
     }else
    {
      window.alert(response.data.message);
    }
  })
}
$scope.deleteblog=function(x)
{
  blogService.deleteblog(x).then(function(response){
    console.log(response);

  })
}



}]);