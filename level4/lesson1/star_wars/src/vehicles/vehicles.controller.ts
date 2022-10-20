import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiQuery, ApiConsumes, ApiProperty } from '@nestjs/swagger';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicles } from './entities/vehicle.entity';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  create(@Body() createVehiclesDto: CreateVehicleDto): Promise<Vehicles> {
    return this.vehiclesService.create(createVehiclesDto);
  }

  @Get()
  findAll(): Promise<Vehicles[]> {
    return this.vehiclesService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string): Promise<Vehicles> {
    return this.vehiclesService.findOne(name);
  }

  @Delete(':name')
  remove(@Param('name') name: string): Promise<void> {
    return this.vehiclesService.remove(name);
  }
}
