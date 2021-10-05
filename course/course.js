'use strict';

var myApp=angular.module('myApp.course', ['ngRoute','ui.bootstrap']);
var tkn=localStorage.getItem("token");
var usId=localStorage.getItem("userId");
console.log(tkn);
myApp.run(function($http){
  $http.defaults.headers.common.Authorization=tkn;
});


myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/course', {
    templateUrl: 'course/course.html',
    controller: 'courseCtrl'
  });
}]);

myApp.controller('courseCtrl', ['$scope','appService',function($scope,appService) {


console.log(usId);

  //////////////////////////////////////course section ///////////////////////////////////////////////////////

////////////////pagination////////////////////


$scope.CoursePageSize=2;
$scope.CoursePageIndex=0;
$scope.CourseMaxSize=6;
$scope.CourseTotalItems=0;
$scope.CourseNumPages="";
// $scope.pagesizeSelected="";

$scope.courses=[];
getallCourses();
function getallCourses(){
  $scope.courses=[];
  appService.getallCourses($scope.CoursePageIndex,$scope.CoursePageSize).then(function(response){
    console.log(response.data.content);
   angular.forEach(response.data.content,function(value){
     $scope.courses.push({courseId:value.courseId,courseName:value.courseName,description:value.description,
      courseMrp:value.courseMrp,discount:value.discount,handlingFee:value.handlingFee,position:value.position,
      trailPeriod:value.trailPeriod,subscription:value.subscription,createdDate:value.insertedDate,
      updatedDate:value.updatedDate,createdBy:value.createdBy.userName,updatedBy:value.updatedBy.userName});
    $scope.CourseTotalItems=response.data.totalElements;
    $scope.CourseNumPages=response.data.totalPages;
   });
   console.log($scope.CourseTotalItems);
   console.log($scope.CourseNumPages);
   console.log($scope.courses);
  });
} 
// console.log($scope.totalItemsL);
// console.log($scope.numPagesL);

$scope.CourseChangePageSize = function(){
  $scope.CoursePageIndex=0;
  getallCourses();
}

$scope.CoursePageChange =function (){
  $scope.CoursePageIndex=$scope.CoursePageIndex-1;
  getallCourses($scope.CoursePageIndex,$scope.CoursePageSize);
  $scope.CoursePageIndex=$scope.CoursePageIndex+1;
}


///////////////end of pagination///////////////////
$scope.course={
  createdBy: {
    userId: usId
  },
  updatedBy: {
    userId: usId
  },
  courseMrp: 0,
  courseName: "",
  description: "",
  discount: 0,
  handlingFee: 0,
  position: 0,
  subscription: "",   //LifeTime (non editable)
  trailPeriod: 0
};

$scope.editCourse=function(x){
  $scope.course.courseMrp=x.courseMrp,
  $scope.course.courseName=x.courseName,
  $scope.course.description=x.description,
  $scope.course.discount=x.discount,
  $scope.course.handlingFee=x.handlingFee,
  $scope.course.position=x.position,
  $scope.course.subscription=x.subscription,   //LifeTime (non editable)
  $scope.course.trailPeriod=x.trailPeriod,
  $scope.course.courseId=x.courseId
}
$scope.deleteCourse= function(){
  swal({
    title: "Are you sure?",
    // text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      appService.deleteCourse($scope.course).then(function(){
        $scope.CoursePageChange();
        swal("deleted!", {
          icon: "success",
        });
        $scope.loadCourses();
      }); 
    }
     
    // else {
    //   swal("Your imaginary file is safe!");
    // }
  });
  
}
$scope.clearCourse= function(){
  $scope.course.courseMrp='',
  $scope.course.courseName='',
  $scope.course.description='',
  $scope.course.discount='',
  $scope.course.handlingFee='',
  $scope.course.position='',
  $scope.course.subscription='',   //LifeTime (non editable)
  $scope.course.trailPeriod='',
  $scope.course.courseId=''
}
$scope.addTheCourse= function(){
  appService.addTheCourse($scope.course).then(function(response){
    $scope.CoursePageChange();
    if(response.data.responseCode==201){
      swal("Done!", "", "success");
    }
    else{
      swal("Failed!", "", "warning");
    }
    $scope.loadCourses();
  });

}
$scope.addCourse=function(){
  $scope.coursepop=$scope.addcoursebtn=true;$scope.courseShow=$scope.coursedelete=$scope.courseedit=false
}
$scope.loadCourses=function(){
  $scope.courseShow=true;$scope.coursepop=$scope.moduleSection=$scope.modulepop=false;
}
$scope.closeCourse=function(){
  $scope.coursepop=false;$scope.courseShow=true
}

