var Hapi = require("hapi");

module.exports.start = function(port, handler){
  var server = new Hapi.Server();
  server.connection({
    port: port
  });

  server.route({
    method: "POST",
    path: "/",
    handler: function(request, response){
      handler(request.payload);
      response("ok");
    }
  });

  server.start(function(){
    console.log("Matterbot listening on port " + port);
  });
  return server;
};
