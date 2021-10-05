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

myApp.directive('fileModel', ['$parse', function ($parse) {
  return {
     restrict: 'A',
     link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;
        
        element.bind('change', function() {
           scope.$apply(function() {
              modelSetter(scope, element[0].files[0]);
           });
        });
     }
  };
}]);

myApp.directive('buttonSpinner', function ($compile) {
  return {
      restrict: 'A',
      scope: {
          spinning: '=buttonSpinner',
          spinningIcon: '@?',
          buttonPrepend: '@?',
          buttonAppend: '@?'
      },
      transclude: true,
      template: 
      "<span ng-if=\"!!buttonPrepend\" ng-hide=\"spinning\"><i class=\"{{ buttonPrepend }}\"></i>&nbsp;</span>" +
      "<span ng-if=\"!!buttonPrepend\" ng-show=\"spinning\"><i class=\"{{ !!spinningIcon ? spinningIcon : 'fa fa-spinner fa-spin' }}\"></i>&nbsp;</span>" +
      "<ng-transclude></ng-transclude>" +
      "<span ng-if=\"!!buttonAppend\" ng-hide=\"spinning\">&nbsp;<i class=\"{{ buttonAppend }}\"></i></span>" +
      "<span ng-if=\"!buttonPrepend\" ng-show=\"spinning\">&nbsp;<i class=\"{{ !!spinningIcon ? spinningIcon : 'fa fa-spinner fa-spin' }}\"></i></span>"
  }
});

myApp.controller('dailyCtrl', ['$scope','appService',function($scope,appService) {


  //////////////////////////////////////daily magazine section ///////////////////////////////////////////////////////

////////////////pagination////////////////////
$scope.MagazinePageSize=2;
$scope.MagazinePageIndex=0;
$scope.MagazineMaxSize=6;
$scope.MagazineTotalItems=0;
$scope.MagazineNumPages="";
// $scope.pagesizeSelected="";

$scope.magazines=[];
getallDailyMagazines();
function getallDailyMagazines(){
  $scope.magazines=[];
  appService.getallDailyMagazines($scope.MagazinePageIndex,$scope.MagazinePageSize).then(function(response){
    // console.log(response.data.content);
   angular.forEach(response.data.content,function(value){
     console.log(value.filePath);
    $scope.magazines.push({magazineId:value.magazineId,magazineName:value.magazineName,
    description:value.description,position:value.position,fileName:value.fileName,filePath:value.filePath,
    createdDate:value.insertedDate,updatedDate:value.updatedDate,createdBy:value.createdBy.userName,
    updatedBy:value.updatedBy.userName});
    $scope.MagazineTotalItems=response.data.totalElements;
    $scope.MagazineNumPages=response.data.totalPages;
    console.log($scope.magazines);
   });
  });
} 

$scope.MagazineChangePageSize = function(){
  $scope.MagazinePageIndex=0;
  getallDailyMagazines();
}

$scope.MagazinePageChange =function (){
  $scope.MagazinePageIndex=$scope.MagazinePageIndex-1;
  getallDailyMagazines($scope.MagazinePageIndex,$scope.MagazinePageSize);
  $scope.MagazinePageIndex=$scope.MagazinePageIndex+1;
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
  magazineName: "",
  magazineId:"",
  fileName:"",
  filePath:"",
  position:""
};

$scope.editDailyMagazine=function(x){
  $scope.magazine.magazineName=x.magazineName;
  $scope.magazine.description=x.description;
  $scope.magazine.magazineId=x.magazineId;
  $scope.magazine.position=x.position;
  $scope.magazine.filePath=x.filePath;
  $scope.magazine.fileName=x.fileName;
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
      appService.deleteDailyMagazine($scope.magazine).then(function(){
        $scope.MagazinePageChange();
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
  $scope.magazine.magazineName="";
  $scope.magazine.description="";
  $scope.magazine.magazineId="";
  $scope.magazine.position="";
  $scope.magazine.filePath="";
  $scope.magazine.fileName="";
}
$scope.addDailyMagazine= function(){
  // console.log($scope.magazine.filePath);
  appService.addDailyMagazine($scope.magazine).then(function(response){
    $scope.MagazinePageChange();
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
  $scope.dailymagazine=true;$scope.dailymagazinepop=$scope.magCoursepop=$scope.magCourse=false;
}
$scope.closeDailyMagazine=function(){
  $scope.dailymagazinepop=false;$scope.dailymagazine=true
}

$scope.myFile="";
$scope.loading = false;
$scope.uploadFile=function(){
  $scope.magazine.fileName="";
  console.log($scope.myFile.name);
  var file_extension = $scope.myFile.name.split('.').pop().toLowerCase();
  if(file_extension=="pdf")
  {
   $scope.loading = true; 
   return appService.uploadFile($scope.myFile).then(function({data}){
      $scope.magazine.fileName=data.fileName;
      console.log(data.fileDownloadUri);
      $scope.magazine.filePath=data.fileDownloadUri;
      console.log($scope.magazine.filePath);  
      $scope.loading = false;
     });
  }else{
    return swal("Only PDF's !", "", "warning");
  }
}


///////////////adobe////////////////////////////

$scope.previewFile=function(TheFilePath,TheFileName){

  console.log(TheFilePath);
  console.log(TheFileName);

  const viewerConfig = {
    embedMode: "LIGHT_BOX"
  };
  
  document.addEventListener("adobe_dc_view_sdk.ready", function () {
    document.getElementById("view-pdf-btn").disabled = false;
  });
  
    var adobeDCView = new AdobeDC.View({
        clientId: "2c382dd23cd2483baef37ff1ec5ba7e5"
    });
  
    adobeDCView.previewFile({
        content: {
            location: {
                url: "https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/file/downloadFile/?filePath="+TheFilePath,
                /*
                If the file URL requires some additional headers, then it can be passed as follows:-
                header: [
                    {
                        key: "<HEADER_KEY>",
                        value: "<HEADER_VALUE>",
                    }
                ]
                */
            },
        },
        metaData: {
            fileName: TheFileName
        }
    }, viewerConfig);
  

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
    appService.getallMagazineCourses($scope.spageIndex,$scope.spageSize).then(function(response){
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
        appService.deleteMagazineCourse($scope.magazineCourse).then(function(){
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
    appService.addMagazineCourse($scope.magazineCourse).then(function(response){
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

