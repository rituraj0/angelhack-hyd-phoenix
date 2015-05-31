/*
* @Author: Bhargav Krishna
* @Date:   2015-05-31 07:07:31
* @Last Modified by:   Bhargav Krishna
* @Last Modified time: 2015-05-31 07:48:19
*/

'use strict';
/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
  // User Routes
  var files = require('../../app/controllers/files.server.controller');

  // Setting up the users profile api
  app.route('/files').get(files.getFilesFromUser);
  app.route('/files').post(files.upload);
};
