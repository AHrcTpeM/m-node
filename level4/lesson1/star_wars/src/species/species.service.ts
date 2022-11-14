import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

import { Films } from '../films/entities/film.entity';
import { FileUploadDto } from '../images/dto/create-image.dto';
import { ImagesService } from '../images/images.service';
import { People } from '../people/entities/people.entity';
import { Repository } from 'typeorm';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { Species } from './entities/species.entity';
import { UpdateSpeciesDto } from './dto/update-species.dto';

@Injectable()
export class SpeciesService {
  private readonly propsRelations: string[];

  constructor(
    @InjectRepository(Species)
    private readonly speciesRepository: Repository<Species>,

    @InjectRepository(Films)
    private readonly filmsRepository: Repository<Films>,

    @InjectRepository(People)
    private readonly peopleRepository: Repository<People>,

    private readonly imagesService: ImagesService
  ) {
    this.propsRelations = ['films', 'people', 'images'];
  }

  async create(createSpeciesDto: CreateSpeciesDto): Promise<Species> {
    const resources = [this.filmsRepository, this.peopleRepository];

    const existsSpecies = await this.speciesRepository.findOne({where: {name: createSpeciesDto.name}});
    if (existsSpecies) throw new HttpException("Planet already exists", HttpStatus.FORBIDDEN);
    let species = new Species();
    
    for (let key in createSpeciesDto) {
      if (key === 'images') continue; // изменяем каринки только через свои контроллеры
      species[key] = this.propsRelations.includes(key) ? [] : createSpeciesDto[key];
    }
    
    await Promise.all(this.propsRelations.map(async (key) => {
      if (!createSpeciesDto[key]) {
         species[key] = [];
      } else {
        await Promise.all(createSpeciesDto[key].map(async (elem) => {        
          const speciesOne = await resources[this.propsRelations.indexOf(key)].findOneBy({ url: elem });
          if (speciesOne) {
            species[key].push(speciesOne);
          }
        }))
      }
    }))
    return this.speciesRepository.save(species).catch((err) => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
  }

  async update(updateSpeciesDto: UpdateSpeciesDto) {
    const resources = [this.peopleRepository, this.filmsRepository];

    const species = await this.speciesRepository.findOneBy({name: updateSpeciesDto.name});
    if (!species) throw new HttpException("Person not found", HttpStatus.NOT_FOUND);
    
    for (let key in updateSpeciesDto) {
      if (key === 'images') continue; // изменяем каринки только через свои контроллеры
      species[key] = this.propsRelations.includes(key) ? [] : updateSpeciesDto[key]; // зануляем только те которые передаем!
    }
    await this.speciesRepository.save(species);
                        
    await Promise.all(this.propsRelations.map(async (key) => {
      if (updateSpeciesDto[key]) {
        await Promise.all(updateSpeciesDto[key].map(async (elem) => {        
          const speciesOne = await resources[this.propsRelations.indexOf(key)].findOneBy({ url: elem });
          if (speciesOne) {
            species[key].push(speciesOne);
          }
        }))
      }
    }))
    return this.speciesRepository.save(species).catch((err) => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Species>> {
    return paginate<Species>(this.speciesRepository, options);
  }

  async findOne(name: string): Promise<CreateSpeciesDto> {
    const url =  `http://${process.env.HOST}:${process.env.PORT}/species/${+name}/`;
    return this.speciesRepository.findOne({ 
      relations: this.propsRelations,
      relationLoadStrategy: 'query',
      where: [{ name }, { url }]
    })
    .then(person => {
      if (person) {
        let species: CreateSpeciesDto = new CreateSpeciesDto();
        for (let key in person) {
          species[key] = this.propsRelations.includes(key) && person[key] ? person[key].map((elem) => elem.url) : person[key];
        }
        return species;
      } else {
        throw new HttpException("Person not found", HttpStatus.NOT_FOUND);
      }        
    })
  }

  async remove(name: string): Promise<{ name: string; deleted: string; }> {
    const person = await this.speciesRepository.findOne({ 
      relations: ['images'],
      relationLoadStrategy: 'query',
      where: { name }
    });           

    if (person) {
      this.imagesService.deleteFiles(person.images.map((img) => img.url));
      this.propsRelations.forEach((obj) => person[obj] = []);
      await this.speciesRepository.save(person); // зануляем все связи ManyToMany и сохраняем, произойдет их удаление
    }

    return this.speciesRepository.delete(name)
    .then((result) => {
      if (result.affected) {
        return {name, deleted: 'success'};
      } else {
        throw new HttpException("Person not found", HttpStatus.NOT_FOUND);
      }      
    })
    .catch((err) => err)
  }  


  async uploadFile(fileUploadDto: FileUploadDto): Promise<Species> {
    return await this.imagesService.uploadFile('species', fileUploadDto, Species);
  }  

  async deleteImage(name: string, image?: string) {
    return await this.imagesService.deleteImage('species', name, image);    
  }

  async uploadFileS3(file: Express.Multer.File, fileUploadDto: FileUploadDto) {
    return await this.imagesService.uploadFileS3('species', file, fileUploadDto, Species);
  }  

  async deleteFileS3(name: string, key: string) {
    return await this.imagesService.deleteFileS3('species', name, key);
  }
}
