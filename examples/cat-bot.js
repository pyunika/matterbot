var Matterbot = require("../lib/matterbot.js");

var matterbot = new Matterbot({
  listenerPort: 6000,
  listenerToken: "your-token",
  responseUrl: "http://your-mattermost-host/hooks/your-token"
});

matterbot.addHandler(function(message, respond){
  if (message.text.toLowerCase().includes("catbot")){
    var cat = getCat(message);
    respond({
      text: cat,
      username: "catbot",
      icon_url: "http://a.deviantart.net/avatars/p/o/poptartcat.gif?2"
    });
  }
});

var getCat = function(message){
  if (message.text.toLowerCase().includes("nyan")){
    return "![nyan cat](https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif)";
  } else {
    var timestamp = new Date().valueOf();
    return "![cat](http://thecatapi.com/api/images/get?cache_buster=" + timestamp + ")";
  }
};
