import { Test, TestingModule } from '@nestjs/testing';
import { FilesUploadDto } from '../images/dto/create-image.dto';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';

describe('SpeciesController', () => {
  let controller: SpeciesController;
  let spyService: SpeciesService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: SpeciesService,
      useFactory: () => ({
        create: jest.fn(() => []),
        findAll: jest.fn(() => []),
        findOne: jest.fn(() => { }),
        remove: jest.fn(() => { }),
        uploadFile: jest.fn(() => { }),
        deleteImage: jest.fn(() => { }),
        uploadFileS3: jest.fn(() => { }),
        deleteFileS3: jest.fn(() => { })
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SpeciesController],
      providers: [ApiServiceProvider],
    }).compile();

    controller = app.get<SpeciesController>(SpeciesController);
    spyService = app.get<SpeciesService>(SpeciesService);
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("calling create method", () => {
    const dto = new CreateSpeciesDto();
    expect(controller.create(dto)).not.toEqual(null);
  })

  it("calling create method", () => {
    const dto = new CreateSpeciesDto();
    controller.create(dto);
    expect(spyService.create).toHaveBeenCalled();
    expect(spyService.create).toHaveBeenCalledWith(dto);
  })

  it("calling findAll method", () => {
    controller.findAll(1, 5);
    expect(spyService.findAll).toHaveBeenCalled();
  })

  it("calling findOne method", () => {
    const name = 'Abu';
    controller.findOne(name);
    expect(spyService.findOne).toHaveBeenCalled();
  })
  
  it("calling remove method", () => {
    const name = 'Abu';
    controller.remove(name);
    expect(spyService.remove).toHaveBeenCalled();
  })

  it("calling uploadFile method", () => {
    const files: Array<Express.Multer.File> = [];
    const dto = new FilesUploadDto();
    controller.uploadFile(files, dto);
    expect(spyService.uploadFile).toHaveBeenCalled();
  })

  it("calling deleteImage method", () => {
    const name = 'Abu';
    const image = '';
    controller.deleteImage(name, image);
    expect(spyService.deleteImage).toHaveBeenCalled();
  })

  it("calling uploadFileS3 method", () => {
    let file: Express.Multer.File;
    const dto = new FilesUploadDto();
    controller.uploadFileS3(file, dto);
    expect(spyService.uploadFileS3).toHaveBeenCalled();
  })
  
  it("calling deleteFileS3 method", () => {
    const name = 'Abu';
    const image = '';
    controller.deleteFileS3(name, image);
    expect(spyService.deleteFileS3).toHaveBeenCalled();
  })
});