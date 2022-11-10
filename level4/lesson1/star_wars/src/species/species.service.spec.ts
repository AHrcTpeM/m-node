import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';

import { Films } from '../films/entities/film.entity';
import { People } from '../people/entities/people.entity';
import { Repository } from 'typeorm';
import { FileUploadDto } from '../images/dto/create-image.dto';
import { ImagesService } from '../images/images.service';
import { HttpException } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { Species } from './entities/species.entity';
import { CreateSpeciesDto } from './dto/create-species.dto';

class RepositoryFake {
  public create(): void {}
  public async save(): Promise<void> {}
  public async delete(): Promise<void> {}
  public async findOne(): Promise<void> {}
  public async find(): Promise<any[]> { return [] }
}

describe('SpeciesService', () => {
  let service: SpeciesService;
  let imagesService: ImagesService;
  let speciesRepositorySpy: Repository<Species>;

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
      providers: [ SpeciesService, ApiServiceProvider,
        {
          provide: getRepositoryToken(Species),
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

    service = module.get<SpeciesService>(SpeciesService);
    imagesService = module.get<ImagesService>(ImagesService);
    speciesRepositorySpy = module.get(getRepositoryToken(Species));
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call create method with expected params', async () => {
    const createSpy = jest.spyOn(service, 'create');
    const dto = new CreateSpeciesDto();
    dto.name = 'Abu';
    const species = new Species();
    species.name = 'Moon';
    const speciesRepositorySaveSpy = jest
        .spyOn(speciesRepositorySpy, 'save')
        .mockReturnValue(Promise.resolve(species));
        
    expect(await service.create(dto)).toEqual(species);
    expect(createSpy).toHaveBeenCalledWith(dto);
    expect(speciesRepositorySaveSpy).toHaveBeenCalledTimes(2);
    expect(speciesRepositorySaveSpy).toHaveBeenCalledWith(dto);
  });

  it('should call findOne method with expected param', async () => {
    expect.assertions(4);

    const name: string = 'Abu';
    expect(service.findOne(name)).rejects.toBeInstanceOf(HttpException);

    const species = new Species();
    species.name = "Moon";
    const speciesRepositoryFindOneSpy = jest
        .spyOn(speciesRepositorySpy, 'findOne')
        .mockReturnValue(Promise.resolve(species));
    const findOneSpy = jest.spyOn(service, 'findOne');
    
    service.findOne(name);
    expect(findOneSpy).toHaveBeenCalledWith(name);
    expect(speciesRepositoryFindOneSpy).toHaveBeenCalled();
    expect(await service.findOne(name)).toEqual(species);
  });

  it('should call findAll method with expected params', async () => {
    const findAllSpy = jest.spyOn(service, 'findAll').mockReturnValue(Promise.resolve(null));
    const species = new Species();
    const speciesRepositoryFindSpy = jest
        .spyOn(speciesRepositorySpy, 'find')
        .mockReturnValue(Promise.resolve([species]));
    
    expect(await service.findAll({page: 1, limit: 5})).toEqual(null);
    expect(findAllSpy).toHaveBeenCalled();
    //expect(speciesRepositoryFindSpy).toHaveBeenCalled();
  });

  describe('remove method', () => {
      it('should call remove method with expected param', async () => {
        const removeSpy = jest.spyOn(service, 'remove');
        const imagesServiceDeleteFilesSpy = jest.spyOn(imagesService, 'deleteFiles');
        const name: string = 'Abu';
        const species = new Species();
        species.images = [];
        const speciesRepositorySaveSpy = jest.spyOn(speciesRepositorySpy, 'save');
        const speciesRepositoryFindOneSpy = jest
            .spyOn(speciesRepositorySpy, 'findOne')
            .mockReturnValue(Promise.resolve(species));
        const speciesRepositoryDeleteSpy = jest
            .spyOn(speciesRepositorySpy, 'delete')
            .mockReturnValue(Promise.resolve({ raw: [], affected: 1 }));

        expect(await service.remove(name)).toEqual({name, deleted: 'success'});
        expect(removeSpy).toHaveBeenCalledWith(name);
        expect(imagesServiceDeleteFilesSpy).toHaveBeenCalled();
        expect(speciesRepositoryFindOneSpy).toHaveBeenCalled();
        expect(speciesRepositorySaveSpy).toHaveBeenCalledWith(species);        
        expect(speciesRepositoryDeleteSpy).toHaveBeenCalledWith(name);
      });

      it('should call remove method with expected param', async () => {
        const removeSpy = jest.spyOn(service, 'remove');
        const imagesServiceDeleteFilesSpy = jest.spyOn(imagesService, 'deleteFiles');
        const name: string = 'Abu';
        const species = new Species();
        species.images = [];
        const speciesRepositorySaveSpy = jest.spyOn(speciesRepositorySpy, 'save');
        const speciesRepositoryFindOneSpy = jest.spyOn(speciesRepositorySpy, 'findOne');
        const speciesRepositoryDeleteSpy = jest
            .spyOn(speciesRepositorySpy, 'delete')
            .mockReturnValue(Promise.resolve({ raw: [], affected: 0 }));
        expect(await service.remove(name)).toBeInstanceOf(HttpException);
        expect(removeSpy).toHaveBeenCalledWith(name);
        expect(imagesServiceDeleteFilesSpy).not.toHaveBeenCalled();
        expect(speciesRepositorySaveSpy).not.toHaveBeenCalled();
        expect(speciesRepositoryFindOneSpy).toHaveBeenCalled();
        expect(speciesRepositoryDeleteSpy).toHaveBeenCalled();
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
