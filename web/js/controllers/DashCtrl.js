/*global homeDashboard*/

(function() {
  'use strict';
  var DashCtrl = function(restService) {
    this.restService = restService;

    this.user = {}
    this.groups = []
    this.getUser();
  };

  DashCtrl.prototype.getGroups = function() {
    for(var group in DashCtrl.user.groups) {
      console.log("hej")
      DashCtrl.restService.getGroup(group, function(data) {
        console.log(data)
        DashCtrl.groups.push(data)
      });
    }
  }

  DashCtrl.prototype.getUser = function() {
    this.restService.getUser(function(data) {
      DashCtrl.user = data;
      DashCtrl.getGroups();
    })
  }

  DashCtrl.prototype.createGroup = function() { 
    this.restService.createGroup(this.groupName);
  };

  hackIllinois.controller('DashCtrl', DashCtrl);
}());
