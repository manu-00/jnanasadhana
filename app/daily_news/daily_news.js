'use strict';

var myApp=angular.module('myApp.daily_news', ['ngRoute','ui.bootstrap']);
var tkn=localStorage.getItem("token");
var usId=localStorage.getItem("userId");
console.log(tkn);
myApp.run(function($http){
  $http.defaults.headers.common.Authorization=tkn;
});


myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/daily_news', {
    templateUrl: 'daily_news/daily_news.html',
    controller: 'dailyCtrl'
  });
}]);

myApp.controller('dailyCtrl', ['$scope','dailyService',function($scope,dailyService) {


console.log(usId);

  //////////////////////////////////////daily magazine section ///////////////////////////////////////////////////////

////////////////pagination////////////////////
$scope.pageSize=2;
$scope.pageIndex=0;
$scope.maxSize=6;
$scope.totalItemsL=0;
$scope.numPagesL="";
// $scope.pagesizeSelected="";

$scope.magazines=[];
getallDailyMagazines();
function getallDailyMagazines(){
  $scope.magazines=[];
  dailyService.getallDailyMagazines($scope.pageIndex,$scope.pageSize).then(function(response){
    console.log(response.data.content);
   angular.forEach(response.data.content,function(value){
     $scope.magazines.push({languageId:value.languageId,languageName:value.languageName,description:value.description,
    createdDate:value.insertedDate,updatedDate:value.updatedDate,createdBy:value.createdBy.userName,
    updatedBy:value.updatedBy.userName});
    $scope.totalItemsL=response.data.totalElements;
    $scope.numPagesL=response.data.totalPages;
   });
   console.log($scope.totalItemsL);
console.log($scope.numPagesL);

   console.log($scope.langs);
  });
} 
// console.log($scope.totalItemsL);
// console.log($scope.numPagesL);

$scope.changePageSize = function(){
  $scope.pageIndex=0;
  getallDailyMagazines();
}

$scope.pageChange =function (){
  $scope.pageIndex=$scope.pageIndex-1;
  getallDailyMagazines($scope.pageIndex,$scope.pageSize);
  $scope.pageIndex=$scope.pageIndex+1;
}


///////////////end of pagination///////////////////
$scope.magazine={
  createdBy: {
    userId: usId
  },
  updatedBy: {
    userId: usId
  },
  description: "",
  languageName: "",
  languageId:""
};

$scope.editDailyMagazine=function(x){
  $scope.magazine.languageName=x.languageName;
  $scope.magazine.description=x.description;
  $scope.magazine.languageId=x.languageId;
  console.log($scope.magazine);
}
$scope.deleteDailyMagazine= function(){
  swal({
    title: "Are you sure?",
    // text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      dailyService.deleteDailyMagazine($scope.lang).then(function(){
        $scope.pageChange();
        swal("deleted!", {
          icon: "success",
        });
        $scope.loadDailyMagazine();
      }); 
    }
     
    // else {
    //   swal("Your imaginary file is safe!");
    // }
  });
  
}
$scope.clearDailyMagazine= function(){
  $scope.magazine.languageName="";
  $scope.magazine.description="";
  $scope.magazine.languageId="";
  // console.log($scope.magazine);
}
$scope.addDailyMagazine= function(){
  dailyService.addDailyMagazine($scope.lang).then(function(response){
    $scope.pageChange();
    if(response.data.responseCode==201){
      swal("Done!", "", "success");
    }
    else{
      swal("Failed!", "", "warning");
    }
    $scope.loadDailyMagazine();
  });

}
$scope.addDailyMag=function(){
  $scope.dailymagazinepop=$scope.addmagazinebtn=true;$scope.dailymagazine=$scope.dailymagdelete=$scope.dailymagedit=false
}
$scope.loadDailyMagazine=function(){
  $scope.dailymagazine=true;$scope.dailymagazinepop=$scope.stat=$scope.statepop=false;
}
$scope.closeDailyMagazine=function(){
  $scope.dailymagazinepop=false;$scope.dailymag=true
}

////////////////////////////////////// end of daily magazine section ///////////////////////////////////////////////


  ////////////////////////////////////// magazine course section ///////////////////////////////////////////////////////

  ////////////////////////////////pagination////////////////////////////////
