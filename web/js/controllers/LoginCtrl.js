/*global homeDashboard*/

(function() {
  'use strict';
  var LoginCtrl = function($location) {
  	this.ref = new Firebase("https://amber-heat-5574.firebaseio.com");
  	this.init($location);
  };

	LoginCtrl.prototype.login = function() {
    this.ref.authWithPassword({
      email    : this.email,
      password : this.password
    }, function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
    }
    });
  };

  LoginCtrl.prototype.init = function($location) {
  	this.ref.onAuth(function(authData) {
	    if(authData) {
	      $('#firebaseUid').text(authData.uid);
	      $('#firebaseAuthToken').text(authData.token);
	      console.log("User ID: " + authData.uid);
        //$location.url("/dashboard")
	    }
	  });
  };

  hackIllinois.controller('LoginCtrl', LoginCtrl);
}());
