import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

import { Films } from '../films/entities/film.entity';
import { FileUploadDto } from '../images/dto/create-image.dto';
import { ImagesService } from '../images/images.service';
import { People } from '../people/entities/people.entity';
import { Repository } from 'typeorm';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { Starships } from './entities/starship.entity';
import { UpdateStarshipDto } from './dto/update-starship.dto';

@Injectable()
export class StarshipsService {
  private readonly propsRelations: string[];

  constructor(
    @InjectRepository(Starships)
    private readonly starshipsRepository: Repository<Starships>,

    @InjectRepository(Films)
    private readonly filmsRepository: Repository<Films>,

    @InjectRepository(People)
    private readonly peopleRepository: Repository<People>,

    private readonly imagesService: ImagesService  
  ) {
    this.propsRelations = ['films', 'pilots', 'images'];
  }

  async create(createStarshipDto: CreateStarshipDto): Promise<Starships> {
    const resources = [this.filmsRepository, this.peopleRepository];

    const existsStarship = await this.starshipsRepository.findOne({where: {name: createStarshipDto.name}});
    if (existsStarship) throw new HttpException("Starship already exists", HttpStatus.FORBIDDEN);
    let starships = new Starships();
    
    for (let key in createStarshipDto) {
      if (key === 'images') continue; // изменяем каринки только через свои контроллеры
      starships[key] = this.propsRelations.includes(key) ? [] : createStarshipDto[key];
    }
    
    await Promise.all(this.propsRelations.map(async (key) => {
      if (!createStarshipDto[key]) {
         starships[key] = [];
      } else {
        await Promise.all(createStarshipDto[key].map(async (elem) => {        
          const speciesOne = await resources[this.propsRelations.indexOf(key)].findOneBy({ url: elem });
          if (speciesOne) {
            starships[key].push(speciesOne);
          }
        }))
      }
    }))
    return this.starshipsRepository.save(starships).catch((err) => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
  }

  async update(updateStarshipDto: UpdateStarshipDto) {
    const resources = [this.peopleRepository, this.filmsRepository];

    const starships = await this.starshipsRepository.findOneBy({name: updateStarshipDto.name});
    if (!starships) throw new HttpException("Person not found", HttpStatus.NOT_FOUND);
    
    for (let key in updateStarshipDto) {
      if (key === 'images') continue; // изменяем каринки только через свои контроллеры
      starships[key] = this.propsRelations.includes(key) ? [] : updateStarshipDto[key]; // зануляем только те которые передаем!
    }
    await this.starshipsRepository.save(starships);
                        
    await Promise.all(this.propsRelations.map(async (key) => {
      if (updateStarshipDto[key]) {
        await Promise.all(updateStarshipDto[key].map(async (elem) => {        
          const starship = await resources[this.propsRelations.indexOf(key)].findOneBy({ url: elem });
          if (starship) {
            starships[key].push(starship);
          }
        }))
      }
    }))
    return this.starshipsRepository.save(starships).catch((err) => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Starships>> {
    return paginate<Starships>(this.starshipsRepository, options);
  }

  async findOne(name: string): Promise<CreateStarshipDto> {
    const url =  `http://${process.env.HOST}:${process.env.PORT}/starships/${+name}/`;
    return this.starshipsRepository.findOne({ 
      relations: this.propsRelations,
      relationLoadStrategy: 'query',
      where: [{ name }, { url }]
    })
    .then(person => {
      if (person) {
        let starships: CreateStarshipDto = new CreateStarshipDto();
        for (let key in person) {
          starships[key] = this.propsRelations.includes(key) && person[key] ? person[key].map((elem) => elem.url) : person[key];
        }
        return starships;
      } else {
        throw new HttpException("Person not found", HttpStatus.NOT_FOUND);
      }        
    })
  }

  async remove(name: string): Promise<{ name: string; deleted: string; }> {
    const person = await this.starshipsRepository.findOne({ 
      relations: ['images'],
      relationLoadStrategy: 'query',
      where: { name }
    });           

    if (person) {
      this.imagesService.deleteFiles(person.images.map((img) => img.url));
      this.propsRelations.forEach((obj) => person[obj] = []);
      await this.starshipsRepository.save(person); // зануляем все связи ManyToMany и сохраняем, произойдет их удаление
    }

    return this.starshipsRepository.delete(name)
    .then((result) => {
      if (result.affected) {
        return {name, deleted: 'success'};
      } else {
        throw new HttpException("Person not found", HttpStatus.NOT_FOUND);
      }      
    })
    .catch((err) => err)
  }  


  async uploadFile(fileUploadDto: FileUploadDto): Promise<Starships> {
    return await this.imagesService.uploadFile('starships', fileUploadDto, Starships);
  }  

  async deleteImage(name: string, image?: string) {
    return await this.imagesService.deleteImage('starships', name, image);    
  }

  async uploadFileS3(file: Express.Multer.File, fileUploadDto: FileUploadDto) {
    return await this.imagesService.uploadFileS3('starships', file, fileUploadDto, Starships);
  }  

  async deleteFileS3(name: string, key: string) {
    return await this.imagesService.deleteFileS3('starships', name, key);
  }
}
