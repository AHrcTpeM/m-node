const net = require('net');

const port = 8080;
const host = 'localhost';
const text = "Good afternoon, handsome.";

const client = new net.Socket();
const time = new Date().getTime();

client.connect({ port: port, host: host }, function() {
    client.write(text);
});

client.on('data', function(chunk) {
    if (chunk.toString() === text) {
        console.log(chunk.toString());
        console.log(`Мы получили тот же текст, который отправили за ${new Date().getTime() - time} мс`);
    } else {
        console.log(`Мы получили не тот текст, который отправили`);
    } 
    
    client.end();
});

client.on('end', function() {
    console.log('Requested an end to the TCP connection');
});