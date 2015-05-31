/*
* @Author: Bhargav Krishna
* @Date:   2015-05-31 04:38:38
* @Last Modified by:   Bhargav Krishna
* @Last Modified time: 2015-05-31 06:09:59
*/

'use strict';
var Server = require('bittorrent-tracker').Server;
var express = require('express');
var app = express();

// https://wiki.theory.org/BitTorrentSpecification#peer_id
var whitelist = {
  UT: true // uTorrent
};

var server = new Server({
  http: false, // we do our own
  udp: false,  // not interested
  filter: function (params) {
    // black/whitelist for disallowing/allowing specific clients [default=allow all]
    // this example only allows the uTorrent client
    //var client = params.peer_id[1] + params.peer_id[2];
    return true;//whitelist[client];
  }
});

var onHttpRequest = server.onHttpRequest.bind(server);
app.get('/announce', onHttpRequest);
app.get('/scrape', onHttpRequest);

app.listen(8080);
