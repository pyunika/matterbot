var axios = require("axios");

var Talker = function(responseUrl){
  this.responseUrl = responseUrl;
};

Talker.prototype.say = function(message){
  axios.post(this.responseUrl, message, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(this.onResponse.bind(this))
  .catch(console.error);
};

Talker.prototype.onResponse = function(response){
  if (response.status !== 200){
    console.error(response);
  }
};

module.exports = Talker;
