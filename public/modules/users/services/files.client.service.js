/*
* @Author: Bhargav Krishna
* @Date:   2015-05-31 07:49:37
* @Last Modified by:   Bhargav Krishna
* @Last Modified time: 2015-05-31 10:23:29
*/

'use strict';
angular.module('users').service('UserService', ['$http', '$q', 'CacheService',
  function($http, $q, CacheService) {
    var userMap = {};
    this.getFiles = function getFiles(id) {
      var deferred = $q.defer();
      $http.get('/files?user='+id).
      success(function(data, status, headers, config) {
        deferred.resolve(data);
      }).
      error(function(data, status, headers, config) {
        deferred.reject(data);
      });
      return deferred.promise;
    };

    this.uploadFiles = function uploadFiles(files) {
      var deferred = $q.defer();
      var data = {};
      data.files = files;
      if(typeof data !== 'string')
        data = angular.toJson(data);
      $http.post('/files', data).
      success(deferred.resolve).
      error(deferred.reject);
      return deferred.promise;
    };

    function createUserMap(users) {
      var map = {};
      users.forEach(function(user) {
        map[user._id] = user;
      });
      return map;
    }

    this.getUsers = function getUsers() {
      var deferred = $q.defer();
      var users = CacheService.get('users');
      if(users) {
        deferred.resolve(users);
      }
      else {
        $http.get('/users').
        success(function(data) {
          userMap = createUserMap(data);
          CacheService.set('users',userMap);
          deferred.resolve(userMap);
        }).
        error(deferred.reject);
      }
      return deferred.promise;
    };


  }
]);
