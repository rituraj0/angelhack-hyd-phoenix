/* 
* @Author: Bhargav Krishna
* @Date:   2014-10-02 01:51:59
* @Last Modified by:   Bhargav Krishna
* @Last Modified time: 2015-05-30 17:28:43
*/

'use strict';
angular.module('core').service('CacheService', function() {
	var properties = {};
    
    this.setProperty = function setProperty(name,value) {
    	properties[name] = value;
    };

    this.getProperty = function getProperty(name) {
    	return properties[name];
    };

    this.removeProperty = function removeProperty(name) {
    	properties[name] = undefined;
    };

    this.resetProperty = function resetProperty() {
        properties = {};
    };

    this.set = this.setProperty;

    this.get = this.getProperty;

});
