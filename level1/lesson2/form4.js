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
    let contentType = $headers.filter((e) => e[0] === "Content-Type");
    if (contentType.length > 0) contentType = contentType[0][1];

    let password = $body.split("&").map(e => e.split("="));
    password = password[0][1] + ":" + password[1][1];
    
    let existBD = true;
    let passBD;    
    try {
        // split for check exact inclusion, not substring
        passBD = require("fs").readFileSync("passwords.txt", 'utf8').split("\r\n");
    } catch(err) {
        existBD = false;
    }

    let headers = `Date: ${new Date().toUTCString()}
Server: Apache/2.2.14 (Win32)
Content-Length:
Connection: Closed
Content-Type: text/html; charset=utf-8`
    
    if ($uri === "/api/checkLoginAndPassword" && $method === "POST" && contentType === "application/x-www-form-urlencoded"  && existBD && passBD.includes(password)) {
        outputHttpResponse("200", "OK", headers, `<h1 style="color:green">FOUND</h1>`);
    } else if ($uri === "/api/checkLoginAndPassword" && $method === "POST" && contentType === "application/x-www-form-urlencoded" && existBD &&  !passBD.includes(password)) {
        outputHttpResponse("401", "Bad password", headers, "Invalid login or password");
    } else if ($uri === "/api/checkLoginAndPassword" && $method === "POST" && contentType === "application/x-www-form-urlencoded" && !existBD) {
        outputHttpResponse("500", "Internal Server Error", headers, "Internal Server Error");
    } else if ($uri.slice(0,4) !== "/api" && $method === 'POST') {
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
