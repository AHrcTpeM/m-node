import fetch from 'node-fetch';
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