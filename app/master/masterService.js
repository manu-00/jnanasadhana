myApp.service('masterService',['$http',function($http){


///////////////////////////////////////////language service///////////////////////////////////////////////////
    this.addLang=function(lang){
        if(lang.languageId==0 || lang.languageId==null){
         return $http({
              method: "POST",
              url:"https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/language/v1/createLanguage",
              data: JSON.stringify(lang)
         })
        }
        else{
            return $http({
                method: "PUT",
                url:"https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/language/v1/updateLanguage",
                data: JSON.stringify(lang)
           }) 
        }
    }
    this.getallLangs = function(pageIndex,pageSize){
        return $http({
            method: 'GET',
            url:"https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/language/v1/getAllLanguageByPagination/{pageNumber}/{pageSize}?pageNumber="+pageIndex+"&pageSize="+pageSize
        });
    }
    this.deleteLang = function(lang){
        return $http({
            method: "DELETE",
            url:"https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/language/v1/deleteLanguageById/"+lang.languageId
        })
    }
// //////////////////////////////////////end of language service/////////////////////////////////////////////

// //////////////////////////////////////////////state service //////////////////////////////////////////////////


this.addStat=function(state){
    if(state.stateId==0 || state.stateId==null){
     return $http({
          method: "POST",
          url:"https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/state/v1/createState",
          data: JSON.stringify(state)
     })
    }
    else{
        return $http({
            method: "PUT",
            url:"https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/state/v1/updateState",
            data: JSON.stringify(state)
       }) 
    }
}
this.getallStates = function(spageIndex,spageSize){
    return $http({
        method: 'GET',
        url:"https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/state/v1/getAllStateByPagination/{pageNumber}/{pageSize}?pageNumber="+spageIndex+"&pageSize="+spageSize
    });
}
this.deleteStat = function(state){
    return $http({
        method: "DELETE",
        url:"https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/state/v1/deleteStateById/"+state.stateId
    })
}

// ////////////////////////////////////////////end of state service////////////////////////////////////////////


}]);