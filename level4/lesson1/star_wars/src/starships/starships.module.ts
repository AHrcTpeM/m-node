import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { Starships } from './entities/starship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Starships])],
  exports: [TypeOrmModule],
  controllers: [StarshipsController],
  providers: [StarshipsService]
})
export class StarshipsModule {}
