import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Films } from '../films/entities/film.entity';
import { People } from '../people/entities/people.entity';
import { Repository } from 'typeorm';
import { FileUploadDto } from '../images/dto/create-image.dto';
import { ImagesService } from '../images/images.service';
import { HttpException } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { Starships } from './entities/starship.entity';
import { CreateStarshipDto } from './dto/create-starship.dto';

class RepositoryFake {
  public create(): void {}
  public async save(): Promise<void> {}
  public async delete(): Promise<void> {}
  public async findOne(): Promise<void> {}
  public async find(): Promise<any[]> { return [] }
}

describe('StarshipsService', () => {
  let service: StarshipsService;
  let imagesService: ImagesService;
  let starshipRepositorySpy: Repository<Starships>;

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
      providers: [ StarshipsService, ApiServiceProvider,
        {
          provide: getRepositoryToken(Starships),
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

    service = module.get<StarshipsService>(StarshipsService);
    imagesService = module.get<ImagesService>(ImagesService);
    starshipRepositorySpy = module.get(getRepositoryToken(Starships));
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call create method with expected params', async () => {
    const createSpy = jest.spyOn(service, 'create');
    const dto = new CreateStarshipDto();
    dto.name = 'Abu';
    const starships = new Starships();
    starships.name = 'Moon';
    const starshipRepositorySaveSpy = jest
        .spyOn(starshipRepositorySpy, 'save')
        .mockReturnValue(Promise.resolve(starships));
        
    expect(await service.create(dto)).toEqual(starships);
    expect(createSpy).toHaveBeenCalledWith(dto);
    expect(starshipRepositorySaveSpy).toHaveBeenCalledTimes(2);
    expect(starshipRepositorySaveSpy).toHaveBeenCalledWith(dto);
  });

  it('should call findOne method with expected param', async () => {
    expect.assertions(4);

    const name: string = 'Abu';
    expect(service.findOne(name)).rejects.toBeInstanceOf(HttpException);

    const starships = new Starships();
    starships.name = "Moon";
    const starshipRepositoryFindOneSpy = jest
        .spyOn(starshipRepositorySpy, 'findOne')
        .mockReturnValue(Promise.resolve(starships));
    const findOneSpy = jest.spyOn(service, 'findOne');
    
    service.findOne(name);
    expect(findOneSpy).toHaveBeenCalledWith(name);
    expect(starshipRepositoryFindOneSpy).toHaveBeenCalled();
    expect(await service.findOne(name)).toEqual(starships);
  });

  it('should call findAll method with expected params', async () => {
    const findAllSpy = jest.spyOn(service, 'findAll');
    const starships = new Starships();
    const starshipRepositoryFindSpy = jest
        .spyOn(starshipRepositorySpy, 'find')
        .mockReturnValue(Promise.resolve([starships]));
        
    expect(await service.findAll()).toEqual([starships]);
    expect(findAllSpy).toHaveBeenCalled();
    expect(starshipRepositoryFindSpy).toHaveBeenCalled();
  });

  describe('remove method', () => {
      it('should call remove method with expected param', async () => {
        const removeSpy = jest.spyOn(service, 'remove');
        const imagesServiceDeleteFilesSpy = jest.spyOn(imagesService, 'deleteFiles');
        const name: string = 'Abu';
        const starships = new Starships();
        starships.images = [];
        const starshipRepositorySaveSpy = jest.spyOn(starshipRepositorySpy, 'save');
        const starshipRepositoryFindOneSpy = jest
            .spyOn(starshipRepositorySpy, 'findOne')
            .mockReturnValue(Promise.resolve(starships));
        const starshipRepositoryDeleteSpy = jest
            .spyOn(starshipRepositorySpy, 'delete')
            .mockReturnValue(Promise.resolve({ raw: [], affected: 1 }));

        expect(await service.remove(name)).toEqual({name, deleted: 'success'});
        expect(removeSpy).toHaveBeenCalledWith(name);
        expect(imagesServiceDeleteFilesSpy).toHaveBeenCalled();
        expect(starshipRepositoryFindOneSpy).toHaveBeenCalled();
        expect(starshipRepositorySaveSpy).toHaveBeenCalledWith(starships);        
        expect(starshipRepositoryDeleteSpy).toHaveBeenCalledWith(name);
      });

      it('should call remove method with expected param', async () => {
        const removeSpy = jest.spyOn(service, 'remove');
        const imagesServiceDeleteFilesSpy = jest.spyOn(imagesService, 'deleteFiles');
        const name: string = 'Abu';
        const starships = new Starships();
        starships.images = [];
        const starshipRepositorySaveSpy = jest.spyOn(starshipRepositorySpy, 'save');
        const starshipRepositoryFindOneSpy = jest.spyOn(starshipRepositorySpy, 'findOne');
        const starshipRepositoryDeleteSpy = jest
            .spyOn(starshipRepositorySpy, 'delete')
            .mockReturnValue(Promise.resolve({ raw: [], affected: 0 }));
        expect(await service.remove(name)).toBeInstanceOf(HttpException);
        expect(removeSpy).toHaveBeenCalledWith(name);
        expect(imagesServiceDeleteFilesSpy).not.toHaveBeenCalled();
        expect(starshipRepositorySaveSpy).not.toHaveBeenCalled();
        expect(starshipRepositoryFindOneSpy).toHaveBeenCalled();
        expect(starshipRepositoryDeleteSpy).toHaveBeenCalled();
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
