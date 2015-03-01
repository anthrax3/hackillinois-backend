/*global homeDashboard*/

(function() {
  'use strict';
  var GroupCtrl = function() {
  	this.ref = new Firebase("https://amber-heat-5574.firebaseio.com");

    this.groups = [
      {
        name: 'jesus group',
        members: [
          'donatello', 
          'jasmine', 
          'marie'
        ]
      },
      {
        name: 'balls',
        members: [
          'fasetto', 
          'joe'
        ]
      }
    ]
  };

  GroupCtrl.prototype.createGroup = function() { 
    var authData = this.ref.getAuth();
      if (authData != null) {
	      $.post("/api/group", { name: this.groupName, firstMember: authData.uid }, function(data) {
	    	      console.log("Successfully created group with id:", authData.uid);
        })
      }
  };

  hackIllinois.controller('GroupCtrl', GroupCtrl);
}());
