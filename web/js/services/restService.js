/*global homeDashboard*/
/*global moment*/

(function() {
  'use strict';
  var restService = function($http) {
    this.http = $http;
    this.ref = new Firebase("https://amber-heat-5574.firebaseio.com");
  };

  hackIllinois.service('restService', restService);
}());
