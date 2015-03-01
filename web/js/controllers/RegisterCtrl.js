/*global homeDashboard*/
/*global homeDashboard*/

(function() {
	'use strict';
	var RegisterCtrl = function() {
		this.ref = new Firebase("https://amber-heat-5574.firebaseio.com");
	};

	RegisterCtrl.prototype.register = function() {
		this.ref.createUser({
			email    : this.email,
			password : this.password
		}, function(error, userData) {
		if (error) {
			console.log("Error creating user:", error);
		} else {
			console.log("Successfully created user account with uid:", userData.uid);
			var uref = this.ref.child('users/' + userData.uid);
			uref.set({
				name: this.username,
				email: this.email
			})
		}
		}.bind(this));
	};
	hackIllinois.controller('RegisterCtrl', RegisterCtrl);
}());
