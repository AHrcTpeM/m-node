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

/* task 3.1 */
async function getName() {
    let response = await fetch("https://random-data-api.com/api/name/random_name");
    let json = await response.json();
    console.log("In getName:", json.name);
    return json.name;
}

Promise.all([getName(), getName(), getName()]).then(console.log)

/* task 3.2 */
let arrayNames: string[] = [];
getName().then((name) => {
    arrayNames.push(name);
    return getName()
    })
    .then((name) => {
        arrayNames.push(name);
        return getName()
    })
    .then((name) => {
        arrayNames.push(name);
        return arrayNames;
    })
    .then(arr => console.log(arr))

/* task 3.3 */
fetch('https://random-data-api.com/api/name/random_name')
    .then(response => response.json())
    .then(json1 => {
        fetch('https://random-data-api.com/api/name/random_name').then(response => response.json())
        .then(json2 => {
            fetch('https://random-data-api.com/api/name/random_name').then(response => response.json())
                .then(json3 => {
                    console.log([json1.name, json2.name, json3.name]);
            })
        })
    })

/* Task4.1 */
const urls: string[] = []
for (let i = 0; i < 10; i++) {
    urls.push("https://random-data-api.com/api/name/random_name");
}

async function* nameGenerator() {
    for (const url of urls) {
      const response = await fetch(url)
      const data = await response.json()
      yield data.name
    }
  }
  
(async () => {
    for await (const item of nameGenerator()) {
        console.log("4.1", item);
        if (isWomen(item)) {
            break;
        }      
    }
})()

function isWomen(item: string) {
    // todo ;)    
    return Math.random() > 0.5;
}

/* Task4.2 */
function getWomanName() {    
    fetch('https://random-data-api.com/api/name/random_name')
    .then(response => response.json())
    .then(json => {
        console.log("4.2:", json.name);        
        if (!isWomen(json.name)) {
            getWomanName();
        }
    })
}
getWomanName();

/* Task5 */

function foo1(callback: (ip: string) => void, ip: string) {
    callback(ip);
    return ip;
}

async function foo2() {
    let response = await fetch("https://api.ipify.org?format=json");
    let json = await response.json();
    return foo1(console.log, json.ip);
}

foo2();

/* Task6 */

async function foo3() {
    let response = await fetch("https://api.ipify.org?format=json");
    let json = await response.json();
    return json.ip;
}

async function foo4(callback: (ip: string) => void) {
    let ip = await foo3();
    callback(ip);
}

foo4(console.log)
