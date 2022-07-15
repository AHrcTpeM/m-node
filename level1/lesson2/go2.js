'use strict'
function readHttpLikeInput(){
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for(;;){ 
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) {break; /* windows */}
        if(buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10) 
                break;
            was10++;
        } else 
           was10 = 0;
        res += new String(buffer);
    }

    return res;
}

let contents = readHttpLikeInput();

// вот эту функцию собственно надо написать
function parseTcpStringAsHttpRequest(string) { 
    let regMethod = /^.+?(?=\s)/;
    let regUri = /(?<=\s).+?(?=\s)/;
    let regHeaders = /^.+:.+(?=\n)/gm;
    let regBody = /(?<=^\n).+/gm;

  return { 
    method: string.match(regMethod)[0], 
    uri: string.match(regUri)[0], 
    headers:  regHeaders.test(string) ? string.match(regHeaders).map((e) => e.split(": ")) : '', 
    body: regBody.test(string) ? string.match(regBody)[0] : '',
  }; 
}

let http = parseTcpStringAsHttpRequest(contents);
console.log(JSON.stringify(http, undefined, 2));