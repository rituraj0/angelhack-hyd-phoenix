/*
* @Author: Bhargav Krishna
* @Date:   2014-10-02 01:10:13
* @Last Modified by:   Bhargav Krishna
* @Last Modified time: 2015-05-31 10:16:15
*/

/*global jQuery */
'use strict';

angular.module('core').controller('SideBarController', ['$scope', 'Authentication', 'Menus', 'UserService', 'CacheService',
	function($scope, Authentication, Menus, UserService, CacheService) {
		$scope.authentication = Authentication;
		$scope.menu = Menus.getMenu('topbar');
    this.users = [];
    var that =this;
    var users = UserService.getUsers();
    users.then(function(data) {
      that.users = data;
      var html = '<li class="active"><a href="/#!/user-files/{{id}}"><i class="fa fa-user"></i> <span>{{user.name}}</span></a></li>';
      var innerHtml = '';
      for(var id in data) {
        innerHtml+=(html.replace('{{id}}', id).replace('{{user.name}}',data[id].displayName));
      }
      jQuery('.sidebar-menu').html(innerHtml);
    });
	}
]);
