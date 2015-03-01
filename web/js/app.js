/*global angular */
var hackIllinois = angular.module('hackIllinois', ['ngRoute']);

hackIllinois.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'html/login.html',
        controller: 'LoginCtrl'
      }).
      when('/register', {
        templateUrl: 'html/register.html',
        controller: 'RegisterCtrl'
      }).
      when('/group', {
        templateUrl: 'html/group.html',
        controller: 'GroupCtrl'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }]);