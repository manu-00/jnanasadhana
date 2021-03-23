myApp.service('storeService', ['$http', function ($http) {

    this.addCat = function (cat) {
        if (cat.categoryId == 0 || cat.categoryId == null) {
            return $http({
                method: "POST",
                url: "https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/category/v1/createCategory",
                data: JSON.stringify(cat)
            })
        }
        else {
            return $http({
                method: "PUT",
                url: "https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/category/v1/updateCategory",
                data: JSON.stringify(cat)
            })
        }
    }
    this.getallCategory = function (pageIndexC, pageSizeC) {
        return $http({
            method: 'GET',
            url: "https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/category/v1/getAllCategoryByPagination/{pageNumber}/{pageSize}?pageNumber=" + pageIndexC + "&pageSize=" + pageSizeC
        });
    }
    this.deleteCat = function (cat) {
        return $http({
            method: "DELETE",
            url: "https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/category/v1/deleteCategoryById/" + cat.categoryId
        })
    }

    ////////////////////////////////////////////// Magazine service /////////////////////////////////////////////////

    this.addbooks = function (book) {
        if (book.magazineCourseID == 0 || book.magazineCourseID == null) {
            return $http({
                method: "POST",
                url: "https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/magazine/v1/createMagazineCourse",
                data: JSON.stringify(book)
            })
        }
        else {
            return $http({
                method: "PUT",
                url: "https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/magazine/v1/updateMagazineCourse",
                data: JSON.stringify(book)
            })
        }
    }
    this.getallMagazine = function (pageIndexB, pageSizeB) {
        return $http({
            method: 'GET',
            url: "https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/magazine/v1/getAllMagazineCourseByPagination/{pageNumber}/{pageSize}?pageNumber=" + pageIndexB + "&pageSize=" + pageSizeB
        });
    }
    this.deletebooks = function (book) {
        return $http({
            method: "DELETE",
            url: "https://raghunkadur.cloudjiffy.net/RaghuNKadurWeb/magazine/v1/deleteMagazineCourseById/" + book.magazineCourseId
        })
    }

    // ////////////////////////////////////////end of magazine service////////////////////////////////////////////

}]);