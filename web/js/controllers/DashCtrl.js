/*global homeDashboard*/

(function() {
  'use strict';
  var DashCtrl = function(dataService, authService, $location) {
    this.dataService = dataService;
    this.authService = authService;

    this.location = $location;

    this.init();
  };

  DashCtrl.prototype.init = function() {
    this.checkForLoggedIn();
    this.loadUser(function() {
      this.loadGroups();
    }.bind(this));
  }

  DashCtrl.prototype.loadGroups = function() {
    this.dataService.loadGroups(this.user.groups, function() {
      this.getGroups();
    }.bind(this));
  }

  DashCtrl.prototype.loadUser = function(callback) {
    this.dataService.loadUser(function() {
      this.getUser();
      callback();
    }.bind(this));
  }

  DashCtrl.prototype.createGroup = function(groupName) { 
    this.tempGroup = null; // CLEAR FIELDS
    this.dataService.createGroup(groupName, function() {
      this.getGroups();
    }.bind(this));
  };

  DashCtrl.prototype.removeGroup = function(index) {
    this.dataService.removeGroup(index, function() {
      this.getGroups();
    }.bind(this));
  };

  DashCtrl.prototype.addUser = function(index, memberEmail) {
    this.dataService.addUser(index, memberEmail, function(userExists) {
      if (userExists) {
        this.getGroups();
      }
    }.bind(this));
  };

  DashCtrl.prototype.removeUser = function(index, memberId) {
    this.dataService.removeUser(index, memberId, function() {
      this.getGroups();
    }.bind(this));
  };

  DashCtrl.prototype.getUser = function() {
    this.user = this.dataService.getUser();
  };

  DashCtrl.prototype.getGroups = function() {
    this.groups = this.dataService.getGroups();
  };

  DashCtrl.prototype.checkForLoggedIn = function() {
    if(!this.authService.checkForLoggedIn()) {
      this.location.path('/login');
    }
  };

  hackIllinois.controller('DashCtrl', DashCtrl);
}());
