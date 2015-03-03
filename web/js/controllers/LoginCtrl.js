/*global homeDashboard*/

(function() {
  'use strict';
  var LoginCtrl = function(authService, $location) {
  	this.authService = authService;
  	this.location = $location;

  	this.init();	
  };

  LoginCtrl.prototype.init = function() {
  	this.checkForLoggedIn();
  };

	LoginCtrl.prototype.login = function(user) {
		this.authService.login(user);
  };

	LoginCtrl.prototype.registerNewUser = function(user) {
		this.authService.registerNewUser(user)
	};

  LoginCtrl.prototype.checkForLoggedIn = function() {
    if(this.authService.checkForLoggedIn()) {
    	this.location.path('/');
    }
  };

  hackIllinois.controller('LoginCtrl', LoginCtrl);
}());
