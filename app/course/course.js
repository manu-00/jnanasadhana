'use strict';

angular.module('myApp.course', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/course', {
    templateUrl: 'course/course.html',
    controller: 'courseCtrl'
  });
}])

.controller('courseCtrl', [function() {

}]);