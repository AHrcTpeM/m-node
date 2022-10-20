"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const people_entity_1 = require("../../people/entities/people.entity");
const film_entity_1 = require("../../films/entities/film.entity");
const planet_entity_1 = require("../../planets/entities/planet.entity");
const species_entity_1 = require("../../species/entities/species.entity");
const starship_entity_1 = require("../../starships/entities/starship.entity");
const vehicle_entity_1 = require("../../vehicles/entities/vehicle.entity");
const node_fetch_1 = require("node-fetch");
const bcrypt_1 = require("bcrypt");
require("dotenv/config");
const user_entity_1 = require("../../users/entities/user.entity");
const role_enum_1 = require("../../auth/roles/role.enum");
const options = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
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
    await addUsers(dataSource);
    console.log('Finish - seeding');
    await dataSource.destroy();
}
async function addData(dataSource, target) {
    const resource = target.toString().split(' ')[1].toLowerCase();
    const repository = dataSource.getRepository(target);
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
        let _a = array[i], { created, edited } = _a, entity = __rest(_a, ["created", "edited"]);
        replaceURLinEntity(entity);
        let element = Object.assign({}, entity);
        element = await addRelations(resource, element, entity, dataSource);
        await repository.save(element);
    }
    const count = await repository.count();
    console.log(` - added ${count} ${resource}`);
}
function replaceURLinEntity(element) {
    for (let key in element) {
        element[key] = Array.isArray(element[key]) ?
            element[key].map((e) => e.replace('swapi.dev', `${process.env.HOST}:${process.env.PORT}`)) :
            typeof element[key] === 'string' ?
                element[key].replace('swapi.dev', `${process.env.HOST}:${process.env.PORT}`) :
                element[key];
    }
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
            element.residents.push(await dataSource.getRepository(people_entity_1.People).findOneBy({ url: array.residents[j] }));
        }
    }
    if (resource === 'species') {
        element.people = [];
        for (let j = 0; j < array.people.length; j++) {
            element.people.push(await dataSource.getRepository(people_entity_1.People).findOneBy({ url: array.people[j] }));
        }
    }
    if (resource === 'starships' || resource === 'vehicles') {
        element.pilots = [];
        for (let j = 0; j < array.pilots.length; j++) {
            element.pilots.push(await dataSource.getRepository(people_entity_1.People).findOneBy({ url: array.pilots[j] }));
        }
    }
    return element;
}
async function addUsers(dataSource) {
    const repository = dataSource.getRepository(user_entity_1.Users);
    const users = [{ username: 'john', password: await (0, bcrypt_1.hash)('changeme', await (0, bcrypt_1.genSalt)()) },
        { username: 'chris', password: await (0, bcrypt_1.hash)('secret', await (0, bcrypt_1.genSalt)()) },
        { username: 'maria', password: await (0, bcrypt_1.hash)('guess', await (0, bcrypt_1.genSalt)()) },
        { username: 'admin', password: await (0, bcrypt_1.hash)('admin', await (0, bcrypt_1.genSalt)()), roles: role_enum_1.Role.Admin }];
    for (let i = 0; i < users.length; i++) {
        await repository.save(users[i]);
    }
    const count = await repository.count();
    console.log(` - added ${count} users`);
    return;
}
synchronizeDatabase(options);
//# sourceMappingURL=setup_resources.seed.js.map