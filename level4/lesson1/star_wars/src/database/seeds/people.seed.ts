import axios from 'axios';
import { Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Factory, Seeder } from 'typeorm-seeding';

import { People } from '../../people/entities/people.entity';
import { Films } from '../../films/entities/film.entity';

@Injectable()
export default class PeopleSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    async function recursiveRunner(url: string): Promise<undefined> {
      const response = await axios.get(url).then((response) => response.data);

      const arrayPeople: People[] = await Promise.all(response.results.map(async (result) => {            
        const remoteHost = 'https://swapi.dev/api';
        const myHost = `http://${process.env.HOST}:${process.env.PORT}`;

        const people: People = result;
        const {created, edited, homeworld, ...props} = people;
        return {
          ...props,
          url: people.url.replace(remoteHost, myHost),
          //homeworld: result.homeworld.replace(remoteHost, myHost),
          films: result.films.map((film) => film.replace(remoteHost, myHost))
        };
      }))

      const copyPeopleArray = arrayPeople.map((person) => { return {
        url: person.url,
        films: person.films
      }})
      
      await connection
        .createQueryBuilder()
        .insert()
        .into(People)
        .values(arrayPeople)   // меняет массив, рандомно шафлит свойства у объектов
        .execute();
        
      await Promise.all(copyPeopleArray.map(async (person) => { //foreach не работает с промисами
        await connection
          .createQueryBuilder()
          .relation(People, "films")
          .of(person.url)
          .add(person.films);
      }))

      if (response.next) {
        return recursiveRunner(response.next);
      }
    }
    const url = 'https://swapi.dev/api/people/?page=1';
    return recursiveRunner(url);
  }
}
