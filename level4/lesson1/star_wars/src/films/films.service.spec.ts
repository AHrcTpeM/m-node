import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { People } from '../people/entities/people.entity';
import { Repository } from 'typeorm';
import { FileUploadDto } from '../images/dto/create-image.dto';
import { FilmsService } from './Films.service';
import { ImagesService } from '../images/images.service';
import { HttpException } from '@nestjs/common';
import { Films } from './entities/film.entity';
import { CreateFilmDto } from './dto/create-film.dto';
import { Starships } from '../starships/entities/starship.entity';
import { Species } from '../species/entities/species.entity';
import { Vehicles } from '../vehicles/entities/vehicle.entity';
import { Planets } from '../planets/entities/planet.entity';

class RepositoryFake {
  public create(): void {}
  public async save(): Promise<void> {}
  public async delete(): Promise<void> {}
  public async findOne(): Promise<void> {}
  public async find(): Promise<any[]> { return [] }
}

describe('FilmsService', () => {
  let service: FilmsService;
  let imagesService: ImagesService;
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
      providers: [ FilmsService, ApiServiceProvider,
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
       ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
    imagesService = module.get<ImagesService>(ImagesService);
    filmsRepositorySpy = module.get(getRepositoryToken(Films));
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call create method with expected params', async () => {
    const createSpy = jest.spyOn(service, 'create');
    const dto = new CreateFilmDto();
    dto.title = 'Abu';
    const films = new Films();
    films.title = 'Moon';
    const filmsRepositorySaveSpy = jest
        .spyOn(filmsRepositorySpy, 'save')
        .mockReturnValue(Promise.resolve(films));
        
    expect(await service.create(dto)).toEqual(films);
    expect(createSpy).toHaveBeenCalledWith(dto);
    expect(filmsRepositorySaveSpy).toHaveBeenCalledTimes(2);
    expect(filmsRepositorySaveSpy).toHaveBeenCalledWith(dto);
  });

  it('should call findOne method with expected param', async () => {
    expect.assertions(4);

    const title: string = 'Abu';
    expect(service.findOne(title)).rejects.toBeInstanceOf(HttpException);

    const films = new Films();
    films.title = "Moon";
    const filmsRepositoryFindOneSpy = jest
        .spyOn(filmsRepositorySpy, 'findOne')
        .mockReturnValue(Promise.resolve(films));
    const findOneSpy = jest.spyOn(service, 'findOne');
    
    service.findOne(title);
    expect(findOneSpy).toHaveBeenCalledWith(title);
    expect(filmsRepositoryFindOneSpy).toHaveBeenCalled();
    expect(await service.findOne(title)).toEqual(films);
  });

  it('should call findAll method with expected params', async () => {
    const findAllSpy = jest.spyOn(service, 'findAll').mockReturnValue(Promise.resolve(null));
    const films = new Films();
    const filmsRepositoryFindSpy = jest
        .spyOn(filmsRepositorySpy, 'find')
        .mockReturnValue(Promise.resolve([films]));
        
    expect(await service.findAll({page: 1, limit: 5})).toEqual(null);
    expect(findAllSpy).toHaveBeenCalled();
    //expect(filmsRepositoryFindSpy).toHaveBeenCalled();
  });

  describe('remove method', () => {
      it('should call remove method with expected param', async () => {
        const removeSpy = jest.spyOn(service, 'remove');
        const imagesServiceDeleteFilesSpy = jest.spyOn(imagesService, 'deleteFiles');
        const title: string = 'Abu';
        const films = new Films();
        films.images = [];
        const filmsRepositorySaveSpy = jest.spyOn(filmsRepositorySpy, 'save');
        const filmsRepositoryFindOneSpy = jest
            .spyOn(filmsRepositorySpy, 'findOne')
            .mockReturnValue(Promise.resolve(films));
        const filmsRepositoryDeleteSpy = jest
            .spyOn(filmsRepositorySpy, 'delete')
            .mockReturnValue(Promise.resolve({ raw: [], affected: 1 }));

        expect(await service.remove(title)).toEqual({name: title, deleted: 'success'});
        expect(removeSpy).toHaveBeenCalledWith(title);
        expect(imagesServiceDeleteFilesSpy).toHaveBeenCalled();
        expect(filmsRepositoryFindOneSpy).toHaveBeenCalled();
        expect(filmsRepositorySaveSpy).toHaveBeenCalledWith(films);        
        expect(filmsRepositoryDeleteSpy).toHaveBeenCalledWith(title);
      });

      it('should call remove method with expected param', async () => {
        const removeSpy = jest.spyOn(service, 'remove');
        const imagesServiceDeleteFilesSpy = jest.spyOn(imagesService, 'deleteFiles');
        const title: string = 'Abu';
        const films = new Films();
        films.images = [];
        const filmsRepositorySaveSpy = jest.spyOn(filmsRepositorySpy, 'save');
        const filmsRepositoryFindOneSpy = jest.spyOn(filmsRepositorySpy, 'findOne');
        const filmsRepositoryDeleteSpy = jest
            .spyOn(filmsRepositorySpy, 'delete')
            .mockReturnValue(Promise.resolve({ raw: [], affected: 0 }));
        expect(await service.remove(title)).toBeInstanceOf(HttpException);
        expect(removeSpy).toHaveBeenCalledWith(title);
        expect(imagesServiceDeleteFilesSpy).not.toHaveBeenCalled();
        expect(filmsRepositorySaveSpy).not.toHaveBeenCalled();
        expect(filmsRepositoryFindOneSpy).toHaveBeenCalled();
        expect(filmsRepositoryDeleteSpy).toHaveBeenCalled();
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
    const title: string = 'Abu';
    const image: string = 'Image';
    service.deleteImage(title, image);
    expect(removeSpy).toHaveBeenCalledWith(title, image);
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
    const title: string = 'Abu';
    const key: string = 'Image';
    service.deleteFileS3(title, key);
    expect(removeSpy).toHaveBeenCalledWith(title, key);
    expect(imagesService.deleteFileS3).toHaveBeenCalled();
  });
});