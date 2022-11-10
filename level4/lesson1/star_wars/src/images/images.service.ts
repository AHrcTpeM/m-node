import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { unlink } from 'fs';
import { S3 } from 'aws-sdk';

import { Films } from '../films/entities/film.entity';
import { People } from '../people/entities/people.entity';
import { Planets } from '../planets/entities/planet.entity';
import { Species } from '../species/entities/species.entity';
import { Starships } from '../starships/entities/starship.entity';
import { Vehicles } from '../vehicles/entities/vehicle.entity';
import { EntityTarget, Repository } from 'typeorm';
import { Images } from './entities/image.entity';
import { FileUploadDto } from './dto/create-image.dto';

@Injectable()
export class ImagesService {
    private readonly resources;

    constructor(    
        @InjectRepository(People)
        private readonly peopleRepository: Repository<People>,
    
        @InjectRepository(Films)
        private readonly filmsRepository: Repository<Films>,
    
        @InjectRepository(Starships)
        private readonly starshipsRepository: Repository<Starships>,
    
        @InjectRepository(Planets)
        private readonly planetsRepository: Repository<Planets>,
    
        @InjectRepository(Species)
        private readonly speciesRepository: Repository<Species>,
    
        @InjectRepository(Vehicles)
        private readonly vehiclesRepository: Repository<Vehicles>,
    
        @InjectRepository(Images)
        private readonly imagesRepository: Repository<Images>,

        private configService: ConfigService
      ) {
        this.resources = {
            'people': this.peopleRepository, 
            'films': this.filmsRepository, 
            'starships': this.starshipsRepository, 
            'planets': this.planetsRepository, 
            'species': this.speciesRepository, 
            'vehicles': this.vehiclesRepository
        };
      }
    
    async uploadFile<T>(entity: string, fileUploadDto: FileUploadDto, target: EntityTarget<T>): Promise<T> {
    const prop = entity === 'films' ? 'title' : 'name';
    const obj = await this.resources[entity].findOneBy({ [prop]: fileUploadDto.name })
    .then((result) => {
        if (result) {
          return result;
        } else {
          throw new HttpException("Person not found", HttpStatus.NOT_FOUND);
        }
    })
    for (let i = 0; i < fileUploadDto.images.length; i++ ) {
        let images = new Images();
        images.url = fileUploadDto.images[i];
        images[entity] = obj;
        await this.imagesRepository.save(images);
    }
    return await this.resources[entity].findOne({ 
        relations: ['images'],
        relationLoadStrategy: 'query',
        where: { [prop]: fileUploadDto.name }
        });
    }
    
    async deleteImage(entity: string, name: string, image?: string) {  
        const prop = entity === 'films' ? 'title' : 'name';
        const user = await this.resources[entity].findOne({ 
          relations: ['images'],
          relationLoadStrategy: 'query',
          where: { [prop]: name }
        })
        .then(async (result) => {
          if (result) {
            return result;
          } else {
            throw new HttpException("Person not found", HttpStatus.NOT_FOUND);
          }
        })
        if (image && !user.images.map((img) => img.url).includes(image)) {
            return {name, deleted: 'No image found for this resource'};
        }
        
        const deletedImage = image ?  [image] : user.images.map((img) => img.url);
        let error = this.deleteFiles(deletedImage);
        user.images = image ? 
                      user.images.filter(elem => elem.url !== image) :
                      user.images.filter(elem => elem.url?.includes('https:')); // если есть картинка оставляем все кроме нее, если нет, оставляем только амазоновские адреса https, их удаляем по одной
        await this.resources[entity].save(user);
        return {name, deleted: error};
      }
      
      deleteFiles(arrayFiles: string[]): string {
        let error = 'success';
        arrayFiles.forEach(image => {
          image = image.replace('http://localhost:3000/', '')
          unlink(`files/${image}`, (err) => {
          if (err) {
              console.error(err.message);
              error = err.message;
          } else {
              console.log(`${image}-------Изображение удалено-------`);
          }})
        })
        return error;
      }

      async uploadFileS3<T>(entity: string, file: Express.Multer.File, fileUploadDto: FileUploadDto, target: EntityTarget<T>) {
        const s3 = new S3();
        const ext = (file.originalname || "").replace(/^[^.]+/g, "");
        const name = Math.random().toString(36).replace("0.", "img-");
        file.originalname = `${name}${ext}`;
        const s3file = await s3.upload({
          Bucket: this.configService.get('aws.bucketName'), // process.env.AWS_BUCKET_NAME,
          ContentType: `image/${ext.slice(1)}`,
          Body: file.buffer,
          Key: file.originalname
        }).promise();
        fileUploadDto.images = [s3file.Location];
        return this.uploadFile(entity, fileUploadDto, target);
      }  
    
      async deleteFileS3(entity: string, name: string, key: string) {
        const aws = this.configService.get('aws');
        const result = await this.deleteImage(entity, name, key);
        key = key.replace(`https://${aws.bucketName}.s3.${aws.region}.amazonaws.com/`, '');
        const s3 = new S3();
        const y = await s3.getObject({
          Bucket: aws.bucketName, // process.env.AWS_BUCKET_NAME,
          Key: key
        }).promise().catch(err => {
          throw new HttpException(err.message, HttpStatus.NOT_FOUND)
        });
        const x = await s3.deleteObject({
          Bucket: aws.bucketName, // process.env.AWS_BUCKET_NAME,
          Key: key
        }).promise();
        return result;
      }
}
