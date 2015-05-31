/*
* @Author: Bhargav Krishna
* @Date:   2015-04-20 00:21:11
* @Last Modified by:   Bhargav Krishna
* @Last Modified time: 2015-05-30 17:30:42
*/
/* global jQuery */
'use strict';
angular.module('core').directive('heightResize', ['$window', 'CacheService', function($window, CacheService) {
    return {
        link: function(scope, elem, attrs) {
          var isBound = CacheService.get('heightResizeBound');
          scope.onResize = function() {
            jQuery('.content').css('height', jQuery(window).height() - 101 + 'px');
          };
          scope.onResize();
          if(!isBound) {
            angular.element($window).bind('resize', function() {
                scope.onResize();
            });
          }
          CacheService.set('heightResizeBound', true);
      }
    };
}]);
