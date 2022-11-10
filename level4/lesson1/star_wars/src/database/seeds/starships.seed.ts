import axios from 'axios';
import { Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Factory, Seeder } from 'typeorm-seeding';
import { Starships } from '../../starships/entities/starship.entity';

@Injectable()
export default class StarshipsSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    async function recursiveRunner(url: string): Promise<undefined> {
      const response = await axios.get(url).then((response) => response.data);

      const arraystarships: Starships[] = await Promise.all(response.results.map(async (result) => {            
        const remoteHost = 'https://swapi.dev/api';
        const myHost = `http://${process.env.HOST}:${process.env.PORT}`;

        const starships: Starships = result;
        const {created, edited, ...props} = starships;
        return {
          ...props,
          url: starships.url.replace(remoteHost, myHost),
          films: result.films.map((film) => film.replace(remoteHost, myHost)),
          pilots: result.pilots.map((pilot) => pilot.replace(remoteHost, myHost))
        };
      }))
      
      const copyArraystarships = arraystarships.map((starship) => { return {
        url: starship.url,
        films: starship.films,
        pilots: starship.pilots
      }})

      await connection
        .createQueryBuilder()
        .insert()
        .into(Starships)
        .values(arraystarships)
        .execute();

      await Promise.all(copyArraystarships.map(async (starships) => {
        await connection
          .createQueryBuilder()
          .relation(Starships, "films")
          .of(starships.url)
          .add(starships.films);
        
        await connection
          .createQueryBuilder()
          .relation(Starships, "pilots")
          .of(starships.url)
          .add(starships.pilots);
      }))      
      if (response.next) {
        return recursiveRunner(response.next);
      }
    }
    const url = 'https://swapi.dev/api/starships/?page=1';
    return recursiveRunner(url);
  }
}
