/*global homeDashboard*/
/*global homeDashboard*/

(function() {
	'use strict';
	var RegisterCtrl = function(restService) {
		this.restService = restService;
	};

	RegisterCtrl.prototype.registerNewUser = function() {
		this.restService.registerNewUser(this.email, this.username, this.password)
	};

	hackIllinois.controller('RegisterCtrl', RegisterCtrl);
}());
