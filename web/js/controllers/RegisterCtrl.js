/*global homeDashboard*/
/*global homeDashboard*/

(function() {
  'use strict';
  var RegisterCtrl = function() {
 		this.ref = new Firebase("https://amber-heat-5574.firebaseio.com");
 		this.init();
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
        var uref = ref.child('users/' + userData.uid);
        uref.set({
          name: 'putte',
          email: this.email
        })
      }
    });
  };

  RegisterCtrl.prototype.init = function() {
  	this.ref.onAuth(function(authData) {
	    if(authData) {
	      $('#firebaseUid').text(authData.uid);
	      $('#firebaseAuthToken').text(authData.token);
	      console.log("User ID: " + authData.uid);
	    }
	  });
  }

  hackIllinois.controller('RegisterCtrl', RegisterCtrl);
}());
