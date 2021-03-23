'use strict';

var myApp = angular.module('myApp.store', ['ngRoute']);
var tkn = localStorage.getItem("token");
var usId = localStorage.getItem("userId");
console.log(usId);
console.log(tkn);
myApp.run(function ($http) {
  $http.defaults.headers.common.Authorization = tkn;
});


myApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/store', {
    templateUrl: 'store/store.html',
    controller: 'storeCtrl'
  });
}]);

myApp.controller('storeCtrl', ['$scope', 'storeService', function ($scope, storeService) {


  ////////////////////////////////////// Category section ///////////////////////////////////////////////////////

  ///////////////////////////pagination///////////////////////
  $scope.pageIndexC = 0;
  $scope.pageSizeC = 2;
  $scope.totalItemsC = "";

  getallCategory();
  $scope.cats = [];
  function getallCategory() {
    $scope.cats = [];
    storeService.getallCategory($scope.pageIndexC, $scope.pageSizeC).then(function (response) {
      angular.forEach(response.data.content, function (value) {
        $scope.cats.push({
          categoryId: value.categoryId, categoryName: value.categoryName, description: value.description,
          createdDate: value.insertedDate, updatedDate: value.updatedDate, createdBy: value.createdBy.userName,
          updatedBy: value.updatedBy.userName
        });
        $scope.totalItemsC = response.data.totalElements;
      });
      console.log($scope.cats);
    });
  }
  $scope.changePageSizeC = function () {
    $scope.pageIndexC = 0;
    getallCategory($scope.pageIndexC, $scope.pageSizeC);
  }
  $scope.pageChangeC = function () {
    $scope.pageIndexC = $scope.pageIndexC - 1;
    getallCategory($scope.pageIndexC, $scope.pageSizeC);
    $scope.pageIndexC = $scope.pageIndexC + 1;
  }
  //////////////////////////////end pagination///////////
  $scope.cat = {
    categoryName: "",
    createdBy: {
      userId: usId
    },
    updatedBy: {
      userId: usId
    },
    categoryId: "",
    description: ""
  }
  $scope.editCat = function (x) {
    $scope.cat.categoryName = x.categoryName;
    $scope.cat.description = x.description;
    $scope.cat.categoryId = x.categoryId;
  }
  $scope.deleteCat = function () {
    storeService.deleteCat($scope.cat).then(function (response) {
      window.alert("deleted");
    });
  }
  $scope.clearCat = function () {
    $scope.cat.categoryName = "";
    $scope.cat.description = "";
    $scope.cat.categoryId = "";
  }
  $scope.addCat = function () {
    storeService.addCat($scope.cat).then(function (response) {
      console.log(response.data);
      if (response.data.responseCode == 201) {
        window.alert("success");
      }
      else {
        window.alert("failed");
      }
    });
  }
  ////////////////////////////////////// end of category section //////////////////////////////////////////////

  ////////////////////////////////////////  Book / Magazine Start  ////////////////////////////////////////////

  /////////////////////pagination//////////////
  $scope.pageIndexB = 0;
  $scope.pageSizeB = 2;
  $scope.totalItemsB = "";
  $scope.books = [];
  getallMagazine();
  function getallMagazine() {
    $scope.books = [];
    storeService.getallMagazine($scope.pageIndexB, $scope.pageSizeB).then(function (response) {
      angular.forEach(response.data.content, function (value) {
        $scope.books.push({
          magazineCourseId: value.magazineCourseId, magazineCourseName: value.magazineCourseName, description: value.description, createdDate: value.insertedDate, updatedDate: value.updatedDate, createdBy: value.createdBy.userName,
          updatedBy: value.updatedBy.userName
        });
        $scope.totalItemsB = response.data.totalElements;
      });
      console.log($scope.books);
    })
  }
  $scope.changePageSizeB = function () {
    $scope.pageIndexB = 0;
    getallMagazine($scope.pageIndexB, $scope.pageSizeB);
  }
  $scope.pageChangeB = function () {
    $scope.pageIndexB = $scope.pageIndexB - 1;
    getallMagazine($scope.pageIndexB, $scope.pageSizeB);
    $scope.pageIndexB = $scope.pageIndexB + 1;
  }

  //////////////end pagination///////////////
  $scope.book = {
    magazineCourseName: "",
    createdBy: {
      userId: usId
    },
    updatedBy: {
      userId: usId
    },
    magazineCourseId: "",
    description: ""
  }
  $scope.editbooks = function (x) {
    $scope.book.magazineCourseName = x.magazineCourseName;
    $scope.book.description = x.description;
    $scope.book.magazineCourseId = x.magazineCourseId;
  }
  $scope.deletebooks = function () {
    storeService.deletebooks($scope.book).then(function (response) {
      window.alert("deleted");
    });
  }
  $scope.clearbooks = function () {
    $scope.book.magazineCourseName = "";
    $scope.book.description = "";
    $scope.book.magazineCourseId = "";
  }
  $scope.addbooks = function () {
    storeService.addbooks($scope.book).then(function (response) {
      console.log(response.data);
      if (response.data.responseCode == 201) {
        window.alert("success");
      }
      else {
        window.alert("failed");
      }
    });
  }
}]);
