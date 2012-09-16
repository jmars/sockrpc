if !window.JSON? then window.JSON = require 'json3'
SockJS = require 'sockjs-client'
UUID = require 'uuid'
Future = require 'future'
Remote = require 'remote'

if Server?
  Socket = new WebSocket "ws://#{window.location.hostname}:3000"
else
  Socket = new SockJS "http://#{window.location.hostname}:3000/socket"

Remote = {}
port = send: (data) -> Socket.send data

module.exports = (keys) ->
  Remote = RPC port, {}, keys
  do connect = ->
    Socket.onmessage = ({data}) -> port.recieve data
    Socket.onopen = port.open
    Socket.onclose = ->
      port.close()
      setTimeout ->
        Socket = new SockJS "http://#{window.location.hostname}:3000/socket"
        connect()
      , 5000