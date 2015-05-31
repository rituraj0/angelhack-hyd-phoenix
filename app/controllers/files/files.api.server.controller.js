/*
* @Author: Bhargav Krishna
* @Date:   2015-05-31 07:08:07
* @Last Modified by:   Bhargav Krishna
* @Last Modified time: 2015-05-31 08:20:52
*/

'use strict';
var _ = require('lodash'),
  errorHandler = require('../errors.server.controller'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  User = mongoose.model('User');
/*var cps = require('cps-api');
var conn = new cps.Connection('tcp://cloud-eu-0.clusterpoint.com:9007', 'phoenix-db', 'ybbkrishna@gmail.com', '9866317859', 'document', 'document/id', {account: 852});
/*
* upload files to cluster point
*/
exports.upload = function(req, res) {
  var user = req.user;
  var files = req.body.files;
  if(typeof files === 'string') {
    files = JSON.parse(files);
  }
  for (var i = files.length - 1; i >= 0; i--) {
    user.files.push(files[i]);
  }
  user.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.status(200).send({success : true});
    }
  });
};

exports.getFilesFromUser = function(req, res, next) {
  var user = req.param('user');
  User.findOne({_id : user}, function(err, usr) {
    if(err)
      return next(err);
    res.status(400).send(usr.files);
  });
};

exports.searchFiles = function(req, res) {
  //User.find()
};
