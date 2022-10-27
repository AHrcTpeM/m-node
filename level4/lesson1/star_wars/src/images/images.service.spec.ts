import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Films } from '../films/entities/film.entity';
import { People } from '../people/entities/people.entity';
import { Planets } from '../planets/entities/planet.entity';
import { Species } from '../species/entities/species.entity';
import { Starships } from '../starships/entities/starship.entity';
import { Vehicles } from '../vehicles/entities/vehicle.entity';
import { FileUploadDto } from './dto/create-image.dto';
import { Images } from './entities/image.entity';
import { ImagesService } from './images.service';

class RepositoryFake {
    public create(): void {}
    public async save(): Promise<void> {}
    public async delete(): Promise<void> {}
    public async findOne(): Promise<void> {}
    public async findOneBy(): Promise<void> {}
    public async find(): Promise<any[]> { return [] }
  }
  
describe('ImagesService', () => {
let service: ImagesService;
let repositorySpy: Repository<Images>;
let peopleRepositorySpy: Repository<People>;

beforeEach(async () => {
    const ApiServiceProvider = {
    provide: ImagesService,
    useFactory: () => ({
        create: jest.fn(() => []),
        findAll: jest.fn(() => []),
        findOne: jest.fn(() => { }),
        remove: jest.fn(() => { }),
        uploadFile: jest.fn(() => { }),
        deleteImage: jest.fn(() => { }),
        uploadFileS3: jest.fn(() => { }),
        deleteFileS3: jest.fn(() => { }),
        deleteFiles: jest.fn(() => { })
        })
    }

    const module: TestingModule = await Test.createTestingModule({
        providers: [ ImagesService,
              {
                provide: getRepositoryToken(Films),
                useClass: RepositoryFake,
              },
              {
                provide: getRepositoryToken(Planets),
                useClass: RepositoryFake,
              },
              {
                provide: getRepositoryToken(People),
                useClass: RepositoryFake,
              },
              {
                provide: getRepositoryToken(Starships),
                useClass: RepositoryFake,
              },
              {
                provide: getRepositoryToken(Species),
                useClass: RepositoryFake,
              },
              {
                provide: getRepositoryToken(Vehicles),
                useClass: RepositoryFake,
              },
              {
                provide: getRepositoryToken(Images),
                useClass: RepositoryFake,
              },
            ],
        }).compile();

        service = module.get<ImagesService>(ImagesService);
        repositorySpy = module.get(getRepositoryToken(Images));
        peopleRepositorySpy = module.get(getRepositoryToken(People));
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should call uploadFile method with expected params', async () => {
        const uploadFileSpy = jest.spyOn(service, 'uploadFile');
        const entity = 'people'
        const people = new People();
        people.name = 'Luke'
        const dto = new FileUploadDto();
        dto.images = ['image'];

        expect.assertions(6);
        try {
            await service.uploadFile(entity, dto, People);
        } catch (e) {
            expect(e).toBeInstanceOf(HttpException);
        }

        const repositorySaveSpy = jest
            .spyOn(repositorySpy, 'save')
            //.mockReturnValue(Promise.resolve(planets));
        const peopleRepositoryFindOneBySpy = jest
            .spyOn(peopleRepositorySpy, 'findOneBy')
            .mockReturnValue(Promise.resolve(people));
        const peopleRepositoryFindOneSpy = jest
            .spyOn(peopleRepositorySpy, 'findOne')
            .mockReturnValue(Promise.resolve(people));
            
        expect(await service.uploadFile(entity, dto, People)).toEqual(people);
        expect(peopleRepositoryFindOneBySpy).toHaveBeenCalled();
        expect(peopleRepositoryFindOneSpy).toHaveBeenCalled();
        expect(uploadFileSpy).toHaveBeenCalledWith(entity, dto, People);
        expect(repositorySaveSpy).toHaveBeenCalled();
      });

      it('should call deleteImage method with expected params', async () => {
        const deleteImageSpy = jest.spyOn(service, 'deleteImage');
        const entity = 'people';
        const name = 'Luke';
        const people = new People();
        people.name = 'Luke';
        people.images = [new Images()];
        const error = 'success';

        expect.assertions(7);
        try {
            await service.deleteImage(entity, name);
        } catch (e) {
            expect(e).toBeInstanceOf(HttpException);
        }

        const deleteFilesSpy = jest.spyOn(service, 'deleteFiles').mockReturnValue(error);
        const peopleRepositorySaveSpy = jest.spyOn(peopleRepositorySpy, 'save')
        const peopleRepositoryFindOneSpy = jest
            .spyOn(peopleRepositorySpy, 'findOne')
            .mockReturnValue(Promise.resolve(people));

        expect(await service.deleteImage(entity, name, 'image')).toEqual({name, deleted: 'No image found for this resource'});
        expect(deleteImageSpy).toHaveBeenCalledWith(entity, name, 'image');
        expect(peopleRepositoryFindOneSpy).toHaveBeenCalled();
        
        expect(await service.deleteImage(entity, name)).toEqual({name, deleted: error});
        expect(deleteFilesSpy).toHaveBeenCalled();
        expect(peopleRepositorySaveSpy).toHaveBeenCalled();
      });

      it('should call uploadFileS3 method with expected params', async () => {
        let people = new People();
        let entity = 'people';
        let file: Express.Multer.File;
        let fileUploadDto = new FileUploadDto;
        const uploadFileS3Spy = jest.spyOn(service, 'uploadFileS3').mockReturnValue(Promise.resolve(people));

        expect(await service.uploadFileS3(entity, file, fileUploadDto, People)).toEqual(people);
        expect(uploadFileS3Spy).toHaveBeenCalledWith(entity, file, fileUploadDto, People);
      });

      it('should call deleteFileS3 method with expected params', async () => {
        let entity = 'people';
        let name = 'Luke';
        let key = 'image';
        const deleteFileS3Spy = jest.spyOn(service, 'deleteFileS3').mockReturnValue(Promise.resolve({name, deleted: 'success'}));
        
        expect(await service.deleteFileS3(entity, name, key)).toEqual({name, deleted: 'success'});
        expect(deleteFileS3Spy).toHaveBeenCalledWith(entity, name, key);
      });
})
