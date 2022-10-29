import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Films } from '../films/entities/film.entity';
import { People } from '../people/entities/people.entity';
import { Repository } from 'typeorm';
import { FileUploadDto } from '../images/dto/create-image.dto';
import { ImagesService } from '../images/images.service';
import { HttpException } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { Vehicles } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

class RepositoryFake {
  public create(): void {}
  public async save(): Promise<void> {}
  public async delete(): Promise<void> {}
  public async findOne(): Promise<void> {}
  public async find(): Promise<any[]> { return [] }
}

describe('VehiclesService', () => {
  let service: VehiclesService;
  let imagesService: ImagesService;
  let vehicleRepositorySpy: Repository<Vehicles>;

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
      providers: [ VehiclesService, ApiServiceProvider,
        {
          provide: getRepositoryToken(Vehicles),
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

    service = module.get<VehiclesService>(VehiclesService);
    imagesService = module.get<ImagesService>(ImagesService);
    vehicleRepositorySpy = module.get(getRepositoryToken(Vehicles));
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call create method with expected params', async () => {
    const createSpy = jest.spyOn(service, 'create');
    const dto = new CreateVehicleDto();
    dto.name = 'Abu';
    const vehicles = new Vehicles();
    vehicles.name = 'Moon';
    const vehicleRepositorySaveSpy = jest
        .spyOn(vehicleRepositorySpy, 'save')
        .mockReturnValue(Promise.resolve(vehicles));
        
    expect(await service.create(dto)).toEqual(vehicles);
    expect(createSpy).toHaveBeenCalledWith(dto);
    expect(vehicleRepositorySaveSpy).toHaveBeenCalledTimes(2);
    expect(vehicleRepositorySaveSpy).toHaveBeenCalledWith(dto);
  });

  it('should call findOne method with expected param', async () => {
    expect.assertions(4);

    const name: string = 'Abu';
    expect(service.findOne(name)).rejects.toBeInstanceOf(HttpException);

    const vehicles = new Vehicles();
    vehicles.name = "Moon";
    const vehicleRepositoryFindOneSpy = jest
        .spyOn(vehicleRepositorySpy, 'findOne')
        .mockReturnValue(Promise.resolve(vehicles));
    const findOneSpy = jest.spyOn(service, 'findOne');
    
    service.findOne(name);
    expect(findOneSpy).toHaveBeenCalledWith(name);
    expect(vehicleRepositoryFindOneSpy).toHaveBeenCalled();
    expect(await service.findOne(name)).toEqual(vehicles);
  });

  it('should call findAll method with expected params', async () => {
    const findAllSpy = jest.spyOn(service, 'findAll');
    const vehicles = new Vehicles();
    const vehicleRepositoryFindSpy = jest
        .spyOn(vehicleRepositorySpy, 'find')
        .mockReturnValue(Promise.resolve([vehicles]));
        
    expect(await service.findAll()).toEqual([vehicles]);
    expect(findAllSpy).toHaveBeenCalled();
    expect(vehicleRepositoryFindSpy).toHaveBeenCalled();
  });

  describe('remove method', () => {
      it('should call remove method with expected param', async () => {
        const removeSpy = jest.spyOn(service, 'remove');
        const imagesServiceDeleteFilesSpy = jest.spyOn(imagesService, 'deleteFiles');
        const name: string = 'Abu';
        const vehicles = new Vehicles();
        vehicles.images = [];
        const vehicleRepositorySaveSpy = jest.spyOn(vehicleRepositorySpy, 'save');
        const vehicleRepositoryFindOneSpy = jest
            .spyOn(vehicleRepositorySpy, 'findOne')
            .mockReturnValue(Promise.resolve(vehicles));
        const vehicleRepositoryDeleteSpy = jest
            .spyOn(vehicleRepositorySpy, 'delete')
            .mockReturnValue(Promise.resolve({ raw: [], affected: 1 }));

        expect(await service.remove(name)).toEqual({name, deleted: 'success'});
        expect(removeSpy).toHaveBeenCalledWith(name);
        expect(imagesServiceDeleteFilesSpy).toHaveBeenCalled();
        expect(vehicleRepositoryFindOneSpy).toHaveBeenCalled();
        expect(vehicleRepositorySaveSpy).toHaveBeenCalledWith(vehicles);        
        expect(vehicleRepositoryDeleteSpy).toHaveBeenCalledWith(name);
      });

      it('should call remove method with expected param', async () => {
        const removeSpy = jest.spyOn(service, 'remove');
        const imagesServiceDeleteFilesSpy = jest.spyOn(imagesService, 'deleteFiles');
        const name: string = 'Abu';
        const vehicles = new Vehicles();
        vehicles.images = [];
        const vehicleRepositorySaveSpy = jest.spyOn(vehicleRepositorySpy, 'save');
        const vehicleRepositoryFindOneSpy = jest.spyOn(vehicleRepositorySpy, 'findOne');
        const vehicleRepositoryDeleteSpy = jest
            .spyOn(vehicleRepositorySpy, 'delete')
            .mockReturnValue(Promise.resolve({ raw: [], affected: 0 }));
        expect(await service.remove(name)).toBeInstanceOf(HttpException);
        expect(removeSpy).toHaveBeenCalledWith(name);
        expect(imagesServiceDeleteFilesSpy).not.toHaveBeenCalled();
        expect(vehicleRepositorySaveSpy).not.toHaveBeenCalled();
        expect(vehicleRepositoryFindOneSpy).toHaveBeenCalled();
        expect(vehicleRepositoryDeleteSpy).toHaveBeenCalled();
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
