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

function outputHttpResponse(statusCode, statusMessage, headers, body) {
    console.log(`HTTP/1.1 ${statusCode} ${statusMessage}
${headers.replace("Content-Length:",`$& ${(body + "").length}`)}

${body}`);
}

function processHttpRequest($method, $uri, $headers, $body) {
    let host = $headers.filter((e) => e[0] === "Host");
    if (host.length > 0) host = host[0][1].split(".")[0];

    if ($uri === "/") $uri = "/index.html"

    let existFile = true;
    let file; 
    try {
        // split for check exact inclusion, not substring
        file = require("fs").readFileSync(host + $uri, 'utf8');
    } catch(err) {``
        existFile = false;
    }

    let headers = `Date: ${new Date().toUTCString()}
Server: Apache/2.2.14 (Win32)
Content-Length:
Connection: Closed
Content-Type: text/html; charset=utf-8`

    if (existFile && $method === "GET") {
        outputHttpResponse("200", "OK", headers, file);
    } else if (!existFile && $method === "GET") {
        outputHttpResponse("404", "Not Found", headers, "not found");
    } else {
        outputHttpResponse("400", "Bad Request", headers, "not found");
    }
}

function parseTcpStringAsHttpRequest(string) { 
    let reg1 = /^.+?(?=\s)/;
    let reg2 = /(?<=\s).+?(?=\s)/;
    let reg3 = /^.+:.+(?=\n)/gm;
    let reg4 = /(?<=^\n).+/gm;

  return { 
    method: string.match(reg1)[0], 
    uri: string.match(reg2)[0], 
    headers:  reg3.test(string) ? string.match(reg3).map((e) => e.split(": ")) : '', 
    body: reg4.test(string) ? string.match(reg4)[0] : '',
  }; 
}

let http = parseTcpStringAsHttpRequest(contents);
processHttpRequest(http.method, http.uri, http.headers, http.body);
