const net = require('net');
const port = 8080;

const server = net.createServer();

server.listen(port, function() {
    console.log(`Server listening for connection requests on socket localhost: ${port}`);
});

server.on('connection', function(socket) {
    console.log('>> A new connection >>');
    
    socket.on('data', function(chunk) {
        console.log(`Request time: ${new Date().toUTCString()}\nUser IP: ${socket.remoteAddress}` + 
        `:${socket.remotePort}\n${chunk.toString()}`);
        socket.write(chunk);
    });
    
    socket.on('end', function() {
        console.log('>> Closing connection >>\n');
    });
    
    socket.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
});