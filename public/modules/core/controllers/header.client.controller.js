'use strict';
/*global $, jQuery */
angular.module('core').controller('HeaderController', ['$scope', '$window', 'Authentication', 'Menus', 'CacheService',
    function($scope, $window, Authentication, Menus, CacheService) {
        $scope.authentication = Authentication;
        $scope.isCollapsed = false;
        $scope.menu = Menus.getMenu('topbar');

        $scope.toggleCollapsibleMenu = function() {
            $('.wrapper.row-offcanvas.row-offcanvas-left').toggleClass('active relative');
            $('.left-side.sidebar-offcanvas').toggleClass('collapse-left');
            $('.right-side').toggleClass('strech');
        };

        // Collapsing the menu after navigation
        $scope.$on('$stateChangeSuccess', function() {
            $scope.isCollapsed = false;
        });

        var isBound = CacheService.get('heightResizeBound');
    function onresize() {
      jQuery('.drop-target').css('height', jQuery(window).height() - 150 + 'px');
      jQuery('#file-share').css('height', jQuery(window).height() - 120 + 'px');
    }
    onresize();
    if(!isBound) {
      angular.element($window).bind('resize', function() {
          onresize();
      });
    }
    CacheService.set('heightResizeBound', true);
    }
]);
