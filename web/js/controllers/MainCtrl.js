(function() {
	'use strict';
	var MainCtrl = function(authService) {
		this.authService = authService;
	};

	MainCtrl.prototype.logout = function(user) {
		this.authService.logout();
	};

	MainCtrl.prototype.isLoggedIn = function() {
		return this.authService.getLoggedIn();
	};

	hackIllinois.controller('MainCtrl', MainCtrl);
}());
