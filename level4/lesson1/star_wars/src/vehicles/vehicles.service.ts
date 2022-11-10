import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

import { Films } from '../films/entities/film.entity';
import { FileUploadDto } from '../images/dto/create-image.dto';
import { ImagesService } from '../images/images.service';
import { People } from '../people/entities/people.entity';
import { Repository } from 'typeorm';

import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicles } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {
  private readonly propsRelations: string[];

  constructor(
    @InjectRepository(Vehicles)
    private readonly vehiclesRepository: Repository<Vehicles>,

    @InjectRepository(Films)
    private readonly filmsRepository: Repository<Films>,

    @InjectRepository(People)
    private readonly peopleRepository: Repository<People>,

    private readonly imagesService: ImagesService   
  ) {
    this.propsRelations = ['films', 'pilots', 'images'];
  }

  async create(createVehiclesDto: CreateVehicleDto): Promise<Vehicles> {
    const resources = [this.filmsRepository,  this.peopleRepository];

    let vehicle = new Vehicles();
    
    for (let key in createVehiclesDto) {
      if (key === 'images') continue; // изменяем каринки только через свои контроллеры
      vehicle[key] = this.propsRelations.includes(key) ? [] : createVehiclesDto[key];
    }
    await this.vehiclesRepository.save(vehicle).catch((err) => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }); // обнуляем связи, что бы не было ошибки дублирования внешних ключей

    for (let i = 0; i < this.propsRelations.length - 1; i++) {
      createVehiclesDto[this.propsRelations[i]]?.forEach(async (elem) => {        
        const person = await resources[i].findOneBy({ url: elem });
        if (person) {
          vehicle[this.propsRelations[i]].push(person);
        }        
      })
    }
    return this.vehiclesRepository.save(vehicle).catch((err) => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Vehicles>> {
    return paginate<Vehicles>(this.vehiclesRepository, options);
  }

  async findOne(name: string): Promise<CreateVehicleDto> {
    const url =  `http://${process.env.HOST}:${process.env.PORT}/vehicles/${+name}/`;
    return this.vehiclesRepository.findOne({ 
      relations: this.propsRelations,
      relationLoadStrategy: 'query',
      where: [{ name }, { url }]
    })
    .then(person => {
      if (person) {
        let vehicles: CreateVehicleDto = new CreateVehicleDto();
        for (let key in person) {
          vehicles[key] = this.propsRelations.includes(key) && person[key] ? person[key].map((elem) => elem.url) : person[key];
        }
        return vehicles;
      } else {
        throw new HttpException("Person not found", HttpStatus.NOT_FOUND);
      }        
    })
  }

  async remove(name: string): Promise<{ name: string; deleted: string; }> {
    const person = await this.vehiclesRepository.findOne({ 
      relations: ['images'],
      relationLoadStrategy: 'query',
      where: { name }
    });           

    if (person) {
      this.imagesService.deleteFiles(person.images.map((img) => img.url));
      this.propsRelations.forEach((obj) => person[obj] = []);
      await this.vehiclesRepository.save(person); // зануляем все связи ManyToMany и сохраняем, произойдет их удаление
    }

    return this.vehiclesRepository.delete(name)
    .then((result) => {
      if (result.affected) {
        return {name, deleted: 'success'};
      } else {
        throw new HttpException("Person not found", HttpStatus.NOT_FOUND);
      }      
    })
    .catch((err) => err)
  }  


  async uploadFile(fileUploadDto: FileUploadDto): Promise<Vehicles> {
    return await this.imagesService.uploadFile('vehicles', fileUploadDto, Vehicles);
  }  

  async deleteImage(name: string, image?: string) {
    return await this.imagesService.deleteImage('vehicles', name, image);    
  }

  async uploadFileS3(file: Express.Multer.File, fileUploadDto: FileUploadDto) {
    return await this.imagesService.uploadFileS3('vehicles', file, fileUploadDto, Vehicles);
  }  

  async deleteFileS3(name: string, key: string) {
    return await this.imagesService.deleteFileS3('vehicles', name, key);
  }
}
