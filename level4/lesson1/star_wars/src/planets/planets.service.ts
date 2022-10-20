import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { Planets } from './entities/planet.entity';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planets)
    private readonly planetRepository: Repository<Planets>,
  ) {}

  async create(createPlanetDto: CreatePlanetDto): Promise<Planets> {
    let planets = new Planets();
    for (let key in createPlanetDto) {
      planets[key] = createPlanetDto[key];
    }
    //planets = {...createPlanetDto};
    return this.planetRepository.save(planets);
  }

  async findAll(): Promise<Planets[]> {
    return await this.planetRepository.find();
  }

  findOne(name: string): Promise<Planets> {
    return this.planetRepository.findOneBy({ name: name });
  }

  async remove(name: string): Promise<void> {
    await this.planetRepository.delete(name);
  }  
}
