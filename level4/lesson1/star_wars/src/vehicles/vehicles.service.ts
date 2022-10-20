import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicles } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicles)
    private readonly vehiclesRepository: Repository<Vehicles>,
  ) {}

  async create(createVehiclesDto: CreateVehicleDto): Promise<Vehicles> {
    let vehicles = new Vehicles();
    for (let key in createVehiclesDto) {
      vehicles[key] = createVehiclesDto[key];
    }
    //vehicles = {...createVehiclesDto};
    return this.vehiclesRepository.save(vehicles);
  }

  async findAll(): Promise<Vehicles[]> {
    return await this.vehiclesRepository.find();
  }

  findOne(name: string): Promise<Vehicles> {
    return this.vehiclesRepository.findOneBy({ name: name });
  }

  async remove(name: string): Promise<void> {
    await this.vehiclesRepository.delete(name);
  }  
}
