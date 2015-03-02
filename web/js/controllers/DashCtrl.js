/*global homeDashboard*/

(function() {
  'use strict';
  var DashCtrl = function(restService, userService, $location) {
    this.restService = restService;
    this.userService = userService;

    this.location = $location;

    this.init();
  };

  DashCtrl.prototype.init = function() {
    this.checkForLoggedIn();
    this.getUser();
  }

  DashCtrl.prototype.getGroups = function() {
    for(var group in this.user.groups) {
      console.log("hej")
      this.restService.getGroup(group, function(data) {
        console.log(data)
        if (this.groups == null) {
          this.groups = [];
        }
        this.groups.push(data)
      }.bind(this));
    }
  }

  DashCtrl.prototype.getUser = function() {
    this.restService.getUser(function(data) {
      this.user = data;
      this.getGroups();
    }.bind(this))
  }

  DashCtrl.prototype.createGroup = function(groupName) { 
    this.restService.createGroup(groupName, function(groupId) {
      if (this.groups == null) {
        this.groups = [];
      }
      this.groups.push({name: groupName, firstMember: this.user.id, id: groupId})
    }.bind(this));
  };

  DashCtrl.prototype.checkForLoggedIn = function() {
    if(!this.userService.checkForLoggedIn()) {
      this.location.path('/login');
    }
  };

  DashCtrl.prototype.removeGroup = function(index) {
    console.log('starting remove for index: ' + index);
    if (this.groups != null) {
      this.restService.removeGroup(this.groups[index].id, this.user.id, function() {
        console.log('removing on index: ' + index);
        this.groups.splice(index, 1);
      }.bind(this));
    }
  };

  hackIllinois.controller('DashCtrl', DashCtrl);
}());
