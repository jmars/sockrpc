// Generated by IcedCoffeeScript 1.3.3e
var RPC, Remote, SockJS, Socket, port,
  __slice = [].slice;

if (!(window.JSON != null)) window.JSON = require('json3');

SockJS = require('sockjs-client');

RPC = require('remote');

if (typeof SERVER !== "undefined" && SERVER !== null) {
  Socket = new WebSocket("ws://" + window.location.hostname + ":3000");
} else {
  Socket = new SockJS("http://" + window.location.hostname + ":3000/socket");
}

Remote = {};

port = {
  send: function(data) {
    return Socket.send(data);
  }
};

module.exports = function() {
  var connect, keys;
  keys = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  Remote = RPC(port, {}, keys);
  (connect = function() {
    Socket.onmessage = function(_arg) {
      var data;
      data = _arg.data;
      return port.recieve(data);
    };
    Socket.onopen = port.open;
    return Socket.onclose = function() {
      port.close();
      return setTimeout(function() {
        Socket = new SockJS("http://" + window.location.hostname + ":3000/socket");
        return connect();
      }, 5000);
    };
  })();
  return Remote;
};
