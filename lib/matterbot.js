var listener = require("./listener.js");
var mergeDefaults = require("lodash").defaults;
var partial = require("lodash").partial;
var Talker = require("./talker.js");

var defaults ={
  listenerPort: 2187,
  listenerToken: "secret-outgoing-webhooks-token",
  responseUrl: "http://your-server:your-port/hooks/secret-incoming-webhooks-token"
};

var Matterbot = function(options){
  this.settings = mergeDefaults(options || {}, defaults);
  listener.start(this.settings.listenerPort, this.onListenerMessage.bind(this));
  this.talker = new Talker(this.settings.responseUrl);
  this.handlers = [];
};

Matterbot.prototype.onListenerMessage = function(message){
  if (message.token === this.settings.listenerToken){
    console.info("Incoming:" + message.text);
    var runHandler = partial(this.runHandler.bind(this), message);
    this.handlers.forEach(runHandler);
  } else {
    console.error("Invalid token. Make sure to set the `listenerToken` option when starting Matterbot");
  }
};

Matterbot.prototype.addHandler = function(handler){
  this.handlers.push(handler);
};

Matterbot.prototype.runHandler = function(message, handler){
  handler(message, this.talker.say.bind(this.talker));
};

module.exports = Matterbot;
