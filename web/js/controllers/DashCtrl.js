/*global homeDashboard*/

(function() {
  'use strict';
  var DashCtrl = function(dataService, authService, $location) {
    this.dataService = dataService;
    this.authService = authService;

    this.location = $location;

    this.errorArray = [];
    this.init();
  };

  DashCtrl.prototype.init = function() {
    this.checkForLoggedIn();
    this.loadUserData();
  }

  DashCtrl.prototype.loadUserData = function() {
    this.dataService.loadUserData(function() {
      this.getUserData();
    }.bind(this));
  };

  DashCtrl.prototype.getUserData = function() {
    this.userData = this.dataService.getUserData();
    console.log(this.userData);
  };

  DashCtrl.prototype.createGroup = function(groupName) { 
    this.tempGroup = null; // CLEAR FIELDS
    this.dataService.createGroup(groupName, function() {
      this.getUserData();
    }.bind(this));
  };

  DashCtrl.prototype.removeGroup = function(index) {
    this.dataService.removeGroup(index, function() {
      this.getUserData();
    }.bind(this));
  };

  DashCtrl.prototype.addUser = function(index, memberEmail) {
    this.dataService.addUser(index, memberEmail, function(error) {
      if (!error) {
        this.getUserData();
      } else {
        this.errorArray[index] = error.message;
      }
    }.bind(this));
  };

  DashCtrl.prototype.removeUser = function(index, userId) {
    this.dataService.removeUser(index, userId, function() {
      this.getUserData();
    }.bind(this));
  };

  DashCtrl.prototype.isUser = function(userId) {
    if (userId == this.userData.user.id) {
      return true;
    } else {
      return false;
    }
  };

  DashCtrl.prototype.checkForLoggedIn = function() {
    if(!this.authService.checkForLoggedIn()) {
      this.location.path('/login');
    }
  };

  DashCtrl.prototype.resetError = function(index) {
    this.errorArray[index] = null;
  };

  hackIllinois.controller('DashCtrl', DashCtrl);
}());
