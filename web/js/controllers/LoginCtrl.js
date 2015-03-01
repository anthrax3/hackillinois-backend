/*global homeDashboard*/

(function() {
  'use strict';
  var LoginCtrl = function() {
  	this.ref = new Firebase("https://amber-heat-5574.firebaseio.com");
  	this.init();
  };

	LoginCtrl.prototype.login = function() {
    this.ref.authWithPassword({
      email    : $("#login .username").val(),
      password : $("#login .password").val()
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
  };

  LoginCtrl.prototype.init = function() {
  	this.ref.onAuth(function(authData) {
	    if(authData) {
	      $('#firebaseUid').text(authData.uid);
	      $('#firebaseAuthToken').text(authData.token);
	      console.log("User ID: " + authData.uid);
	    }
	  });
  }

  hackIllinois.controller('LoginCtrl', LoginCtrl);
}());
