import axios from 'axios';
import { Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Factory, Seeder } from 'typeorm-seeding';

import { Species } from '../../species/entities/species.entity';

@Injectable()
export default class SpeciesSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    async function recursiveRunner(url: string): Promise<undefined> {
      const response = await axios.get(url).then((response) => response.data);

      const arraySpecies: Species[] = await Promise.all(response.results.map(async (result) => {            
        const remoteHost = 'https://swapi.dev/api';
        const myHost = `http://${process.env.HOST}:${process.env.PORT}`;

        const specie: Species = result;
        const {created, edited, ...props} = specie;
        return {
          ...props,
          url: specie.url.replace(remoteHost, myHost),
          homeworld: specie.homeworld?.replace(remoteHost, myHost),
          films: result.films.map((film) => film.replace(remoteHost, myHost)),
          people: result.people.map((people) => people.replace(remoteHost, myHost))
        };
      }))

      const copyArraySpecies = arraySpecies.map((species) => { return {
        url: species.url,
        films: species.films,
        people: species.people
      }})

      await connection
        .createQueryBuilder()
        .insert()
        .into(Species)
        .values(arraySpecies)
        .execute();

      await Promise.all(copyArraySpecies.map(async (species) => {
        await connection
          .createQueryBuilder()
          .relation(Species, "films")
          .of(species.url)
          .add(species.films);
        
        await connection
          .createQueryBuilder()
          .relation(Species, "people")
          .of(species.url)
          .add(species.people);
      }))     
      
      if (response.next) {
        return recursiveRunner(response.next);
      }
    }
    const url = 'https://swapi.dev/api/species/?page=1';
    return recursiveRunner(url);
  }
}
