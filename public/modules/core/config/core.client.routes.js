'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
		state('share', {
			url: '/share',
			templateUrl: 'modules/core/views/share.client.view.html'
		}).
    state('user-files', {
      url: '/user-files/:id',
      templateUrl: 'modules/core/views/user-files.client.view.html'
    }).
    state('transfer', {
      url: '/transfer',
      templateUrl: 'modules/core/views/transfer.client.view.html'
    });
	}
]);
