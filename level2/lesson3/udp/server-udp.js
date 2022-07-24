const udp = require('dgram');
const server = udp.createSocket('udp4');

server.on('listening',function(){
    console.log('Server is listening at port ' + server.address().port);
});

server.on('message', function(msg, info){
    console.log(`Request time: ${new Date().toUTCString()}\nUser IP: ${info.address}` + 
        `:${info.port}\n${msg.toString()}`); 
    
    server.send(msg, info.port, 'localhost', function(error) {
        if (error) {
            client.close();
        } else {
            console.log('>> Closing connection >>\n');
        }
    });
});

server.on('error',function(error){
    console.log('Error: ' + error);
    server.close();
});

server.bind(7788);