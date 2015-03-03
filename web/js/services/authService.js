/*global homeDashboard*/

(function() {
  'use strict';
  var authService = function(restService, $location, $timeout) {
  	this.restService = restService;
  	this.location = $location;
  	this.timeout = $timeout;

  	this.loggedIn = false;
  };

  authService.prototype.checkForLoggedIn = function() {
  	if (this.restService.checkForLoggedIn()) {
  		this.loggedIn = true;
  		return true;
  	} else {
  		return false;
  	}
  };

	authService.prototype.login = function(user, callback) {
		this.restService.login(user, function(error) {
      if (error) {
        callback(error);
      } else {
        this.loggedIn = true;
        this.location.path('/');
        callback();
      }
			this.timeout(function () {
			}.bind(this));
		}.bind(this));
  };

  authService.prototype.logout = function() {
  	if (this.loggedIn) {
  		this.restService.logout();
  		this.loggedIn = false;
  		this.location.path("/login");
  	} else {
  		console.log('Already logged out!');
  	}
  }

	authService.prototype.registerNewUser = function(user, callback) {
		this.restService.registerNewUser(user, function(error) {
      if (!error) {
        callback();
        this.login(user, function() { //Empty function because we know login is gonna work
        });
      } else {
        callback(error);
      }
		}.bind(this));
  };

  authService.prototype.getLoggedIn = function() {
  	return this.loggedIn;
  };

  hackIllinois.service('authService', authService);
}());


