myApp.service('appService', ['$http', function ($http) {

const URL="https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/";

///////////////////////////////////////////////UPLOAD FILE//////////////////////////////////////////////////////////

    this.uploadFile=function(file){
        var fileUpload=new FormData();
        fileUpload.append('file',file);
        return $http({
            method:"POST",
            url:URL+"file/uploadFile",
            data:fileUpload,
            headers:{'Content-Type': undefined }
        })
    }

/////////////////////////////////////////category service///////////////////////////////////////////////////////////
    this.addCat = function (cat) {
        if (cat.categoryId == 0 || cat.categoryId == null) {
            return $http({
                method: "POST",
                url: URL+"category/v1/createCategory",
                data: JSON.stringify(cat)
            })
        }
        else {
            return $http({
                method: "PUT",
                url: URL+"category/v1/updateCategory",
                data: JSON.stringify(cat)
            })
        }
    }
    this.getallCategory = function (pageIndexC, pageSizeC) {
        return $http({
            method: 'GET',
            url: URL+"category/v1/getAllCategoryByPagination/{pageNumber}/{pageSize}?pageNumber=" + pageIndexC + "&pageSize=" + pageSizeC
        });
    }
    this.deleteCat = function (cat) {
        return $http({
            method: "DELETE",
            url: URL+"category/v1/deleteCategoryById/" + cat.categoryId
        })
    }

    ////////////////////////////////////////////// book service /////////////////////////////////////////////////

    this.addbooks = function (book) {
        if (book.magazineCourseID == 0 || book.magazineCourseID == null) {
            return $http({
                method: "POST",
                url: URL+"magazine/v1/createMagazineCourse",
                data: JSON.stringify(book)
            })
        }
        else {
            return $http({
                method: "PUT",
                url: URL+"magazine/v1/updateMagazineCourse",
                data: JSON.stringify(book)
            })
        }
    }
    this.getallMagazine = function (pageIndexB, pageSizeB) {
        return $http({
            method: 'GET',
            url: URL+"magazine/v1/getAllMagazineCourseByPagination/{pageNumber}/{pageSize}?pageNumber=" + pageIndexB + "&pageSize=" + pageSizeB
        });
    }
    this.deletebooks = function (book) {
        return $http({
            method: "DELETE",
            url: URL+"magazine/v1/deleteMagazineCourseById/" + book.magazineCourseId
        })
    }

    ///////////////////////////////////////////language service///////////////////////////////////////////////////
        this.addLang=function(lang){
            if(lang.languageId==0 || lang.languageId==null){
             return $http({
                  method: "POST",
                  url:URL+"language/v1/createLanguage",
                  data: JSON.stringify(lang)
             })
            }
            else{
                return $http({
                    method: "PUT",
                    url:URL+"language/v1/updateLanguage",
                    data: JSON.stringify(lang)
               }) 
            }
        }
        this.getallLangs = function(pageIndex,pageSize){
            return $http({
                method: 'GET',
                url:URL+"language/v1/getAllLanguageByPagination/{pageNumber}/{pageSize}?pageNumber="+pageIndex+"&pageSize="+pageSize
            });
        }
        this.deleteLang = function(lang){
            return $http({
                method: "DELETE",
                url:URL+"language/v1/deleteLanguageById/"+lang.languageId
            })
        }
    
    ////////////////////////////////////////////////state service //////////////////////////////////////////////////
    
    
    this.addStat=function(state){
        if(state.regionId==0 || state.regionId==null){
         return $http({
              method: "POST",
              url:URL+"region/v1/createRegion",
              data: JSON.stringify(state)
         })
        }
        else{
            return $http({
                method: "PUT",
                url:URL+"region/v1/updateRegion",
                data: JSON.stringify(state)
           }) 
        }
    }
    this.getallStates = function(spageIndex,spageSize){
        return $http({
            method: 'GET',
            url:URL+"region/v1/getAllRegionByPagination/{pageNumber}/{pageSize}?pageNumber="+spageIndex+"&pageSize="+spageSize
        });
    }
    this.deleteStat = function(state){
        return $http({
            method: "DELETE",
            url:URL+"region/v1/deleteRegionById/"+state.regionId
        })
    }
    
        ///////////////////////////////////////////daily magazine service///////////////////////////////////////////////////
            this.addDailyMagazine=function(magazine){
                if(magazine.magazineId==0 || magazine.magazineId==null){
                 return $http({
                      method: "POST",
                      url:URL+"daily/v1/createDailyMagazine",
                      data: JSON.stringify(magazine)
                 })
                }
                else{
                    return $http({
                        method: "PUT",
                        url:URL+"daily/v1/updateDailyMagazine",
                        data: JSON.stringify(magazine)
                   }) 
                }
            }
            this.getallDailyMagazines = function(MagazinePageIndex,MagazinePageSize){
                return $http({
                    method: 'GET',
                    url:URL+"daily/v1/getAllDailyMagazineByPagination/{pageNumber}/{pageSize}?pageNumber="+MagazinePageIndex+"&pageSize="+MagazinePageSize
                });
            }
            this.deleteDailyMagazine = function(magazine){
                return $http({
                    method: "DELETE",
                    url:URL+"daily/v1/deleteDailyMagazineById/"+magazine.magazineId
                })
            }
        ////////////////////////////////////////////////magazine course service //////////////////////////////////////////////////
        
        
        this.addMagazineCourse=function(magazineCourse){
            if(magazineCourse.magazineCourseId==0 || magazineCourse.magazineCourseId==null){
             return $http({
                  method: "POST",
                  url:URL+"magazine/v1/createMagazineCourse",
                  data: JSON.stringify(magazineCourse)
             })
            }
            else{
                return $http({
                    method: "PUT",
                    url:URL+"magazine/v1/updateMagazineCourse",
                    data: JSON.stringify(magazineCourse)
               }) 
            }
        }
        this.getallMagazineCourses = function(spageIndex,spageSize){
            return $http({
                method: 'GET',
                url:URL+"magazine/v1/getAllMagazineCourseByPagination/{pageNumber}/{pageSize}?pageNumber="+spageIndex+"&pageSize="+spageSize
            });
        }
        this.deleteMagazineCourse = function(magazineCourse){
            return $http({
                method: "DELETE",
                url:URL+"magazine/v1/deleteMagazineCourseById/"+magazineCourse.magazineCourseId
            })
        }
    ////////////////////////////////////////////Course service//////////////////////////////////////////////////////

    this.addTheCourse=function(course){
        if(course.courseId==0 || course.courseId==null){
         return $http({
              method: "POST",
              url:URL+"course/v1/createCourse",
              data: JSON.stringify(course)
         })
        }
        else{
            return $http({
                method: "PUT",
                url:URL+"course/v1/updateCourse",
                data: JSON.stringify(course)
           }) 
        }
    }
    this.getallCourses = function(CoursePageIndex,CoursePageSize){
        return $http({
            method: 'GET',
            url:URL+"course/v1/getAllCourseByPagination/{pageNumber}/{pageSize}?pageNumber="+CoursePageIndex+"&pageSize="+CoursePageSize
        });
    }
    this.deleteCourse = function(course){
        return $http({
            method: "DELETE",
            url:URL+"course/v1/deleteCourseById/"+course.courseId
        })
    }
    /////////////////////////////////////////////////module service/////////////////////////////////////////////////
    this.addThemodule=function(module){
        if(module.moduleId==0 || module.moduleId==null){
         return $http({
              method: "POST",
              url:URL+"module/v1/createModule",
              data: JSON.stringify(module)
         })
        }
        else{
            return $http({
                method: "PUT",
                url:URL+"module/v1/updateModule",
                data: JSON.stringify(module)
           }) 
        }
    }
    this.getallModules = function(modulePageIndex,modulePageSize){
        return $http({
            method: 'GET',
            url:URL+"module/v1/getAllModuleByPagination/{pageNumber}/{pageSize}?pageNumber="+modulePageIndex+"&pageSize="+modulePageSize
        });
    }
    this.deletemodule = function(module){
        return $http({
            method: "DELETE",
            url:URL+"module/v1/deleteModuleById/"+module.moduleId
        })
    }    

}]);