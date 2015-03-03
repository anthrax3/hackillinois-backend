/*global homeDashboard*/

(function() {
  'use strict';
  var dataService = function(restService, $timeout) {
  	this.restService = restService;
    this.timeout =

    this.clearData();
    this.groups = [];
  };

  dataService.prototype.loadUserData = function(callback) {
    this.loadUser(function() {
      this.loadGroups(this.userData.user.groups, function() {
        callback();
      }.bind(this));
    }.bind(this));
  };

  dataService.prototype.getUserData = function() {
    return this.userData;
  };

  dataService.prototype.loadUser = function(callback) {
    this.restService.getUser(function(data) {
      this.userData.user = data;
      callback();
    }.bind(this))
  };

  dataService.prototype.loadGroups = function(userGroups, callback) {
    for(var group in userGroups) {
      console.log("hej")
      this.restService.loadGroup(group, function(data) {
        console.log(data)
        this.userData.groups.push(data)
        callback();
      }.bind(this));
    }
  }

  dataService.prototype.createGroup = function(groupName, callback) {
    this.restService.createGroup(groupName, function(groupId) {
      this.userData.groups.push({name: groupName, members: [this.userData.user.id], id: groupId})
      callback();
    }.bind(this));
  };

  dataService.prototype.removeGroup = function(index, callback) {
    if (this.groups != null) {
      this.restService.removeGroup(this.userData.groups[index].id, this.user.id, function() {
        this.userData.groups.splice(index, 1);
        callback();
      }.bind(this));
    }
  };

  dataService.prototype.addUser = function(index, userId, callback) {
    if (this.userData.groups[index].members[userId] != null) {
      var error = {message: 'User already added.'};
      callback(error);
      return;
    }
    this.restService.addUser(this.userData.groups[index].id, userId, function(userExists) {
      if (userExists) {
        this.userData.groups[index].members[userId] = userId;
        callback();
      } else {
        var error = {message: 'No such user.'};
        callback(error);
      }
    }.bind(this));
  };

  dataService.prototype.removeUser = function(index, userId, callback) {
    this.restService.removeUser(this.userData.groups[index].id, userId, function() {
      if (userId == this.userData.user.id) {
        this.userData.groups.splice(index, 1);
      } else {
        delete this.userData.groups[index].members[userId];
      }
      callback();
    }.bind(this));
  };

  dataService.prototype.clearData = function() {
    this.userData = {
      user: {},
      groups: []
    };
  };

  hackIllinois.service('dataService', dataService);
}());


