/*global homeDashboard*/

(function() {
  'use strict';
  var LoginCtrl = function(authService, $location, $timeout) {
  	this.authService = authService;
  	this.location = $location;
    this.timeout = $timeout;

    this.isLoading = false;
    this.currentTask = 'Logging in...';
    this.registerError = '';
    this.loginError = '';
  	this.init();	
  };

  LoginCtrl.prototype.init = function() {
  	this.checkForLoggedIn();
  };

	LoginCtrl.prototype.login = function(user) {
    if (user.email == null || user.password == null) {
      this.loginError = 'You must fill in both fields.';
      return;
    }
    this.isLoading = true;
    this.resetError('login');
		this.authService.login(user, function(error) {
      if (error) {
        this.timeout(function() { // Needs the timeout here for some reason or it wont execute
          this.loginError = error.message;
          this.isLoading = false;
        }.bind(this), 0);
      }
    }.bind(this));
  };

	LoginCtrl.prototype.registerNewUser = function(user) {
    if (user.email == null || user.password == null || user.username == null) {
      this.registerError = 'You must fill in all fields.';
      return;
    }
    this.currentTask = 'Registering new user...';
    this.resetError('register');
    this.isLoading = true;
		this.authService.registerNewUser(user, function(error) {
      if (error) {
        this.timeout(function() { // Needs the timeout here for some reason or it wont execute
          this.registerError = error.message;
          this.isLoading = false;
        }.bind(this), 0);
      }
      this.currentTask = 'Logging in...';
    }.bind(this));
	};

  LoginCtrl.prototype.checkForLoggedIn = function() {
    if(this.authService.checkForLoggedIn()) {
    	this.location.path('/');
    }
  };

  LoginCtrl.prototype.resetError = function(error) {
    if (error == 'register') {
      this.registerError = '';   
    } else {
      this.loginError = '';
    }
  };

  hackIllinois.controller('LoginCtrl', LoginCtrl);
}());
