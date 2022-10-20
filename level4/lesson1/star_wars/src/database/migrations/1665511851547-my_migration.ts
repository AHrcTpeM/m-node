import { MigrationInterface, QueryRunner } from "typeorm";

export class myMigration1665511851547 implements MigrationInterface {
    name = 'myMigration1665511851547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`species\` (\`name\` varchar(255) NOT NULL, \`classification\` varchar(255) NOT NULL, \`designation\` varchar(255) NOT NULL, \`average_height\` varchar(255) NOT NULL, \`average_lifespan\` varchar(255) NOT NULL, \`eye_color\` varchar(255) NOT NULL DEFAULT 'n/a', \`hair_colors\` varchar(255) NOT NULL, \`skin_colors\` varchar(255) NOT NULL, \`language\` varchar(255) NOT NULL DEFAULT 'true', \`homeworld\` varchar(255) NULL DEFAULT 'true', \`created\` varchar(255) NOT NULL DEFAULT 'true', \`edited\` varchar(255) NOT NULL DEFAULT 'true', \`url\` varchar(255) NOT NULL DEFAULT 'true', UNIQUE INDEX \`IDX_86eba64ed08b3673df47cca655\` (\`url\`), PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehicles\` (\`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`vehicle_class\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL DEFAULT 'true', \`cargo_capacity\` varchar(255) NOT NULL DEFAULT 'true', \`consumables\` varchar(255) NOT NULL DEFAULT 'true', \`created\` varchar(255) NOT NULL DEFAULT 'true', \`edited\` varchar(255) NOT NULL DEFAULT 'true', \`url\` varchar(255) NOT NULL DEFAULT 'true', UNIQUE INDEX \`IDX_5355e93a3aeb7ca9456a5a9dc3\` (\`url\`), PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`starships\` (\`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`starship_class\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL DEFAULT 'true', \`hyperdrive_rating\` varchar(255) NOT NULL DEFAULT 'true', \`MGLT\` varchar(255) NOT NULL DEFAULT 'true', \`cargo_capacity\` varchar(255) NOT NULL DEFAULT 'true', \`consumables\` varchar(255) NOT NULL DEFAULT 'true', \`created\` varchar(255) NOT NULL DEFAULT 'true', \`edited\` varchar(255) NOT NULL DEFAULT 'true', \`url\` varchar(255) NOT NULL DEFAULT 'true', UNIQUE INDEX \`IDX_9feba736ac458e843a5df80ff1\` (\`url\`), PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people\` (\`name\` varchar(255) NOT NULL, \`height\` varchar(255) NOT NULL, \`mass\` varchar(255) NOT NULL, \`hair_color\` varchar(255) NOT NULL, \`skin_color\` varchar(255) NOT NULL, \`eye_color\` varchar(255) NOT NULL, \`birth_year\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`homeworld\` varchar(255) NOT NULL DEFAULT 'true', \`created\` varchar(255) NOT NULL DEFAULT 'true', \`edited\` varchar(255) NOT NULL DEFAULT 'true', \`url\` varchar(255) NOT NULL DEFAULT 'true', \`image\` text NOT NULL, UNIQUE INDEX \`IDX_f3d026dcae4b855e5ac3dc7834\` (\`url\`), PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films\` (\`title\` varchar(255) NOT NULL, \`episode_id\` int NOT NULL, \`opening_crawl\` text NOT NULL, \`director\` varchar(255) NOT NULL, \`producer\` varchar(255) NOT NULL, \`release_date\` datetime NOT NULL, \`url\` varchar(255) NOT NULL DEFAULT 'true', \`created\` varchar(255) NOT NULL DEFAULT 'true', \`edited\` varchar(255) NOT NULL DEFAULT 'true', UNIQUE INDEX \`IDX_6c40323ce20cc863369cc33ee8\` (\`url\`), PRIMARY KEY (\`title\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`planets\` (\`name\` varchar(255) NOT NULL, \`diameter\` varchar(255) NOT NULL, \`rotation_period\` varchar(255) NOT NULL, \`orbital_period\` varchar(255) NOT NULL, \`gravity\` varchar(255) NOT NULL, \`population\` varchar(255) NOT NULL, \`climate\` varchar(255) NOT NULL, \`terrain\` varchar(255) NOT NULL, \`surface_water\` varchar(255) NOT NULL DEFAULT 'true', \`created\` varchar(255) NOT NULL DEFAULT 'true', \`edited\` varchar(255) NOT NULL DEFAULT 'true', \`url\` varchar(255) NOT NULL DEFAULT 'true', UNIQUE INDEX \`IDX_de8e5a046e3a80e5ac3d776e83\` (\`url\`), PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`species_people_people\` (\`speciesUrl\` varchar(255) NOT NULL, \`peopleUrl\` varchar(255) NOT NULL, INDEX \`IDX_206acc3c1fd1eaf2f0f17fa8ff\` (\`speciesUrl\`), INDEX \`IDX_763fe31c406dcfad488d4bb699\` (\`peopleUrl\`), PRIMARY KEY (\`speciesUrl\`, \`peopleUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`species_films_films\` (\`speciesUrl\` varchar(255) NOT NULL, \`filmsUrl\` varchar(255) NOT NULL, INDEX \`IDX_ec120188eaaa681ce81edca90a\` (\`speciesUrl\`), INDEX \`IDX_e2777dcdca9109495b5e8f9a65\` (\`filmsUrl\`), PRIMARY KEY (\`speciesUrl\`, \`filmsUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehicles_films_films\` (\`vehiclesUrl\` varchar(255) NOT NULL, \`filmsUrl\` varchar(255) NOT NULL, INDEX \`IDX_d67ef45285714227b1573fb07c\` (\`vehiclesUrl\`), INDEX \`IDX_dbb6d7f488e121e45469367796\` (\`filmsUrl\`), PRIMARY KEY (\`vehiclesUrl\`, \`filmsUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehicles_pilots_people\` (\`vehiclesUrl\` varchar(255) NOT NULL, \`peopleUrl\` varchar(255) NOT NULL, INDEX \`IDX_fbe7e9e45c30fd811cfc7a28e7\` (\`vehiclesUrl\`), INDEX \`IDX_bf44d2f66adf5e7d78829c4513\` (\`peopleUrl\`), PRIMARY KEY (\`vehiclesUrl\`, \`peopleUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`starships_films_films\` (\`starshipsUrl\` varchar(255) NOT NULL, \`filmsUrl\` varchar(255) NOT NULL, INDEX \`IDX_26c2061f1654e41ba2ff1dd623\` (\`starshipsUrl\`), INDEX \`IDX_df31d17a8f191cea4cffca5c80\` (\`filmsUrl\`), PRIMARY KEY (\`starshipsUrl\`, \`filmsUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`starships_pilots_people\` (\`starshipsUrl\` varchar(255) NOT NULL, \`peopleUrl\` varchar(255) NOT NULL, INDEX \`IDX_7ff2ec92788af709393bc1de83\` (\`starshipsUrl\`), INDEX \`IDX_eafaecce6c35a9d87395a16006\` (\`peopleUrl\`), PRIMARY KEY (\`starshipsUrl\`, \`peopleUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_films_films\` (\`peopleUrl\` varchar(255) NOT NULL, \`filmsUrl\` varchar(255) NOT NULL, INDEX \`IDX_7eb6329de2622a74e568c2bc06\` (\`peopleUrl\`), INDEX \`IDX_13505ec9b2e630c92e57a4617a\` (\`filmsUrl\`), PRIMARY KEY (\`peopleUrl\`, \`filmsUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`planets_films_films\` (\`planetsUrl\` varchar(255) NOT NULL, \`filmsUrl\` varchar(255) NOT NULL, INDEX \`IDX_9ea134d2c1dde5d1bd67840c25\` (\`planetsUrl\`), INDEX \`IDX_8c516d494922a900cc4768fb01\` (\`filmsUrl\`), PRIMARY KEY (\`planetsUrl\`, \`filmsUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`planets_residents_people\` (\`planetsUrl\` varchar(255) NOT NULL, \`peopleUrl\` varchar(255) NOT NULL, INDEX \`IDX_0110d200840731a07e64b40424\` (\`planetsUrl\`), INDEX \`IDX_cec4bb3f7bd335f5e69bc4badc\` (\`peopleUrl\`), PRIMARY KEY (\`planetsUrl\`, \`peopleUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`species_people_people\` ADD CONSTRAINT \`FK_206acc3c1fd1eaf2f0f17fa8ff9\` FOREIGN KEY (\`speciesUrl\`) REFERENCES \`species\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`species_people_people\` ADD CONSTRAINT \`FK_763fe31c406dcfad488d4bb699d\` FOREIGN KEY (\`peopleUrl\`) REFERENCES \`people\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`species_films_films\` ADD CONSTRAINT \`FK_ec120188eaaa681ce81edca90a1\` FOREIGN KEY (\`speciesUrl\`) REFERENCES \`species\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`species_films_films\` ADD CONSTRAINT \`FK_e2777dcdca9109495b5e8f9a651\` FOREIGN KEY (\`filmsUrl\`) REFERENCES \`films\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vehicles_films_films\` ADD CONSTRAINT \`FK_d67ef45285714227b1573fb07c7\` FOREIGN KEY (\`vehiclesUrl\`) REFERENCES \`vehicles\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`vehicles_films_films\` ADD CONSTRAINT \`FK_dbb6d7f488e121e454693677968\` FOREIGN KEY (\`filmsUrl\`) REFERENCES \`films\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vehicles_pilots_people\` ADD CONSTRAINT \`FK_fbe7e9e45c30fd811cfc7a28e73\` FOREIGN KEY (\`vehiclesUrl\`) REFERENCES \`vehicles\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`vehicles_pilots_people\` ADD CONSTRAINT \`FK_bf44d2f66adf5e7d78829c45137\` FOREIGN KEY (\`peopleUrl\`) REFERENCES \`people\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`starships_films_films\` ADD CONSTRAINT \`FK_26c2061f1654e41ba2ff1dd6232\` FOREIGN KEY (\`starshipsUrl\`) REFERENCES \`starships\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`starships_films_films\` ADD CONSTRAINT \`FK_df31d17a8f191cea4cffca5c802\` FOREIGN KEY (\`filmsUrl\`) REFERENCES \`films\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`starships_pilots_people\` ADD CONSTRAINT \`FK_7ff2ec92788af709393bc1de834\` FOREIGN KEY (\`starshipsUrl\`) REFERENCES \`starships\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`starships_pilots_people\` ADD CONSTRAINT \`FK_eafaecce6c35a9d87395a160063\` FOREIGN KEY (\`peopleUrl\`) REFERENCES \`people\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_films_films\` ADD CONSTRAINT \`FK_7eb6329de2622a74e568c2bc061\` FOREIGN KEY (\`peopleUrl\`) REFERENCES \`people\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_films_films\` ADD CONSTRAINT \`FK_13505ec9b2e630c92e57a4617a8\` FOREIGN KEY (\`filmsUrl\`) REFERENCES \`films\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`planets_films_films\` ADD CONSTRAINT \`FK_9ea134d2c1dde5d1bd67840c256\` FOREIGN KEY (\`planetsUrl\`) REFERENCES \`planets\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`planets_films_films\` ADD CONSTRAINT \`FK_8c516d494922a900cc4768fb014\` FOREIGN KEY (\`filmsUrl\`) REFERENCES \`films\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`planets_residents_people\` ADD CONSTRAINT \`FK_0110d200840731a07e64b40424e\` FOREIGN KEY (\`planetsUrl\`) REFERENCES \`planets\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`planets_residents_people\` ADD CONSTRAINT \`FK_cec4bb3f7bd335f5e69bc4badce\` FOREIGN KEY (\`peopleUrl\`) REFERENCES \`people\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`planets_residents_people\` DROP FOREIGN KEY \`FK_cec4bb3f7bd335f5e69bc4badce\``);
        await queryRunner.query(`ALTER TABLE \`planets_residents_people\` DROP FOREIGN KEY \`FK_0110d200840731a07e64b40424e\``);
        await queryRunner.query(`ALTER TABLE \`planets_films_films\` DROP FOREIGN KEY \`FK_8c516d494922a900cc4768fb014\``);
        await queryRunner.query(`ALTER TABLE \`planets_films_films\` DROP FOREIGN KEY \`FK_9ea134d2c1dde5d1bd67840c256\``);
        await queryRunner.query(`ALTER TABLE \`people_films_films\` DROP FOREIGN KEY \`FK_13505ec9b2e630c92e57a4617a8\``);
        await queryRunner.query(`ALTER TABLE \`people_films_films\` DROP FOREIGN KEY \`FK_7eb6329de2622a74e568c2bc061\``);
        await queryRunner.query(`ALTER TABLE \`starships_pilots_people\` DROP FOREIGN KEY \`FK_eafaecce6c35a9d87395a160063\``);
        await queryRunner.query(`ALTER TABLE \`starships_pilots_people\` DROP FOREIGN KEY \`FK_7ff2ec92788af709393bc1de834\``);
        await queryRunner.query(`ALTER TABLE \`starships_films_films\` DROP FOREIGN KEY \`FK_df31d17a8f191cea4cffca5c802\``);
        await queryRunner.query(`ALTER TABLE \`starships_films_films\` DROP FOREIGN KEY \`FK_26c2061f1654e41ba2ff1dd6232\``);
        await queryRunner.query(`ALTER TABLE \`vehicles_pilots_people\` DROP FOREIGN KEY \`FK_bf44d2f66adf5e7d78829c45137\``);
        await queryRunner.query(`ALTER TABLE \`vehicles_pilots_people\` DROP FOREIGN KEY \`FK_fbe7e9e45c30fd811cfc7a28e73\``);
        await queryRunner.query(`ALTER TABLE \`vehicles_films_films\` DROP FOREIGN KEY \`FK_dbb6d7f488e121e454693677968\``);
        await queryRunner.query(`ALTER TABLE \`vehicles_films_films\` DROP FOREIGN KEY \`FK_d67ef45285714227b1573fb07c7\``);
        await queryRunner.query(`ALTER TABLE \`species_films_films\` DROP FOREIGN KEY \`FK_e2777dcdca9109495b5e8f9a651\``);
        await queryRunner.query(`ALTER TABLE \`species_films_films\` DROP FOREIGN KEY \`FK_ec120188eaaa681ce81edca90a1\``);
        await queryRunner.query(`ALTER TABLE \`species_people_people\` DROP FOREIGN KEY \`FK_763fe31c406dcfad488d4bb699d\``);
        await queryRunner.query(`ALTER TABLE \`species_people_people\` DROP FOREIGN KEY \`FK_206acc3c1fd1eaf2f0f17fa8ff9\``);
        await queryRunner.query(`DROP INDEX \`IDX_cec4bb3f7bd335f5e69bc4badc\` ON \`planets_residents_people\``);
        await queryRunner.query(`DROP INDEX \`IDX_0110d200840731a07e64b40424\` ON \`planets_residents_people\``);
        await queryRunner.query(`DROP TABLE \`planets_residents_people\``);
        await queryRunner.query(`DROP INDEX \`IDX_8c516d494922a900cc4768fb01\` ON \`planets_films_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_9ea134d2c1dde5d1bd67840c25\` ON \`planets_films_films\``);
        await queryRunner.query(`DROP TABLE \`planets_films_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_13505ec9b2e630c92e57a4617a\` ON \`people_films_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_7eb6329de2622a74e568c2bc06\` ON \`people_films_films\``);
        await queryRunner.query(`DROP TABLE \`people_films_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_eafaecce6c35a9d87395a16006\` ON \`starships_pilots_people\``);
        await queryRunner.query(`DROP INDEX \`IDX_7ff2ec92788af709393bc1de83\` ON \`starships_pilots_people\``);
        await queryRunner.query(`DROP TABLE \`starships_pilots_people\``);
        await queryRunner.query(`DROP INDEX \`IDX_df31d17a8f191cea4cffca5c80\` ON \`starships_films_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_26c2061f1654e41ba2ff1dd623\` ON \`starships_films_films\``);
        await queryRunner.query(`DROP TABLE \`starships_films_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_bf44d2f66adf5e7d78829c4513\` ON \`vehicles_pilots_people\``);
        await queryRunner.query(`DROP INDEX \`IDX_fbe7e9e45c30fd811cfc7a28e7\` ON \`vehicles_pilots_people\``);
        await queryRunner.query(`DROP TABLE \`vehicles_pilots_people\``);
        await queryRunner.query(`DROP INDEX \`IDX_dbb6d7f488e121e45469367796\` ON \`vehicles_films_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_d67ef45285714227b1573fb07c\` ON \`vehicles_films_films\``);
        await queryRunner.query(`DROP TABLE \`vehicles_films_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_e2777dcdca9109495b5e8f9a65\` ON \`species_films_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_ec120188eaaa681ce81edca90a\` ON \`species_films_films\``);
        await queryRunner.query(`DROP TABLE \`species_films_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_763fe31c406dcfad488d4bb699\` ON \`species_people_people\``);
        await queryRunner.query(`DROP INDEX \`IDX_206acc3c1fd1eaf2f0f17fa8ff\` ON \`species_people_people\``);
        await queryRunner.query(`DROP TABLE \`species_people_people\``);
        await queryRunner.query(`DROP INDEX \`IDX_de8e5a046e3a80e5ac3d776e83\` ON \`planets\``);
        await queryRunner.query(`DROP TABLE \`planets\``);
        await queryRunner.query(`DROP INDEX \`IDX_6c40323ce20cc863369cc33ee8\` ON \`films\``);
        await queryRunner.query(`DROP TABLE \`films\``);
        await queryRunner.query(`DROP INDEX \`IDX_f3d026dcae4b855e5ac3dc7834\` ON \`people\``);
        await queryRunner.query(`DROP TABLE \`people\``);
        await queryRunner.query(`DROP INDEX \`IDX_9feba736ac458e843a5df80ff1\` ON \`starships\``);
        await queryRunner.query(`DROP TABLE \`starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_5355e93a3aeb7ca9456a5a9dc3\` ON \`vehicles\``);
        await queryRunner.query(`DROP TABLE \`vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_86eba64ed08b3673df47cca655\` ON \`species\``);
        await queryRunner.query(`DROP TABLE \`species\``);
    }

}
