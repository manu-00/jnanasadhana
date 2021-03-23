myApp.service('storeService',['$http',function($http){

    this.addLang=function(lang){
        if(lang.languageId==0 || lang.languageId==null){
         return $http({
              method: "POST",
              url:getlanguageURL,
              data: JSON.stringify(lang)
         })
        }
        else{
            return $http({
                method: "PUT",
                url:updatelanguageURL+ lang.languageId,
                data: JSON.stringify(lang)
           }) 
        }
    }
    this.getallLangs = function(){
        return $http({
            method: 'GET',
            url:"https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/language/v1/getAllLanguageByPagination/{pageNumber}/{pageSize}?pageNumber=1&pageSize=1"
        });
    }
    this.deleteLang = function(x){
        return $http({
            method: "DELETE",
            url:deletelanURL+x.languageId
        })
    }

}]);