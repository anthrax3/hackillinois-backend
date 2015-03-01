/*global homeDashboard*/

(function() {
  'use strict';
  var GroupCtrl = function() {
  	this.ref = new Firebase("https://amber-heat-5574.firebaseio.com");
  };

  GroupCtrl.prototype.createGroup = function() { 
    var authData = this.ref.getAuth();
      if (authData != null) {
	      $.post("/api/group", { name: $("#group .name").val(), firstMember: authData.uid }, function(data) {
	    	      console.log("Successfully created group with id:", authData.uid);
        })
      }
  };

  hackIllinois.controller('GroupCtrl', GroupCtrl);
}());
