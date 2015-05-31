'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
	chalk = require('chalk');
var compress = require('compression');
var debug = require('debug')('instant');
var express = require('express');
var fs = require('fs');
var http = require('http');
//var https = require('https');
var jade = require('jade');
var parallel = require('run-parallel');
var path = require('path');
var url = require('url');
var twilio = require('twilio');
var secret = {};
secret.twilio = {
  accountSid: 'ACd287ef2c08ed8ab25867d00b1f3842bf',
  authToken: '15dc8980180b5d2b4a699e92647df693'
};
var iceServers,
    twilioClient = twilio(secret.twilio.accountSid, secret.twilio.authToken);
/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */


function error (err) {
  console.error(err.stack || err.message || err);
}


// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

// Init the express application
var app = require('./config/express')(db);
app.use(function (req, res, next) {
  // Add cross-domain header for fonts, required by spec, Firefox, and IE.
  var extname = path.extname(url.parse(req.url).pathname);
  if (['.eot', '.ttf', '.otf', '.woff', '.woff2'].indexOf(extname) >= 0) {
    res.header('Access-Control-Allow-Origin', '*');
  }

  // Prevents IE and Chrome from MIME-sniffing a response. Reduces exposure to
  // drive-by download attacks on sites serving user uploaded content.
  res.header('X-Content-Type-Options', 'nosniff');

  // Prevent rendering of site within a frame.
  res.header('X-Frame-Options', 'DENY');

  // Enable the XSS filter built into most recent web browsers. It's usually
  // enabled by default anyway, so role of this headers is to re-enable for this
  // particular website if it was disabled by the user.
  res.header('X-XSS-Protection', '1; mode=block');

  // Force IE to use latest rendering engine or Chrome Frame
  res.header('X-UA-Compatible', 'IE=Edge,chrome=1');

  next();
});

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;
require('./config/tracker/ws-tracker.js');
// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);
