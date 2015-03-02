/*global homeDashboard*/

(function() {
  'use strict';
  var LoginCtrl = function(userService, $location) {
  	this.userService = userService;
  	this.location = $location;

  	this.init();
  };

  LoginCtrl.prototype.init = function() {
  	this.checkForLoggedIn();
  };

	LoginCtrl.prototype.login = function(user) {
		this.userService.login(user);
  };

	LoginCtrl.prototype.registerNewUser = function(user) {
		this.userService.registerNewUser(user)
	};

  LoginCtrl.prototype.checkForLoggedIn = function() {
    if(this.userService.checkForLoggedIn()) {
    	this.location.path('/');
    }
  };

  hackIllinois.controller('LoginCtrl', LoginCtrl);
}());
