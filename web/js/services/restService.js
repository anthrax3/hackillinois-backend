/*global homeDashboard*/
/*global moment*/

(function() {
  'use strict';
  var restService = function($http) {
    this.http = $http;
  };

  hackIllinois.service('restService', restService);
}());
