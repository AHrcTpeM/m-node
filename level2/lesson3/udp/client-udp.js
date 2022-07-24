const udp = require('dgram');
const client = udp.createSocket('udp4');
const time = new Date().getTime();

const text = 'Hi I m the client 1';

client.send(text, 7788, 'localhost', function(error){
    if(error){
      console.log(error);
      client.close();
    }else{
      console.log('Data is sent!');
    }
});

client.on('message', function(msg, info){
    if (msg.toString() === text) {
        console.log(msg.toString());
        console.log(`Мы получили тот же текст, который отправили за ${new Date().getTime() - time} мс`);
    } else {
        console.log(`Мы получили не тот текст, который отправили`);
    }

    client.close();
});