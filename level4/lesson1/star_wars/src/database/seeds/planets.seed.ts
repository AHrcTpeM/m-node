import axios from 'axios';
import { Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Factory, Seeder } from 'typeorm-seeding';
import { Planets } from '../../planets/entities/planet.entity';
import { People } from '../../people/entities/people.entity';

@Injectable()
export default class PlanetsSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    async function recursiveRunner(url: string): Promise<undefined> {
      const response = await axios.get(url).then((response) => response.data);

      const arrayPlanets: Planets[] = await Promise.all(response.results.map(async (result) => {            
        const remoteHost = 'https://swapi.dev/api';
        const myHost = `http://${process.env.HOST}:${process.env.PORT}`;

        const planet: Planets = result;
        const {created, edited, ...props} = planet;
        return {
          ...props,
          url: planet.url.replace(remoteHost, myHost),
          films: result.films.map((film) => film.replace(remoteHost, myHost)),
          residents: result.residents.map((resident) => resident.replace(remoteHost, myHost))
        };
      }))

      const copyArrayPlanets = arrayPlanets.map((planet) => { return {
        name: planet.name,        
        films: planet.films,
        residents: planet.residents,
        url: planet.url,
      }})

      await connection
        .createQueryBuilder()
        .insert()
        .into(Planets)
        .values(arrayPlanets)
        .execute();

      await Promise.all(copyArrayPlanets.map(async (planet) => {
        await connection        
          .createQueryBuilder()
          .relation(Planets, "films")
          .of(planet.url)
          .add(planet.films);
        
        const user = await connection                      // у меня есть url, а надо вытянуть name
                      .createQueryBuilder(People, "people")
                      .select(["people.name"])
                      .where("people.url IN (:...ids)", { ids: planet.residents.length === 0 ? [""] : planet.residents })
                      .getMany()

        await connection
          .createQueryBuilder()
          .relation(Planets, "residents")
          .of(planet.url)
          .add(user);
      }))     
      
      if (response.next) {
        return recursiveRunner(response.next);
      }
    }
    const url = 'https://swapi.dev/api/planets/?page=1';
    return recursiveRunner(url);
  }
}
