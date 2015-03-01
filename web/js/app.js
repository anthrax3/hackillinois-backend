/*global angular */
var hackIllinois = angular.module('hackIllinois', ['ngRoute']);

hackIllinois.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'html/login.html',
        controller: 'LoginCtrl as loginCtrl'
      }).
      when('/register', {
        templateUrl: 'html/register.html',
        controller: 'RegisterCtrl as registerCtrl'
      }).
      when('/group', {
        templateUrl: 'html/group.html',
        controller: 'GroupCtrl as groupCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);