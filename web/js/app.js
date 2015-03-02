/*global angular */
var hackIllinois = angular.module('hackIllinois', ['ngRoute']);

hackIllinois.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'html/dashboard.html',
        controller: 'DashCtrl as dashCtrl'
      }).
      when('/login', {
        templateUrl: 'html/login.html',
        controller: 'LoginCtrl as loginCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);