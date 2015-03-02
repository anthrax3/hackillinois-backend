/*global homeDashboard*/
/*global moment*/

(function() {
  'use strict';
  var restService = function($http) {
    this.http = $http;
    this.ref = new Firebase("https://amber-heat-5574.firebaseio.com");
  };

  restService.prototype.checkForLoggedIn = function() {
    var authData = this.ref.getAuth();
    console.log('Checking if logged in...');
    if (authData) {
      console.log('Logged in with: ');
      console.log(authData);
      $('#firebaseUid').text(authData.uid);
      $('#firebaseAuthToken').text(authData.token);
      return true;
    } else {
      console.log('Not logged in!');
      return false;
    }
  };

  restService.prototype.registerNewUser = function(user, callback) {
    this.ref.createUser({
      email: user.email,
      password: user.password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
        this.ref.child('users/' + userData.uid).set({
          email: user.email,
          username: user.username
        });
        callback();
      }
    }.bind(this));
  };

  restService.prototype.login = function(user, callback) {
    this.ref.authWithPassword({
      email    : user.email,
      password : user.password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        callback();
      }
    });
  };

  restService.prototype.logout = function() {
      this.ref.unauth();
      console.log('Logged out.');
  };

  restService.prototype.createGroup = function(groupName, callback) {
    var authData = this.ref.getAuth();
    if (authData != null) {
    this.http.post('/api/group', {name: groupName, firstMember: authData.uid}).
      error(function(data, status, headers, config) {
        console.log("Couldn't create group");
      }).
      success(function(data, status, headers, config) {
        console.log("Successfully created group with id:", groupName);
        callback(data);
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
          data['id'] = authData.uid;
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
          data['id'] = groupId;
          return callback(data);
        });
    }
  };

  restService.prototype.removeGroup = function(groupId, userId, callback) {
    this.http.post('/api/group/remove', {groupId: groupId, userId: userId}).
      error(function(data, status, headers, config) {
        console.log('Couldn\'t remove group.');
      }).
      success(function(data, status, headers, config) {
        console.log('Group removed with id: ' + groupId);
        callback();
      });
  };

  hackIllinois.service('restService', restService);
}());
