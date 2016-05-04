# Matterbot

Matterbot is a super-simple bot-client for Mattermost.

# Why not Hubot?

Hubot is probably awesome if you need a full-time mega-bot army. If you just need a tiny little bot to test an idea, or to prank your friends, you could use Matterbot. It's just a library, and you can be up and running in just a few lines of code.

# How do I use it?

You can clone the repo, or install via npm: `npm install --save matterbot`.

Check out the [basic example](matterbot/examples/basic.js) to get an idea of how Matterbot works. The API is super simple.

```
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
    respond({text: greeting});
  }
});
```

You'll also need to configure some webhooks in Mattermost.

First, you'll want to configure an [Outgoing Webhook](http://docs.mattermost.com/developer/webhooks-outgoing.html) that your Matterbot listens to. The Outgoing webhook will either be all of the messages from a channel, or all of the messages from all channels that start with a key you define (e.g. /gif, for a gifbot). Your code will parse the messages it hears, and decide whether to respond. The listenerport and listener token in your Matterbot script correlate to the Outgoing Webhook.

Then you have to configure an [Incoming Webhook](http://docs.mattermost.com/developer/webhooks-incoming.html) for Matterbot to respond on. When your code calls `respond` it will be invoking this webhook. The responseUrl in your Matterbot script correlates to the Incoming Webhook.

Our team has moved on to Rocket.chat, so I probably won't be putting too much work into Matterbot going forward. But the code works, so feel free to use it for whatever!
