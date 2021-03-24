'use strict';

var myApp=angular.module('myApp.master', ['ngRoute','ui.bootstrap']);
var tkn=localStorage.getItem("token");
var usId=localStorage.getItem("userId");
console.log(tkn);
myApp.run(function($http){
  $http.defaults.headers.common.Authorization=tkn;
});


myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/master', {
    templateUrl: 'master/master.html',
    controller: 'masterCtrl'
  });
}]);

myApp.controller('masterCtrl', ['$scope','masterService',function($scope,masterService) {


console.log(usId);

  ////////////////////////////////////// language section ///////////////////////////////////////////////////////

////////////////pagination////////////////////


$scope.pageSize=2;
$scope.pageIndex=0;
$scope.maxSize=6;
$scope.totalItemsL=0;
$scope.numPagesL="";
// $scope.pagesizeSelected="";

$scope.langs=[];
getallLangs();
function getallLangs(){
  $scope.langs=[];
  masterService.getallLangs($scope.pageIndex,$scope.pageSize).then(function(response){
    console.log(response.data.content);
   angular.forEach(response.data.content,function(value){
     $scope.langs.push({languageId:value.languageId,languageName:value.languageName,description:value.description,
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
  getallLangs();
}

$scope.pageChange =function (){
  $scope.pageIndex=$scope.pageIndex-1;
  getallLangs($scope.pageIndex,$scope.pageSize);
  $scope.pageIndex=$scope.pageIndex+1;
}


///////////////end of pagination///////////////////
$scope.lang={
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

$scope.editLang=function(x){
  $scope.lang.languageName=x.languageName;
  $scope.lang.description=x.description;
  $scope.lang.languageId=x.languageId;
  console.log($scope.lang);
}
$scope.deleteLang= function(){
  swal({
    title: "Are you sure?",
    // text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      masterService.deleteLang($scope.lang).then(function(){
        $scope.pageChange();
        swal("deleted!", {
          icon: "success",
        });
        $scope.loadLanguage();
      }); 
    }
     
    // else {
    //   swal("Your imaginary file is safe!");
    // }
  });
  
}
$scope.clearLang= function(){
  $scope.lang.languageName="";
  $scope.lang.description="";
  $scope.lang.languageId="";
  console.log($scope.lang);
}
$scope.addLang= function(){
  masterService.addLang($scope.lang).then(function(response){
    $scope.pageChange();
    if(response.data.responseCode==201){
      swal("Done!", "", "success");
    }
    else{
      swal("Failed!", "", "warning");
    }
    $scope.loadLanguage();
  });

}
$scope.addLanguage=function(){
  $scope.lanpop=$scope.addlanbtn=true;$scope.lan=$scope.landelete=$scope.lanedit=false
}
$scope.loadLanguage=function(){
  $scope.lan=true;$scope.lanpop=$scope.stat=$scope.statepop=false;
}
$scope.closeLanguage=function(){
  $scope.lanpop=false;$scope.lan=true
}
////////////////////////////////////// end of language section ///////////////////////////////////////////////


  ////////////////////////////////////// state section ///////////////////////////////////////////////////////

  ////////////////////////////////pagination////////////////////////////////
$scope.spageSize=2;
$scope.spageIndex=0;
$scope.smaxSize=4;
$scope.totalItemsS=0;
$scope.numPagesS="";
 
  $scope.states=[];
  getallStates();
  function  getallStates(){
    $scope.states=[];
    masterService.getallStates($scope.spageIndex,$scope.spageSize).then(function(response){
     angular.forEach(response.data.content,function(value){
       $scope.states.push({stateId:value.stateId,stateName:value.stateName,description:value.description,
      createdDate:value.insertedDate,updatedDate:value.updatedDate,createdBy:value.createdBy.userName,
      updatedBy:value.updatedBy.userName});
       $scope.totalItemsS=response.data.totalElements;
       $scope.numPagesS=response.data.totalPages;
     });
     console.log($scope.states);
    });
  }  
  


  $scope.changePageSizeS = function(){
    $scope.spageIndex=0;
    getallStates();
  }

  $scope.pagechangeS = function(){
    $scope.spageIndex=$scope.spageIndex-1;
    getallStates($scope.spageIndex,$scope.spageSize);
    $scope.spageIndex=$scope.spageIndex+1;
  }
  ////////////////////end of pagination//////////////////////////////////////
  $scope.state={
    createdBy: {
      userId: usId
    },
    updatedBy: {
      userId: usId
    },
    description: "",
    stateName: "",
    stateId:""
  };
  $scope.editStat= function(x){
    $scope.state.stateName=x.stateName;
    $scope.state.description=x.description;
    $scope.state.stateId=x.stateId;
  }
  $scope.deleteStat= function(){
    swal({
      title: "Are you sure?",
      // text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        masterService.deleteStat($scope.state).then(function(response){
          $scope.pagechangeS();
          swal("deleted!", {
            icon: "success",
          });
          $scope.loadState();
        });
      } 
      // else {
      //   swal("Your imaginary file is safe!");
      // }
    });
    
  }
  $scope.clearStat= function(){
    $scope.state.stateName="";
    $scope.state.description="";
    $scope.state.stateId="";
  }
  $scope.addStat= function(){
    masterService.addStat($scope.state).then(function(response){
      $scope.pagechangeS();
      if(response.data.responseCode==201){
        swal("Done!", "", "success");
      }
      else{
        swal("Failed!", "", "warning");
      }
      $scope.loadState();
    });
  }
  $scope.loadState= function(){
    $scope.stat=true;$scope.statepop=$scope.lan=$scope.lanpop=false
  }
  $scope.addState= function(){
    $scope.statepop=$scope.addstatbtn=true;$scope.stat=$scope.statedit=false
  }
  $scope.closeState=function(){
    $scope.statepop=false;$scope.stat=true
  }
  ////////////////////////////////////// end of state section ///////////////////////////////////////////////



}]);

