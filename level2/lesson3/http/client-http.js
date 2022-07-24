const http = require('http');

let text = "Добрый день, everybody!";
let options = {
    host: 'localhost',
    port: 3000,
    path: '/',
    method: 'POST'
};
const time = new Date().getTime();

let reqPost = http.request(options, (res) => {
    let data = "";
    res.on('data', (chunks) => {
        data += chunks; // chunks.toString()
        if (data === text) {
            console.log(data);
            console.log(`Мы получили тот же текст, который отправили за ${new Date().getTime() - time} мс`);
        } else {
            console.log(`Мы получили не тот текст, который отправили`);
        }        
        //process.stdout.write(chunks);  // вместо console.log
    });
});

reqPost.write(text);
reqPost.end();

reqPost.on('error', (err) => {
    console.error(err);
});