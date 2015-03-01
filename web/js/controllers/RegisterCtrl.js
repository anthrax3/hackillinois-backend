/*global homeDashboard*/
/*global homeDashboard*/

(function() {
  'use strict';
  var RegisterCtrl = function() {
 		this.ref = new Firebase("https://amber-heat-5574.firebaseio.com");
  };

  RegisterCtrl.prototype.register = function() {
   this.ref.createUser({
      email    : $("#register .username").val(),
      password : $("#register .password").val()
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
        var uref = ref.child('users/' + userData.uid);
        uref.set({
          name: 'putte',
          email: $("#register .username").val()
        })
      }
    });
  };

  hackIllinois.controller('RegisterCtrl', RegisterCtrl);
}());
