import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { Starships } from './entities/starship.entity';

@Injectable()
export class StarshipsService {
  constructor(
    @InjectRepository(Starships)
    private readonly starshipsRepository: Repository<Starships>,
  ) {}

  async create(createStarshipDto: CreateStarshipDto): Promise<Starships> {
    let starships = new Starships();
    for (let key in createStarshipDto) {
      starships[key] = createStarshipDto[key];
    }
    //starships = {...createStarshipDto};
    return this.starshipsRepository.save(starships);
  }

  async findAll(): Promise<Starships[]> {
    return await this.starshipsRepository.find();
  }

  findOne(name: string): Promise<Starships> {
    return this.starshipsRepository.findOneBy({ name: name });
  }

  async remove(name: string): Promise<void> {
    await this.starshipsRepository.delete(name);
  }  
}
