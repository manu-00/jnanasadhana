'use strict';

var myApp=angular.module('myApp.store', ['ngRoute']);
var tkn=localStorage.getItem("token");
console.log(tkn);
myApp.run(function($http){
  $http.defaults.headers.common.Authorization=tkn;
});


myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/store', {
    templateUrl: 'store/store.html',
    controller: 'storeCtrl'
  });
}]);

myApp.controller('storeCtrl', ['$scope','storeService',function($scope,storeService) {


  ////////////////////////////////////// language section ///////////////////////////////////////////////////////
getallLangs();
$scope.langs=[];
function  getallLangs(){
  storeService.getallLangs().then(function(response){
   angular.forEach(response.data,function(value){
     $scope.langs.push({languageId:value.languageId,languageName:value.languageName,description:value.description,
    createdDate:value.insertedDate,updatedDate:value.updatedDate,createdBy:value.createdBy,
    updatedBy:value.updatedBy})
   });
   console.log($scope.langs);
  });
}  
$scope.lang={
  languageName:"",description:"",languageId:""
}
$scope.editLang= function(x){
  $scope.lang.languageName=x.languageName;
  $scope.lang.description=x.description;
  $scope.lang.languageId=x.languageId;
}
$scope.deleteLang= function(x){
  storeService.deleteLang(x).then(function(response){
    window.alert("deleted");
  });
}
$scope.clearLang= function(){
  $scope.lang.languageName="";
  $scope.lang.description="";
  $scope.lang.languageId="";
}
$scope.addLang= function(){
  storeService.addLang($scope.lang).then(response,function(){
    console.log(response.data);
    if(response.status==201){
      window.alert("success");
    }
    else{
      window.alert("failed");
    }
  });
}
////////////////////////////////////// end of language section ///////////////////////////////////////////////



}]);

