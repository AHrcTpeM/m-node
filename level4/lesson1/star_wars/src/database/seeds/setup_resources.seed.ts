import { DataSource, DataSourceOptions, EntityTarget } from 'typeorm';
import { People } from '../../people/entities/people.entity';
import { Films } from '../../films/entities/film.entity';
import { Planets } from '../../planets/entities/planet.entity';
import { Species } from '../../species/entities/species.entity';
import { Starships } from '../../starships/entities/starship.entity';
import { Vehicles } from '../../vehicles/entities/vehicle.entity';
import fetch from 'node-fetch';
import { genSalt, hash }  from 'bcrypt';
import 'dotenv/config';
import { Users } from '../../users/entities/user.entity';
import { Role } from '../../auth/roles/role.enum';

const options: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    entities: [__dirname + '/../../**/*.entity.{js,ts}'],
    synchronize: true
  }

async function synchronizeDatabase(options: DataSourceOptions) {
    const dataSource = new DataSource(options);
    await dataSource.initialize();
    console.log('Start - seeding');
    
    await addData(dataSource, Films);
    await addData(dataSource, People);
    await addData(dataSource, Planets);
    await addData(dataSource, Species);
    await addData(dataSource, Starships);
    await addData(dataSource, Vehicles);

    await addUsers(dataSource);

    console.log('Finish - seeding');
    await dataSource.destroy();
}

async function addData<T>(dataSource: DataSource, target: EntityTarget<T>) {
    const resource = target.toString().split(' ')[1].toLowerCase();
    const repository = dataSource.getRepository(target);
    const array = [];
    const result = await fetch(`https://swapi.dev/api/${resource}`).then(response => response.json());
    const countPages = Math.ceil(+result.count / 10);
    for (let i = 1; i <= countPages; i++) {
        await fetch(`https://swapi.dev/api/${resource}/?page=${i}`)
        .then(response => response.json())
        .then(result => array.push(...result.results))
        .catch((err) => {});        
    }   
        
    for (let i = 0; i < array.length; i++) {
        let {created, edited, ...entity} = array[i];
        replaceURLinEntity(entity);   // swapi.dev -> localhost:3000
        let element = Object.assign({}, entity); // copy что бы не занулять сразу в двух местах       
        element = await addRelations(resource, element, entity, dataSource);        
        await repository.save(element);    
    }
    const count = await repository.count();
    console.log(` - added ${count} ${resource}`);    
}

function replaceURLinEntity(element) {
    for (let key in element) {
        element[key] = Array.isArray(element[key]) ? 
                       element[key].map((e) => e.replace('https://swapi.dev/api', `http://${process.env.HOST}:${process.env.PORT}`)) : 
                           typeof element[key] === 'string' ? 
                           element[key].replace('https://swapi.dev/api', `http://${process.env.HOST}:${process.env.PORT}`) : 
                           element[key]
    }
}

async function addRelations(resource, element, array, dataSource) {
    if (resource === 'films') {
        return element;
    }

    element.films = [];
    for (let j = 0; j < array.films.length; j++) {
        element.films.push(await dataSource.getRepository(Films).findOneBy({ url: array.films[j] }));
    }

    if (resource === 'people') {
        element.image = [];   
    }
    if (resource === 'planets') {
        element.residents = [];
        for (let j = 0; j < array.residents.length; j++) {
            element.residents.push(await dataSource.getRepository(People).findOneBy({ url: array.residents[j] }));
        }              
    }
    if (resource === 'species') {
        element.people = [];
        for (let j = 0; j < array.people.length; j++) {
            element.people.push(await dataSource.getRepository(People).findOneBy({ url: array.people[j] }));
        }  
    }
    if (resource === 'starships' || resource === 'vehicles') {
        element.pilots = [];
        for (let j = 0; j < array.pilots.length; j++) {
            element.pilots.push(await dataSource.getRepository(People).findOneBy({ url: array.pilots[j] }));
        }                 
    }
    return element;
}

async function addUsers(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Users);
    const users = [{ username: 'john', password: await hash('changeme', await genSalt()) },
                   { username: 'chris', password: await hash('secret', await genSalt()) },
                   { username: 'maria', password: await hash('guess', await genSalt()) },
                   { username: 'admin', password: await hash('admin', await genSalt()), roles: Role.Admin }];
    for (let i = 0; i < users.length; i++) {
        await repository.save(users[i]);
    }
    const count = await repository.count();
    console.log(` - added ${count} users`);    
    return;
}

synchronizeDatabase(options);