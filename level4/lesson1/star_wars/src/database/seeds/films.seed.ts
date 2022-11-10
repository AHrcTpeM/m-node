import axios from 'axios';
import { Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Factory, Seeder } from 'typeorm-seeding';

import { Films } from '../../films/entities/film.entity';

@Injectable()
export default class FilmsSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    async function recursiveRunner(url: string): Promise<undefined> {
      const response = await axios.get(url).then((response) => response.data);
      await connection
        .createQueryBuilder()
        .insert()
        .into(Films)
        .values(
          response.results.map((film: Films) => {
            const {created, edited, ...result} = film;
            return {
              ...result,
              url: film.url.replace('https://swapi.dev/api', `http://${process.env.HOST}:${process.env.PORT}`)
            };
          })
        )
        .execute();
      if (response.next) {
        return recursiveRunner(response.next);
      }
    }
    const url = 'https://swapi.dev/api/films/?page=1';
    return recursiveRunner(url);
  }
}
