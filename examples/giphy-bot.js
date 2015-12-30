var axios = require("axios");
var Matterbot = require("../lib/matterbot.js");
var request = require("request");

var r = request.defaults({'proxy':'http://your-proxy-server/'});

var matterbot = new Matterbot({
  listenerPort: 6001,
  listenerToken: "your-token",
  responseUrl: "http://your-mattermost-host/hooks/your-token"
});

var parsePhrase = function(text){
  var phrase = text.replace("/giphy", "").trim();
  return encodeURIComponent(phrase);
};

matterbot.addHandler(function(message, respond){
  var phrase = parsePhrase(message.text);
  var giphyUrl = "http://api.giphy.com/v1/gifs/translate?rating=pg&api_key=dc6zaTOxFJmzC&fmt=json&s=" + phrase;
  r.get(giphyUrl, function(error, response, body){
    var data = JSON.parse(body).data;
    var gifUrl = data.images.original.url;
    var newText = "![GIFs powered by giphy](" + gifUrl + ")";
    respond({
      text: newText,
      username: "giphy-bot",
      icon_url: "http://giphy.com/static/img/giphy_logo_laser.gif",
      channel: message.channel_name
    });
  });
});
