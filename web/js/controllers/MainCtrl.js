(function() {
	'use strict';
	var MainCtrl = function(userService) {
		this.userService = userService;
	};

	MainCtrl.prototype.logout = function(user) {
		this.userService.logout();
	};

	MainCtrl.prototype.isLoggedIn = function() {
		return this.userService.getLoggedIn();
	};

	hackIllinois.controller('MainCtrl', MainCtrl);
}());
