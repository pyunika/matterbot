var sample = require("lodash").sample;
var Matterbot = require("../lib/matterbot.js");

var matterbot = new Matterbot({
  listenerPort: 6000,
  listenerToken: "your-outgoing-webhooks-token",
  responseUrl: "http://your-server/hooks/your-incoming-webhooks-token"
});

var greetings = [
  "Hi, ",
  "Hello, ",
  "Howdy, "
];

matterbot.addHandler(function(message, respond){
  if (message.text.toLowerCase().includes("matterbot")){
    var greeting = sample(greetings) + message.user_name + ".";
    respond(greeting);
  }
});
