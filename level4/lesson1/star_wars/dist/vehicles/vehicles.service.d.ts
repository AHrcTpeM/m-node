import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicles } from './entities/vehicle.entity';
export declare class VehiclesService {
    private readonly vehiclesRepository;
    constructor(vehiclesRepository: Repository<Vehicles>);
    create(createVehiclesDto: CreateVehicleDto): Promise<Vehicles>;
    findAll(): Promise<Vehicles[]>;
    findOne(name: string): Promise<Vehicles>;
    remove(name: string): Promise<void>;
}
