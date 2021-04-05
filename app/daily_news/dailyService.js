myApp.service('dailyService',['$http',function($http){


///////////////////////////////////////////daily magazine service///////////////////////////////////////////////////
    this.addDailyMagazine=function(lang){
        if(lang.languageId==0 || lang.languageId==null){
         return $http({
              method: "POST",
              url:"https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/daily/v1/createDailyMagazine",
              data: JSON.stringify(lang)
         })
        }
        else{
            return $http({
                method: "PUT",
                url:"https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/daily/v1/updateDailyMagazine",
                data: JSON.stringify(lang)
           }) 
        }
    }
    this.getallDailyMagazines = function(pageIndex,pageSize){
        return $http({
            method: 'GET',
            url:"https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/daily/v1/getAllDailyMagazineByPagination/{pageNumber}/{pageSize}?pageNumber="+pageIndex+"&pageSize="+pageSize
        });
    }
    this.deleteDailyMagazine = function(lang){
        return $http({
            method: "DELETE",
            url:"https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/daily/v1/deleteDailyMagazineById/"+lang.languageId
        })
    }
////////////////////////////////////////end of daily magazine service/////////////////////////////////////////////

////////////////////////////////////////////////magazine course service //////////////////////////////////////////////////


this.addMagazineCourse=function(magazineCourse){
    if(magazineCourse.magazineCourseId==0 || magazineCourse.magazineCourseId==null){
     return $http({
          method: "POST",
          url:"https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/magazine/v1/createMagazineCourse",
          data: JSON.stringify(magazineCourse)
     })
    }
    else{
        return $http({
            method: "PUT",
            url:"https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/magazine/v1/updateMagazineCourse",
            data: JSON.stringify(magazineCourse)
       }) 
    }
}
this.getallMagazineCourses = function(spageIndex,spageSize){
    return $http({
        method: 'GET',
        url:"https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/magazine/v1/getAllMagazineCourseByPagination/{pageNumber}/{pageSize}?pageNumber="+spageIndex+"&pageSize="+spageSize
    });
}
this.deleteMagazineCourse = function(magazineCourse){
    return $http({
        method: "DELETE",
        url:"https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/magazine/v1/deleteMagazineCourseById/"+magazineCourse.magazineCourseId
    })
}

// ////////////////////////////////////////////end of magazine course service////////////////////////////////////////////
}]);