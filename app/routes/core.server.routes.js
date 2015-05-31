'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
  var twilio = require('twilio');
  var secret = {};
  secret.twilio = {
    accountSid: 'ACd287ef2c08ed8ab25867d00b1f3842bf',
    authToken: '15dc8980180b5d2b4a699e92647df693'
  };
  var iceServers,
      twilioClient = twilio(secret.twilio.accountSid, secret.twilio.authToken);

  function error (err) {
    console.error(err.stack || err.message || err);
  }

  function updateIceServers () {
    twilioClient.tokens.create({}, function (err, token) {
      if (err) return error(err);
      if (!token.ice_servers) {
        return error(new Error('twilio response ' + token + ' missing ice_servers'));
      }

      iceServers = token.ice_servers
        .filter(function (server) {
          var urls = server.urls || server.url;
          return urls && !/^stun:/.test(urls);
        });
      iceServers.unshift({ url: 'stun:23.21.150.121' });

      // Support new spec (`RTCIceServer.url` was renamed to `RTCIceServer.urls`)
      iceServers = iceServers.map(function (server) {
        if (server.urls === undefined) server.urls = server.url;
        return server;
      });
    });
  }

  setInterval(updateIceServers, 60 * 60 * 4 * 1000).unref();
  updateIceServers();
  app.route('/').get(core.index);
  app.route('/rtcConfig').get(function (req, res) {
  if (!iceServers) res.status(404).send({ iceServers: [] });
    else res.send({ iceServers: iceServers });
  });
};
