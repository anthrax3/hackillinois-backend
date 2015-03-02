/*global homeDashboard*/

(function() {
  'use strict';
  var userService = function(restService, $location, $timeout) {
  	this.restService = restService;
  	this.location = $location;
  	this.timeout = $timeout;

  	this.loggedIn = false;
  };

  userService.prototype.checkForLoggedIn = function() {
  	if (this.restService.checkForLoggedIn()) {
  		this.loggedIn = true;
  		return true;
  	} else {
  		return false;
  	}
  };

	userService.prototype.login = function(user) {
		this.restService.login(user, function() {
			this.loggedIn = true;
			console.log('abow');
			this.timeout(function () {
				this.location.path('/bar');
			}.bind(this));
		}.bind(this));
  };

  userService.prototype.logout = function() {
  	if (this.loggedIn) {
  		this.restService.logout();
  		this.loggedIn = false;
  		this.location.path("/login");
  	} else {
  		console.log('Already logged out!');
  	}
  }

	userService.prototype.registerNewUser = function(user) {
		this.restService.registerNewUser(user, function() {
			this.login(user);
		}.bind(this));
  };

  userService.prototype.getLoggedIn = function() {
  	return this.loggedIn;
  };

  hackIllinois.service('userService', userService);
}());


