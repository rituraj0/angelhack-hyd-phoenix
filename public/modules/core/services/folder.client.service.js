/*
* @Author: Bhargav Krishna
* @Date:   2015-05-30 20:26:41
* @Last Modified by:   Bhargav Krishna
* @Last Modified time: 2015-05-30 22:28:10
*/

'use strict';
angular.module('core').factory('FolderService', function() {
    var files = [];
    var fileService = {};

    fileService.add = function(file) {
        files.push(file);
    };
    fileService.list = function() {
        return files;
    };

    return fileService;
});
