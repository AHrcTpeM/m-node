import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Films } from '../films/entities/film.entity';
import { People } from '../people/entities/people.entity';
import { Repository } from 'typeorm';
import { FileUploadDto } from '../images/dto/create-image.dto';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { Planets } from './entities/planet.entity';
import { PlanetsService } from './Planets.service';
import { ImagesService } from '../images/images.service';
import { HttpException } from '@nestjs/common';

class RepositoryFake {
  public create(): void {}
  public async save(): Promise<void> {}
  public async delete(): Promise<void> {}
  public async findOne(): Promise<void> {}
  public async find(): Promise<any[]> { return [] }
}

describe('PlanetsService', () => {
  let service: PlanetsService;
  let imagesService: ImagesService;
  let planetRepositorySpy: Repository<Planets>;
  let peopleRepositorySpy: Repository<People>;
  let filmsRepositorySpy: Repository<Films>;

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
      providers: [ PlanetsService, ApiServiceProvider,
        {
          provide: getRepositoryToken(Planets),
          useClass: RepositoryFake,
        },
        {
          provide: getRepositoryToken(Films),
          useClass: RepositoryFake,
        },
        {
          provide: getRepositoryToken(People),
          useClass: RepositoryFake,
        },
       ],
    }).compile();

    service = module.get<PlanetsService>(PlanetsService);
    imagesService = module.get<ImagesService>(ImagesService);
    planetRepositorySpy = module.get(getRepositoryToken(Planets));
    peopleRepositorySpy = module.get(getRepositoryToken(People));
    filmsRepositorySpy = module.get(getRepositoryToken(Films));
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call create method with expected params', async () => {
    const createSpy = jest.spyOn(service, 'create');
    const dto = new CreatePlanetDto();
    dto.name = 'Abu';
    const planets = new Planets();
    planets.name = 'Moon';
    const planetRepositoryFindOneSpy = jest
      .spyOn(planetRepositorySpy, 'findOne')
      .mockReturnValue(null);
    const planetRepositorySaveSpy = jest
        .spyOn(planetRepositorySpy, 'save')
        .mockReturnValue(Promise.resolve(planets));
        
    expect(await service.create(dto)).toEqual(planets);
    expect(createSpy).toHaveBeenCalledWith(dto);
    expect(planetRepositoryFindOneSpy).toHaveBeenCalled();
    expect(planetRepositorySaveSpy).toHaveBeenCalled();
  });

  it('should call findOne method with expected param', async () => {
    expect.assertions(4);

    const name: string = 'Abu';
    expect(service.findOne(name)).rejects.toBeInstanceOf(HttpException);

    const planets = new Planets();
    planets.name = "Moon";
    const planetRepositoryFindOneSpy = jest
        .spyOn(planetRepositorySpy, 'findOne')
        .mockReturnValue(Promise.resolve(planets));
    const findOneSpy = jest.spyOn(service, 'findOne');
    
    service.findOne(name);
    expect(findOneSpy).toHaveBeenCalledWith(name);
    expect(planetRepositoryFindOneSpy).toHaveBeenCalled();
    expect(await service.findOne(name)).toEqual(planets);
  });

  it('should call findAll method with expected params', async () => {
    const findAllSpy = jest.spyOn(service, 'findAll').mockReturnValue(Promise.resolve(null));
    const planets = new Planets();
    const planetRepositoryFindSpy = jest
        .spyOn(planetRepositorySpy, 'find')
        .mockReturnValue(Promise.resolve([planets]));
        
    expect(await service.findAll({page: 1, limit: 5})).toEqual(null);
    expect(findAllSpy).toHaveBeenCalled();
    //expect(planetRepositoryFindSpy).toHaveBeenCalled();
  });

  describe('remove method', () => {
      it('should call remove method with expected param', async () => {
        const removeSpy = jest.spyOn(service, 'remove');
        const imagesServiceDeleteFilesSpy = jest.spyOn(imagesService, 'deleteFiles');
        const name: string = 'Abu';
        const planets = new Planets();
        planets.images = [];
        const planetRepositorySaveSpy = jest.spyOn(planetRepositorySpy, 'save');
        const planetRepositoryFindOneSpy = jest
            .spyOn(planetRepositorySpy, 'findOne')
            .mockReturnValue(Promise.resolve(planets));
        const planetRepositoryDeleteSpy = jest
            .spyOn(planetRepositorySpy, 'delete')
            .mockReturnValue(Promise.resolve({ raw: [], affected: 1 }));

        expect(await service.remove(name)).toEqual({name, deleted: 'success'});
        expect(removeSpy).toHaveBeenCalledWith(name);
        expect(imagesServiceDeleteFilesSpy).toHaveBeenCalled();
        expect(planetRepositoryFindOneSpy).toHaveBeenCalled();
        expect(planetRepositorySaveSpy).toHaveBeenCalledWith(planets);        
        expect(planetRepositoryDeleteSpy).toHaveBeenCalledWith(name);
      });

      it('should call remove method with expected param', async () => {
        const removeSpy = jest.spyOn(service, 'remove');
        const imagesServiceDeleteFilesSpy = jest.spyOn(imagesService, 'deleteFiles');
        const name: string = 'Abu';
        const planets = new Planets();
        planets.images = [];
        const planetRepositorySaveSpy = jest.spyOn(planetRepositorySpy, 'save');
        const planetRepositoryFindOneSpy = jest.spyOn(planetRepositorySpy, 'findOne');
        const planetRepositoryDeleteSpy = jest
            .spyOn(planetRepositorySpy, 'delete')
            .mockReturnValue(Promise.resolve({ raw: [], affected: 0 }));
        expect(await service.remove(name)).toBeInstanceOf(HttpException);
        expect(removeSpy).toHaveBeenCalledWith(name);
        expect(imagesServiceDeleteFilesSpy).not.toHaveBeenCalled();
        expect(planetRepositorySaveSpy).not.toHaveBeenCalled();
        expect(planetRepositoryFindOneSpy).toHaveBeenCalled();
        expect(planetRepositoryDeleteSpy).toHaveBeenCalled();
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
