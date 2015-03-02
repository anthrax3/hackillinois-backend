/*global homeDashboard*/
/*global moment*/

(function() {
  'use strict';
  var restService = function($http) {
    this.http = $http;
    this.ref = new Firebase("https://amber-heat-5574.firebaseio.com");
  };

  restService.prototype.registerNewUser = function(email, username, password) {
    var newUser = {
      email: email,
      password: password
    };

    this.ref.createUser(newUser, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
        newUser['username'] = username
        this.ref.child('users/' + userData.uid).set(newUser);
      }
    }.bind(this));
  };

  restService.prototype.createGroup = function(groupName) {
    var authData = this.ref.getAuth();
    if (authData != null) {
    this.http.post('/api/group', {name: groupName, firstMember: authData.uid}).
      error(function(data, status, headers, config) {
        console.log("Couldn't create group");
      }).
      success(function(data, status, headers, config) {
        console.log("Successfully created group with id:", groupName);
      });
    }
  };

  restService.prototype.getUser = function(callback) {
    var authData = this.ref.getAuth();
    if (authData != null) {
      this.http.get('/api/users/'+authData.uid, {}).
        error(function(data, status, headers, config) {
          console.log("Couldn't find a user");
        }).
        success(function(data, status, headers, config) {
          return callback(data);
        });
    }
  };

  restService.prototype.getGroup = function(groupId, callback) {
    if (groupId != null) {
      this.http.get('/api/group/'+groupId, {}).
        error(function(data, status, headers, config) {
          console.log("Couldn't find a group");
        }).
        success(function(data, status, headers, config) {
          return callback(data);
        });
    }
    else {

    }
  };

  hackIllinois.service('restService', restService);
}());