////////////////////////////////////// end of course section ///////////////////////////////////////////////


  ////////////////////////////////////// module section ///////////////////////////////////////////////////////

  ////////////////////////////////pagination////////////////////////////////
$scope.modulePageSize=2;
$scope.modulePageIndex=0;
$scope.moduleMaxSize=4;
$scope.moduleTotalItems=0;
$scope.moduleNumPages="";
 
  $scope.modules=[];
  getallModules();
  function  getallModules(){
    $scope.modules=[];
    appService.getallModules($scope.modulePageIndex,$scope.modulePageSize).then(function(response){
     angular.forEach(response.data.content,function(value){
      $scope.modules.push({moduleId:value.moduleId,moduleName:value.moduleName,description:value.description,
      position:value.position,createdDate:value.insertedDate,updatedDate:value.updatedDate,
      createdBy:value.createdBy.userName,updatedBy:value.updatedBy.userName});
       $scope.moduleTotalItems=response.data.totalElements;
       $scope.moduleNumPages=response.data.totalPages;
     });
     console.log($scope.modules);
    });
  }  
  


  $scope.moduleChangePageSize = function(){
    $scope.modulePageIndex=0;
    getallModules();
  }

  $scope.modulePageChange = function(){
    $scope.modulePageIndex=$scope.modulePageIndex-1;
    getallModules($scope.modulePageIndex,$scope.modulePageSize);
    $scope.modulePageIndex=$scope.modulePageIndex+1;
  }
  ////////////////////end of pagination//////////////////////////////////////
  $scope.module={
    createdBy: {
      userId: usId
    },
    updatedBy: {
      userId: usId
    },
    description: "",
    moduleName: "",
    moduleId:"",
    position:""
  };
  $scope.editmodule= function(x){
    $scope.module.moduleName=x.moduleName;
    $scope.module.description=x.description;
    $scope.module.moduleId=x.moduleId;
    $scope.module.position=x.position
  }
  $scope.deletemodule= function(){
    swal({
      title: "Are you sure?",
      // text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        appService.deletemodule($scope.module).then(function(response){
          $scope.modulePageChange();
          swal("deleted!", {
            icon: "success",
          });
          $scope.loadModules();
        });
      } 
      // else {
      //   swal("Your imaginary file is safe!");
      // }
    });
    
  }
  $scope.clearmodule= function(){
    $scope.module.moduleName="";
    $scope.module.description="";
    $scope.module.moduleId="";
    $scope.module.position=""
  }
  $scope.addThemodule= function(){
    appService.addThemodule($scope.module).then(function(response){
      $scope.modulePageChange();
      if(response.data.responseCode==201){
        swal("Done!", "", "success");
      }
      else{
        swal("Failed!", "", "warning");
      }
      $scope.loadModules();
    });
  }
  $scope.loadModules= function(){
    $scope.moduleSection=true;$scope.modulepop=$scope.courseShow=$scope.coursepop=false
  }
  $scope.addmodule= function(){
    $scope.modulepop=$scope.addmodulebtn=true;$scope.moduleSection=$scope.moduleedit=$scope.moduledelete=false
  }
  $scope.closemodule=function(){
    $scope.modulepop=false;$scope.moduleSection=true
  }
  ////////////////////////////////////// end of module section ///////////////////////////////////////////////
}]);

