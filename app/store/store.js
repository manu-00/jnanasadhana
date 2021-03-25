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

    swal({
      title: "Are you sure?",
      // text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          storeService.deleteCat($scope.cat).then(function (response) {
            $scope.pageChangeC();
            swal("deleted!", {
              icon: "success",
            });
            $scope.loadCategory();
          });
          // else {
          //   swal("Your imaginary file is safe!");
          // }
        }
      });
  }
  $scope.clearCat = function () {
    $scope.cat.categoryName = "";
    $scope.cat.description = "";
    $scope.cat.categoryId = "";
  }
  $scope.addCat = function () {
    storeService.addCat($scope.cat).then(function (response) {
      $scope.pageChangeC();
      if (response.data.responseCode == 201) {
        swal("Done!", "", "success");
      }
      else {
        swal("Failed!", "", "warning");
      }
      $scope.loadCategory();
    });
  }
  $scope.loadCategory = function () {
    $scope.catsection = true; $scope.catpop = $scope.bomag = $scope.bomagpop = false;
  }
  $scope.addCategory = function () {
    $scope.catpop = $scope.addcatbtn = true; $scope.catsection = $scope.catedit = false;
  }
  $scope.closeCategory = function () {
    $scope.catpop = false; $scope.catsection = true;
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
    });
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

    swal({
      title: "Are you sure?",
      // text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          storeService.deletebooks($scope.book).then(function (response) {
            $scope.pageChangeB();
            swal("deleted!", {
              icon: "success",
            });
            $scope.loadMag();
          });
        }
        // else {
        //   swal("Your imaginary file is safe!");
        // }
      });
  }
  $scope.clearbooks = function () {
    $scope.book.magazineCourseName = "";
    $scope.book.description = "";
    $scope.book.magazineCourseId = "";
  }
  $scope.addbooks = function () {
    storeService.addbooks($scope.book).then(function (response) {
      $scope.pageChangeB();
      if (response.data.responseCode == 201) {
        swal("Done!", "", "success");
      }
      else {
        swal("Failed!", "", "warning");
      }
      $scope.loadMag();
    });
  }
  $scope.loadMag = function () {
    $scope.bomag = true; $scope.bomagpop = $scope.catsection = $scope.catpop = false
  }
  $scope.addMag = function () {
    $scope.bomagpop = $scope.addbomagbtn = true; $scope.bomag = $scope.boma = $scope.bomagedit = false
  }
  $scope.closeMag = function () {
    $scope.bomagpop = false; $scope.bomag = true
  }
}]);
