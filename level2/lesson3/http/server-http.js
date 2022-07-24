const http = require("http");
const fs = require("fs");
  
http.createServer(function(request, response){
     
    if (request.url === "/"){
        let data = "";
        request.on("data", chunk => {
            data += chunk;
        });
        request.on("end", () => {
            let log = `Request time: ${new Date().toUTCString()}\nUser IP: ${request.socket.remoteAddress}` + 
            `:${request.socket.remotePort}\nReceived text: ${data}`

            console.log(log);
            fs.appendFileSync("log/log.txt", log + "\n");

            response.write(data);
            response.end();
            console.log(">> Closing connection >>\n");
        });

    } else {
        response.statusCode = 404; 
        response.write("Not Found++");
        response.end();
    }

}).listen(3000, function(){
    console.log("Server started at 3000");
});