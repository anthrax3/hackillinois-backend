/*global homeDashboard*/

(function() {
  'use strict';
  var GroupCtrl = function(restService) {
    this.restService = restService;

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
    this.restService.createGroup(this.groupName);
  };

  hackIllinois.controller('GroupCtrl', GroupCtrl);
}());
