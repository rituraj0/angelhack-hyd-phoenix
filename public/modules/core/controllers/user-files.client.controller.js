/*
* @Author: Bhargav Krishna
* @Date:   2015-05-31 08:46:17
* @Last Modified by:   Bhargav Krishna
* @Last Modified time: 2015-05-31 12:22:28
*/

'use strict';
angular.module('core').controller('UserFilesController', ['$scope', '$state', '$stateParams', 'CacheService',
  function  ($scope, $state, $stateParams, CacheService) {
    var user = $stateParams.id;
    this.files = CacheService.get('users')[user].files;
    this.user = CacheService.get('users')[user];
  }
]);
