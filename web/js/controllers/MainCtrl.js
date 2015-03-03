(function() {
	'use strict';
	var MainCtrl = function(authService, dataService) {
		this.authService = authService;
		this.dataService = dataService;
	};

	MainCtrl.prototype.logout = function(user) {
		this.authService.logout();
	};

	MainCtrl.prototype.isLoggedIn = function() {
		return this.authService.getLoggedIn();
	};

	MainCtrl.prototype.getUsername = function() {
		return this.dataService.userData.user.username;
	};

	hackIllinois.controller('MainCtrl', MainCtrl);
}());
