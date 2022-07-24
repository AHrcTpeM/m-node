import fetch from 'node-fetch';
/* task 1 */
async function goFetch() {
    let response = await fetch("https://api.ipify.org?format=json");
    let json = await response.json();
    console.log("My IP:", json.ip);
}

goFetch();

/* task 2 */
async function getIP() {
    let response = await fetch("https://api.ipify.org?format=json");
    let json = await response.json();
    return Promise.resolve(json.ip);
}

getIP().then((ip) => console.log(ip));