$scope.spageSize=2;
$scope.spageIndex=0;
$scope.smaxSize=4;
$scope.totalItemsS=0;
$scope.numPagesS="";
 
  $scope.magazineCourses=[];
  getallMagazineCourses();
  function  getallMagazineCourses(){
    $scope.magazineCourses=[];
    dailyService.getallMagazineCourses($scope.spageIndex,$scope.spageSize).then(function(response){
     angular.forEach(response.data.content,function(value){
       $scope.magazineCourses.push({magazineCourseId:value.magazineCourseId,magazineCourseName:value.magazineCourseName,description:value.description,
      cost:value.cost,discount:value.discount,handlingFee:value.handlingFee,position:value.position,trailPeriod:value.trailPeriod,subscription:value.subscription,
      createdDate:value.insertedDate,updatedDate:value.updatedDate,createdBy:value.createdBy.userName,updatedBy:value.updatedBy.userName});
       $scope.totalItemsS=response.data.totalElements;
       $scope.numPagesS=response.data.totalPages;
     });
     console.log($scope.magazineCourses);
    });
  }  
  


  $scope.changePageSizeS = function(){
    $scope.spageIndex=0;
    getallMagazineCourses();
  }

  $scope.pagechangeS = function(){
    $scope.spageIndex=$scope.spageIndex-1;
    getallMagazineCourses($scope.spageIndex,$scope.spageSize);
    $scope.spageIndex=$scope.spageIndex+1;
  }
  ////////////////////end of pagination//////////////////////////////////////
  $scope.magazineCourse={
    createdBy: {
      userId: usId
    },
    updatedBy: {
      userId: usId
    },
    description: "",
    magazineCourseName: "",
    magazineCourseId:"",
    cost:"",
    discount:"",
    handlingFee:"",
    position:"",
    trailPeriod:"",
    subscription:""
  };
  $scope.editMagazineCourse= function(x){
    $scope.magazineCourse.magazineCourseName=x.magazineCourseName;
    $scope.magazineCourse.description=x.description;
    $scope.magazineCourse.cost=x.cost;
    $scope.magazineCourse.discount=x.discount;
    $scope.magazineCourse.handlingFee=x.handlingFee;
    $scope.magazineCourse.position=x.position;
    $scope.magazineCourse.trailPeriod=x.trailPeriod;
    $scope.magazineCourse.subscription=x.subscription;
    $scope.magazineCourse.magazineCourseId=x.magazineCourseId;
  }
  $scope.deleteMagazineCourse = function(){
    swal({
      title: "Are you sure?",
      // text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        dailyService.deleteMagazineCourse($scope.magazineCourse).then(function(){
          $scope.pagechangeS();
          swal("deleted!", {
            icon: "success",
          });
          $scope.loadMagazineCourse();
        });
      } 
      // else {
      //   swal("Your imaginary file is safe!");
      // }
    });
    
  }
  $scope.clearMagazineCourse= function(){
    $scope.magazineCourse.magazineCourseName="";
    $scope.magazineCourse.description="";
    $scope.magazineCourse.cost="";
    $scope.magazineCourse.discount="";
    $scope.magazineCourse.handlingFee="";
    $scope.magazineCourse.position="";
    $scope.magazineCourse.trailPeriod="";
    $scope.magazineCourse.subscription="";
    $scope.magazineCourse.magazineCourseId="";
  }
  $scope.addMagazineCourse= function(){
    dailyService.addMagazineCourse($scope.magazineCourse).then(function(response){
      $scope.pagechangeS();
      if(response.data.responseCode==201){
        swal("Done!", "", "success");
      }
      else{
        swal("Failed!", "", "warning");
      }
      $scope.loadMagazineCourse();
    });
  }
  $scope.loadMagazineCourse= function(){
    $scope.magCourse=true;$scope.magCoursepop=$scope.dailymagazine=$scope.dailymagazinepop=false;
  }
  $scope.addMagCourse= function(){
    $scope.magCoursepop=$scope.addmagCoursebtn=true;$scope.magCourse=$scope.magCourseedit=$scope.magCoursedelete=false
  }
  $scope.closeMagazineCourse=function(){
    $scope.magCoursepop=false;$scope.magCourse=true
  }
  ////////////////////////////////////// end of state section ///////////////////////////////////////////////


}]);

