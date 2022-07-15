'use strict'
let fs = require('fs');

function CSVtoFunction(path) {
    let fileContent = fs.readFileSync("city.csv", "utf8");

    fileContent = fileContent.split("\r\n")
    .filter((line) => (line[0] !== "#" && line.length !== 0))
    .map((line) => {
        line.replace("#", "")
        let array = line.split(",");
        return {
            x: array[0],
            y: array[1],
            name: array[2],
            population: array[3],
        }
    })
    .sort((a, b) => b.population - a.population)
    .slice(0, 10)
    /* Ниже 6-ой пункт задачи, который попал под сокращение при оптимизации итогового решения */

    // .reduce((a, b, i) => (a[b.name] = {population: b.population, rating: i + 1}, a), {})    
    // let ownProperty = Object.getOwnPropertyNames(fileContent);
    // console.log(ownProperty);
    // return (text) => ownProperty.reduce((a, b) => a.replace(b, `${b} (${fileContent[b].rating} место в ТОП-10 самых крупных городов Украины, население ${fileContent[b].population} человек)`), text);

    return (text) => fileContent.reduce((a, b, i) => a.replace(b.name, `${b.name} (${i + 1} место в ТОП-10 самых крупных городов Украины, население ${b.population} человек)`), text);   

}

let text = "Киев столица Украины, Одесса - морской порт, Львов - красивый город западной Украины."
let improveText = CSVtoFunction("city.csv");
console.log(improveText(text));