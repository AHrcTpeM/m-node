import axios from 'axios';
import { Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Factory, Seeder } from 'typeorm-seeding';

import { Vehicles } from '../../vehicles/entities/vehicle.entity';

@Injectable()
export default class VehiclesSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    async function recursiveRunner(url: string): Promise<undefined> {
      const response = await axios.get(url).then((response) => response.data);

      const arrayVehicles: Vehicles[] = await Promise.all(response.results.map(async (result) => {            
        const remoteHost = 'https://swapi.dev/api';
        const myHost = `http://${process.env.HOST}:${process.env.PORT}`;

        const vehicle: Vehicles = result;
        const {created, edited, ...props} = vehicle;
        return {
          ...props,
          url: vehicle.url.replace(remoteHost, myHost),
          films: result.films.map((film) => film.replace(remoteHost, myHost)),
          pilots: result.pilots.map((pilot) => pilot.replace(remoteHost, myHost))
        };
      }))
      
      const copyArrayVehicles = arrayVehicles.map((vehicle) => { return {
        url: vehicle.url,
        films: vehicle.films,
        pilots: vehicle.pilots
      }})
      
      await connection
        .createQueryBuilder()
        .insert()
        .into(Vehicles)
        .values(arrayVehicles)
        .execute();

      await Promise.all(copyArrayVehicles.map(async (vehicle) => {
        await connection
          .createQueryBuilder()
          .relation(Vehicles, "films")
          .of(vehicle.url)
          .add(vehicle.films);
        
        await connection
          .createQueryBuilder()
          .relation(Vehicles, "pilots")
          .of(vehicle.url)
          .add(vehicle.pilots);
      }))      
      
      if (response.next) {
        return recursiveRunner(response.next);
      }
    }
    const url = 'https://swapi.dev/api/vehicles/?page=1';
    return recursiveRunner(url);
  }
}
