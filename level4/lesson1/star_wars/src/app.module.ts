import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import 'dotenv/config';

import { PeopleModule } from './people/people.module';
import { FilmsModule } from './films/films.module';
import { StarshipsModule } from './starships/starships.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { SpeciesModule } from './species/species.module';
import { PlanetsModule } from './planets/planets.module';
import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './images/images.module';
import { AppController } from './app.controller';
import { getConfig } from './common/config';

@Module({
  imports: [    
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getConfig],
      //envFilePath: './config/development.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService): TypeOrmModuleOptions {
        const mysql = config.get('databases.mysql');
        return {
          type: 'mysql',
          host: mysql.host,
          port: mysql.port,
          username: mysql.user,
          password: mysql.password,
          database: mysql.database,
          autoLoadEntities: true,
          synchronize: false,
        };
      },
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '/../../files'),   // наши картинки
    // }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: process.env.DB_USER,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_DATABASE,
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }), 
    AuthModule, PeopleModule, FilmsModule, StarshipsModule, VehiclesModule, SpeciesModule, PlanetsModule, ImagesModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
