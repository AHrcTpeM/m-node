import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Films } from '../films/entities/film.entity';
import { People } from '../people/entities/people.entity';
import { Repository } from 'typeorm';
import { FileUploadDto } from '../images/dto/create-image.dto';
import { PeopleService } from './people.service';
import { ImagesService } from '../images/images.service';
import { HttpException } from '@nestjs/common';
import { Planets } from '../planets/entities/planet.entity';
import { CreatePeopleDto } from './dto/create-people.dto';
import { Starships } from '../starships/entities/starship.entity';
import { Species } from '../species/entities/species.entity';
import { Vehicles } from '../vehicles/entities/vehicle.entity';

class RepositoryFake {
  public count(): void {}
  public async save(): Promise<void> {}
  public async delete(): Promise<void> {}
  public async findOne(): Promise<void> {}
  public async find(): Promise<any[]> { return [] }

}

describe('PeopleService', () => {
  let service: PeopleService;
  let imagesService: ImagesService;
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
      providers: [ PeopleService, ApiServiceProvider,
        {
          provide: getRepositoryToken(People),
          useClass: RepositoryFake,
        },
        {
          provide: getRepositoryToken(Films),
          useClass: RepositoryFake,
        },
        {
          provide: getRepositoryToken(Planets),
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
       ],
    }).compile();

    service = module.get<PeopleService>(PeopleService);
    imagesService = module.get<ImagesService>(ImagesService);
    peopleRepositorySpy = module.get(getRepositoryToken(People));
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  }); 

  it('should call create method with expected params', async () => {
    const createSpy = jest.spyOn(service, 'create');
    const dto = new CreatePeopleDto();
    dto.name = 'Abu';
    const people = new People();
    people.name = 'Moon';
    const peopleRepositorySaveSpy = jest
        .spyOn(peopleRepositorySpy, 'save')
        .mockReturnValue(Promise.resolve(people));
        
    expect(await service.create(dto)).toEqual(people);
    expect(createSpy).toHaveBeenCalledWith(dto);
    expect(peopleRepositorySaveSpy).toHaveBeenCalledTimes(2);
    expect(peopleRepositorySaveSpy).toHaveBeenCalledWith(dto);
  });

  it('should call findOne method with expected param', async () => {
    expect.assertions(4);

    const name: string = 'Abu';
    expect(service.findOne(name)).rejects.toBeInstanceOf(HttpException);

    const people = new People();
    people.name = "Moon";
    const peopleRepositoryFindOneSpy = jest
        .spyOn(peopleRepositorySpy, 'findOne')
        .mockReturnValue(Promise.resolve(people));
    const findOneSpy = jest.spyOn(service, 'findOne');
    
    service.findOne(name);
    expect(findOneSpy).toHaveBeenCalledWith(name);
    expect(peopleRepositoryFindOneSpy).toHaveBeenCalled();
    expect(await service.findOne(name)).toEqual(people);
  });

  it('should call findAll method with expected params', async () => {
    const findAllSpy = jest.spyOn(service, 'findAll');
    const people = new People();
    const peopleRepositoryCountSpy = jest.spyOn(peopleRepositorySpy, 'count')
    const peopleRepositoryFindSpy = jest
        .spyOn(peopleRepositorySpy, 'find')
        .mockReturnValue(Promise.resolve([people]));
        
    expect((await service.findAll(1)).results).toEqual([people]);
    expect(findAllSpy).toHaveBeenCalled();
    expect(peopleRepositoryFindSpy).toHaveBeenCalled();
    expect(peopleRepositoryCountSpy).toHaveBeenCalled();
  });

  describe('remove method', () => {
      it('should call remove method with expected param', async () => {
        const removeSpy = jest.spyOn(service, 'remove');
        const imagesServiceDeleteFilesSpy = jest.spyOn(imagesService, 'deleteFiles');
        const name: string = 'Abu';
        const people = new People();
        people.images = [];
        const peopleRepositorySaveSpy = jest.spyOn(peopleRepositorySpy, 'save');
        const peopleRepositoryFindOneSpy = jest
            .spyOn(peopleRepositorySpy, 'findOne')
            .mockReturnValue(Promise.resolve(people));
        const peopleRepositoryDeleteSpy = jest
            .spyOn(peopleRepositorySpy, 'delete')
            .mockReturnValue(Promise.resolve({ raw: [], affected: 1 }));

        expect(await service.remove(name)).toEqual({name, deleted: 'success'});
        expect(removeSpy).toHaveBeenCalledWith(name);
        expect(imagesServiceDeleteFilesSpy).toHaveBeenCalled();
        expect(peopleRepositoryFindOneSpy).toHaveBeenCalled();
        expect(peopleRepositorySaveSpy).toHaveBeenCalledWith(people);        
        expect(peopleRepositoryDeleteSpy).toHaveBeenCalledWith(name);
      });

      it('should call remove method with expected param', async () => {
        const removeSpy = jest.spyOn(service, 'remove');
        const imagesServiceDeleteFilesSpy = jest.spyOn(imagesService, 'deleteFiles');
        const name: string = 'Abu';
        const people = new People();
        people.images = [];
        const peopleRepositorySaveSpy = jest.spyOn(peopleRepositorySpy, 'save');
        const peopleRepositoryFindOneSpy = jest.spyOn(peopleRepositorySpy, 'findOne');
        const peopleRepositoryDeleteSpy = jest
            .spyOn(peopleRepositorySpy, 'delete')
            .mockReturnValue(Promise.resolve({ raw: [], affected: 0 }));
        expect(await service.remove(name)).toBeInstanceOf(HttpException);
        expect(removeSpy).toHaveBeenCalledWith(name);
        expect(imagesServiceDeleteFilesSpy).not.toHaveBeenCalled();
        expect(peopleRepositorySaveSpy).not.toHaveBeenCalled();
        expect(peopleRepositoryFindOneSpy).toHaveBeenCalled();
        expect(peopleRepositoryDeleteSpy).toHaveBeenCalled();
      });
  })

  it('should call uploadFile method with expected param', async () => {
    const removeSpy = jest.spyOn(service, 'uploadFile');
    const dto: FileUploadDto = new FileUploadDto();
    service.uploadFile(dto);
    expect(removeSpy).toHaveBeenCalledWith(dto);
    expect(imagesService.uploadFile).toHaveBeenCalled();
  });

  it('should call deleteImage method with expected param', async () => {
    const removeSpy = jest.spyOn(service, 'deleteImage');
    const name: string = 'Abu';
    const image: string = 'Image';
    service.deleteImage(name, image);
    expect(removeSpy).toHaveBeenCalledWith(name, image);
    expect(imagesService.deleteImage).toHaveBeenCalled();
  });

  it('should call uploadFileS3 method with expected param', async () => {
    const removeSpy = jest.spyOn(service, 'uploadFileS3');
    const dto: FileUploadDto = new FileUploadDto();
    let file: Express.Multer.File;
    service.uploadFileS3(file, dto);
    expect(removeSpy).toHaveBeenCalledWith(file, dto);
    expect(imagesService.uploadFileS3).toHaveBeenCalled();
  });

  it('should call deleteFileS3 method with expected param', async () => {
    const removeSpy = jest.spyOn(service, 'deleteFileS3');
    const name: string = 'Abu';
    const key: string = 'Image';
    service.deleteFileS3(name, key);
    expect(removeSpy).toHaveBeenCalledWith(name, key);
    expect(imagesService.deleteFileS3).toHaveBeenCalled();
  });
});
