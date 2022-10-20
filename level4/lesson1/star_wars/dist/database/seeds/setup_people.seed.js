"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const people_entity_1 = require("./../../people/entities/people.entity");
const film_entity_1 = require("./../../films/entities/film.entity");
const planet_entity_1 = require("./../../planets/entities/planet.entity");
const species_entity_1 = require("./../../species/entities/species.entity");
const starship_entity_1 = require("./../../starships/entities/starship.entity");
const vehicle_entity_1 = require("./../../vehicles/entities/vehicle.entity");
const node_fetch_1 = require("node-fetch");
require("dotenv/config");
const options = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.USER,
    database: 'db_mvc',
    password: process.env.PASSWORD,
    entities: [__dirname + '/../../**/*.entity.{js,ts}'],
    synchronize: true
};
async function synchronizeDatabase(options) {
    const dataSource = new typeorm_1.DataSource(options);
    await dataSource.initialize();
    console.log('Start - seeding');
    await addData(dataSource, film_entity_1.Films);
    await addData(dataSource, people_entity_1.People);
    await addData(dataSource, planet_entity_1.Planets);
    await addData(dataSource, species_entity_1.Species);
    await addData(dataSource, starship_entity_1.Starships);
    await addData(dataSource, vehicle_entity_1.Vehicles);
    console.log('Finish - seeding');
    await dataSource.destroy();
}
async function addData(dataSource, repo) {
    const resource = repo.toString().split(' ')[1].toLowerCase();
    const repository = dataSource.getRepository(repo);
    const array = [];
    const result = await (0, node_fetch_1.default)(`https://swapi.dev/api/${resource}`).then(response => response.json());
    const countPages = Math.ceil(+result.count / 10);
    for (let i = 1; i <= countPages; i++) {
        await (0, node_fetch_1.default)(`https://swapi.dev/api/${resource}/?page=${i}`)
            .then(response => response.json())
            .then(result => array.push(...result.results))
            .catch((err) => { });
    }
    for (let i = 0; i < array.length; i++) {
        let element = Object.assign({}, array[i]);
        element = await addRelations(resource, element, array[i], dataSource);
        await repository.save(element);
    }
    const count = await repository.count();
    console.log(` - added ${count} ${resource}`);
}
async function addRelations(resource, element, array, dataSource) {
    if (resource === 'films') {
        return element;
    }
    element.films = [];
    for (let j = 0; j < array.films.length; j++) {
        element.films.push(await dataSource.getRepository(film_entity_1.Films).findOneBy({ url: array.films[j] }));
    }
    if (resource === 'people') {
        element.image = [];
    }
    if (resource === 'planets') {
        element.residents = [];
        for (let j = 0; j < array.residents.length; j++) {
            element.residents.push(await dataSource.getRepository(film_entity_1.Films).findOneBy({ url: array.residents[j] }));
        }
    }
    if (resource === 'species') {
        element.people = [];
        for (let j = 0; j < array.people.length; j++) {
            element.people.push(await dataSource.getRepository(film_entity_1.Films).findOneBy({ url: array.people[j] }));
        }
    }
    if (resource === 'starships' || resource === 'vehicles') {
        element.pilots = [];
        for (let j = 0; j < array.pilots.length; j++) {
            element.pilots.push(await dataSource.getRepository(film_entity_1.Films).findOneBy({ url: array.pilots[j] }));
        }
    }
    return element;
}
synchronizeDatabase(options);
//# sourceMappingURL=setup_people.seed.js.map