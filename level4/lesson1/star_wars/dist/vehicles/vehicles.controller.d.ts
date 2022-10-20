import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicles } from './entities/vehicle.entity';
export declare class VehiclesController {
    private readonly vehiclesService;
    constructor(vehiclesService: VehiclesService);
    create(createVehiclesDto: CreateVehicleDto): Promise<Vehicles>;
    findAll(): Promise<Vehicles[]>;
    findOne(name: string): Promise<Vehicles>;
    remove(name: string): Promise<void>;
}
