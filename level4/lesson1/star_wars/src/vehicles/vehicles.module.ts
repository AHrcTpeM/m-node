import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { Vehicles } from './entities/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicles])],
  exports: [TypeOrmModule],
  controllers: [VehiclesController],
  providers: [VehiclesService]
})
export class VehiclesModule {}
