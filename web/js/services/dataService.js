/*global homeDashboard*/

(function() {
  'use strict';
  var dataService = function(restService) {
  	this.restService = restService;

    this.groups = [];
  };

  dataService.prototype.loadGroups = function(userGroups, callback) {
    for(var group in userGroups) {
      console.log("hej")
      this.restService.loadGroup(group, function(data) {
        console.log(data)
        this.groups.push(data)
        callback();
      }.bind(this));
    }
  }

  dataService.prototype.createGroup = function(groupName, callback) {
    this.restService.createGroup(groupName, function(groupId) {
      if (this.groups == null) {
        this.groups = [];
      }
      this.groups.push({name: groupName, members: [this.user.id], id: groupId})
      callback();
    }.bind(this));
  };

  dataService.prototype.removeGroup = function(index, callback) {
    if (this.groups != null) {
      this.restService.removeGroup(this.groups[index].id, this.user.id, function() {
        this.groups.splice(index, 1);
        callback();
      }.bind(this));
    }
  };

  dataService.prototype.addUser = function(index, memberId, callback) {
    if (this.groups[index].members[memberId] != null) {
      console.log('User already in group!');
      return;
    }
    this.restService.addUser(this.groups[index].id, memberId, function(userExists) {
      if (userExists) {
        this.groups[index].members.push(memberId);
        callback(true);
      } else {
        callback(false);
      }
    }.bind(this));
  };

  dataService.prototype.removeUser = function(index, userId, callback) {
    this.restService.removeUser(this.groups[index].id, userId, function() {
      if (userId == this.user.id) {
        this.groups.splice(index, 1);
      } else {
        delete this.groups[index].members[userId];
      }
      callback();
    }.bind(this));
  };

  dataService.prototype.loadUser = function(callback) {
    this.restService.getUser(function(data) {
      this.user = data;
      callback();
    }.bind(this))
  };

  // GETTERS
  dataService.prototype.getUser = function() {
    return this.user;
  };

  dataService.prototype.getGroups = function() {
    return this.groups;
  };

  hackIllinois.service('dataService', dataService);
}());


