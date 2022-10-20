import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { Species } from './entities/species.entity';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private readonly speciesRepository: Repository<Species>,
  ) {}

  async create(createSpeciesDto: CreateSpeciesDto): Promise<Species> {
    let species = new Species();
    for (let key in createSpeciesDto) {
      species[key] = createSpeciesDto[key];
    }
    //species = {...createSpeciesDto};
    return this.speciesRepository.save(species);
  }

  async findAll(): Promise<Species[]> {
    return await this.speciesRepository.find();
  }

  findOne(name: string): Promise<Species> {
    return this.speciesRepository.findOneBy({ name: name });
  }

  async remove(name: string): Promise<void> {
    await this.speciesRepository.delete(name);
  }  
}
