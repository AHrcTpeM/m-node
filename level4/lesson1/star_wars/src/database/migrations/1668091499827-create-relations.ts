import { MigrationInterface, QueryRunner } from "typeorm";

export class createRelations1668091499827 implements MigrationInterface {
    name = 'createRelations1668091499827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`starships_films_films\` (\`starshipsUrl\` varchar(255) NOT NULL, \`filmsUrl\` varchar(255) NOT NULL, INDEX \`IDX_26c2061f1654e41ba2ff1dd623\` (\`starshipsUrl\`), INDEX \`IDX_df31d17a8f191cea4cffca5c80\` (\`filmsUrl\`), PRIMARY KEY (\`starshipsUrl\`, \`filmsUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`starships_pilots_people\` (\`starshipsUrl\` varchar(255) NOT NULL, \`peopleUrl\` varchar(255) NOT NULL, INDEX \`IDX_7ff2ec92788af709393bc1de83\` (\`starshipsUrl\`), INDEX \`IDX_eafaecce6c35a9d87395a16006\` (\`peopleUrl\`), PRIMARY KEY (\`starshipsUrl\`, \`peopleUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehicles_films_films\` (\`vehiclesUrl\` varchar(255) NOT NULL, \`filmsUrl\` varchar(255) NOT NULL, INDEX \`IDX_d67ef45285714227b1573fb07c\` (\`vehiclesUrl\`), INDEX \`IDX_dbb6d7f488e121e45469367796\` (\`filmsUrl\`), PRIMARY KEY (\`vehiclesUrl\`, \`filmsUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehicles_pilots_people\` (\`vehiclesUrl\` varchar(255) NOT NULL, \`peopleUrl\` varchar(255) NOT NULL, INDEX \`IDX_fbe7e9e45c30fd811cfc7a28e7\` (\`vehiclesUrl\`), INDEX \`IDX_bf44d2f66adf5e7d78829c4513\` (\`peopleUrl\`), PRIMARY KEY (\`vehiclesUrl\`, \`peopleUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`planets_films_films\` (\`planetsUrl\` varchar(255) NOT NULL, \`filmsUrl\` varchar(255) NOT NULL, INDEX \`IDX_9ea134d2c1dde5d1bd67840c25\` (\`planetsUrl\`), INDEX \`IDX_8c516d494922a900cc4768fb01\` (\`filmsUrl\`), PRIMARY KEY (\`planetsUrl\`, \`filmsUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`species_people_people\` (\`speciesUrl\` varchar(255) NOT NULL, \`peopleUrl\` varchar(255) NOT NULL, INDEX \`IDX_206acc3c1fd1eaf2f0f17fa8ff\` (\`speciesUrl\`), INDEX \`IDX_763fe31c406dcfad488d4bb699\` (\`peopleUrl\`), PRIMARY KEY (\`speciesUrl\`, \`peopleUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`species_films_films\` (\`speciesUrl\` varchar(255) NOT NULL, \`filmsUrl\` varchar(255) NOT NULL, INDEX \`IDX_ec120188eaaa681ce81edca90a\` (\`speciesUrl\`), INDEX \`IDX_e2777dcdca9109495b5e8f9a65\` (\`filmsUrl\`), PRIMARY KEY (\`speciesUrl\`, \`filmsUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_films_films\` (\`peopleUrl\` varchar(255) NOT NULL, \`filmsUrl\` varchar(255) NOT NULL, INDEX \`IDX_7eb6329de2622a74e568c2bc06\` (\`peopleUrl\`), INDEX \`IDX_13505ec9b2e630c92e57a4617a\` (\`filmsUrl\`), PRIMARY KEY (\`peopleUrl\`, \`filmsUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD \`peopleName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD \`filmsTitle\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD \`speciesName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD \`starshipsName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD \`vehiclesName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD \`planetsName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`people\` ADD \`homeworldUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_a8b6140b7713dce74551c047b85\` FOREIGN KEY (\`peopleName\`) REFERENCES \`people\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_ee9a0635984f31deb3bab13ba08\` FOREIGN KEY (\`filmsTitle\`) REFERENCES \`films\`(\`title\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_5ab331642ec72ce8acd34ae5736\` FOREIGN KEY (\`speciesName\`) REFERENCES \`species\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_1f3fc2aa86b6a332b59b37cc60c\` FOREIGN KEY (\`starshipsName\`) REFERENCES \`starships\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_b692250a7db06c988b774cfa3a0\` FOREIGN KEY (\`vehiclesName\`) REFERENCES \`vehicles\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_c934ffc3dae5fc641daa172d6d0\` FOREIGN KEY (\`planetsName\`) REFERENCES \`planets\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people\` ADD CONSTRAINT \`FK_db5ab220b9854727011c353fa6c\` FOREIGN KEY (\`homeworldUrl\`) REFERENCES \`planets\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`starships_films_films\` ADD CONSTRAINT \`FK_26c2061f1654e41ba2ff1dd6232\` FOREIGN KEY (\`starshipsUrl\`) REFERENCES \`starships\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`starships_films_films\` ADD CONSTRAINT \`FK_df31d17a8f191cea4cffca5c802\` FOREIGN KEY (\`filmsUrl\`) REFERENCES \`films\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`starships_pilots_people\` ADD CONSTRAINT \`FK_7ff2ec92788af709393bc1de834\` FOREIGN KEY (\`starshipsUrl\`) REFERENCES \`starships\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`starships_pilots_people\` ADD CONSTRAINT \`FK_eafaecce6c35a9d87395a160063\` FOREIGN KEY (\`peopleUrl\`) REFERENCES \`people\`(\`url\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vehicles_films_films\` ADD CONSTRAINT \`FK_d67ef45285714227b1573fb07c7\` FOREIGN KEY (\`vehiclesUrl\`) REFERENCES \`vehicles\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`vehicles_films_films\` ADD CONSTRAINT \`FK_dbb6d7f488e121e454693677968\` FOREIGN KEY (\`filmsUrl\`) REFERENCES \`films\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vehicles_pilots_people\` ADD CONSTRAINT \`FK_fbe7e9e45c30fd811cfc7a28e73\` FOREIGN KEY (\`vehiclesUrl\`) REFERENCES \`vehicles\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`vehicles_pilots_people\` ADD CONSTRAINT \`FK_bf44d2f66adf5e7d78829c45137\` FOREIGN KEY (\`peopleUrl\`) REFERENCES \`people\`(\`url\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`planets_films_films\` ADD CONSTRAINT \`FK_9ea134d2c1dde5d1bd67840c256\` FOREIGN KEY (\`planetsUrl\`) REFERENCES \`planets\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`planets_films_films\` ADD CONSTRAINT \`FK_8c516d494922a900cc4768fb014\` FOREIGN KEY (\`filmsUrl\`) REFERENCES \`films\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`species_people_people\` ADD CONSTRAINT \`FK_206acc3c1fd1eaf2f0f17fa8ff9\` FOREIGN KEY (\`speciesUrl\`) REFERENCES \`species\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`species_people_people\` ADD CONSTRAINT \`FK_763fe31c406dcfad488d4bb699d\` FOREIGN KEY (\`peopleUrl\`) REFERENCES \`people\`(\`url\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`species_films_films\` ADD CONSTRAINT \`FK_ec120188eaaa681ce81edca90a1\` FOREIGN KEY (\`speciesUrl\`) REFERENCES \`species\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`species_films_films\` ADD CONSTRAINT \`FK_e2777dcdca9109495b5e8f9a651\` FOREIGN KEY (\`filmsUrl\`) REFERENCES \`films\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_films_films\` ADD CONSTRAINT \`FK_7eb6329de2622a74e568c2bc061\` FOREIGN KEY (\`peopleUrl\`) REFERENCES \`people\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_films_films\` ADD CONSTRAINT \`FK_13505ec9b2e630c92e57a4617a8\` FOREIGN KEY (\`filmsUrl\`) REFERENCES \`films\`(\`url\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`people_films_films\` DROP FOREIGN KEY \`FK_13505ec9b2e630c92e57a4617a8\``);
        await queryRunner.query(`ALTER TABLE \`people_films_films\` DROP FOREIGN KEY \`FK_7eb6329de2622a74e568c2bc061\``);
        await queryRunner.query(`ALTER TABLE \`species_films_films\` DROP FOREIGN KEY \`FK_e2777dcdca9109495b5e8f9a651\``);
        await queryRunner.query(`ALTER TABLE \`species_films_films\` DROP FOREIGN KEY \`FK_ec120188eaaa681ce81edca90a1\``);
        await queryRunner.query(`ALTER TABLE \`species_people_people\` DROP FOREIGN KEY \`FK_763fe31c406dcfad488d4bb699d\``);
        await queryRunner.query(`ALTER TABLE \`species_people_people\` DROP FOREIGN KEY \`FK_206acc3c1fd1eaf2f0f17fa8ff9\``);
        await queryRunner.query(`ALTER TABLE \`planets_films_films\` DROP FOREIGN KEY \`FK_8c516d494922a900cc4768fb014\``);
        await queryRunner.query(`ALTER TABLE \`planets_films_films\` DROP FOREIGN KEY \`FK_9ea134d2c1dde5d1bd67840c256\``);
        await queryRunner.query(`ALTER TABLE \`vehicles_pilots_people\` DROP FOREIGN KEY \`FK_bf44d2f66adf5e7d78829c45137\``);
        await queryRunner.query(`ALTER TABLE \`vehicles_pilots_people\` DROP FOREIGN KEY \`FK_fbe7e9e45c30fd811cfc7a28e73\``);
        await queryRunner.query(`ALTER TABLE \`vehicles_films_films\` DROP FOREIGN KEY \`FK_dbb6d7f488e121e454693677968\``);
        await queryRunner.query(`ALTER TABLE \`vehicles_films_films\` DROP FOREIGN KEY \`FK_d67ef45285714227b1573fb07c7\``);
        await queryRunner.query(`ALTER TABLE \`starships_pilots_people\` DROP FOREIGN KEY \`FK_eafaecce6c35a9d87395a160063\``);
        await queryRunner.query(`ALTER TABLE \`starships_pilots_people\` DROP FOREIGN KEY \`FK_7ff2ec92788af709393bc1de834\``);
        await queryRunner.query(`ALTER TABLE \`starships_films_films\` DROP FOREIGN KEY \`FK_df31d17a8f191cea4cffca5c802\``);
        await queryRunner.query(`ALTER TABLE \`starships_films_films\` DROP FOREIGN KEY \`FK_26c2061f1654e41ba2ff1dd6232\``);
        await queryRunner.query(`ALTER TABLE \`people\` DROP FOREIGN KEY \`FK_db5ab220b9854727011c353fa6c\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_c934ffc3dae5fc641daa172d6d0\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_b692250a7db06c988b774cfa3a0\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_1f3fc2aa86b6a332b59b37cc60c\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_5ab331642ec72ce8acd34ae5736\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_ee9a0635984f31deb3bab13ba08\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_a8b6140b7713dce74551c047b85\``);
        await queryRunner.query(`ALTER TABLE \`people\` DROP COLUMN \`homeworldUrl\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP COLUMN \`planetsName\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP COLUMN \`vehiclesName\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP COLUMN \`starshipsName\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP COLUMN \`speciesName\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP COLUMN \`filmsTitle\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP COLUMN \`peopleName\``);
        await queryRunner.query(`DROP INDEX \`IDX_13505ec9b2e630c92e57a4617a\` ON \`people_films_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_7eb6329de2622a74e568c2bc06\` ON \`people_films_films\``);
        await queryRunner.query(`DROP TABLE \`people_films_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_e2777dcdca9109495b5e8f9a65\` ON \`species_films_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_ec120188eaaa681ce81edca90a\` ON \`species_films_films\``);
        await queryRunner.query(`DROP TABLE \`species_films_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_763fe31c406dcfad488d4bb699\` ON \`species_people_people\``);
        await queryRunner.query(`DROP INDEX \`IDX_206acc3c1fd1eaf2f0f17fa8ff\` ON \`species_people_people\``);
        await queryRunner.query(`DROP TABLE \`species_people_people\``);
        await queryRunner.query(`DROP INDEX \`IDX_8c516d494922a900cc4768fb01\` ON \`planets_films_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_9ea134d2c1dde5d1bd67840c25\` ON \`planets_films_films\``);
        await queryRunner.query(`DROP TABLE \`planets_films_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_bf44d2f66adf5e7d78829c4513\` ON \`vehicles_pilots_people\``);
        await queryRunner.query(`DROP INDEX \`IDX_fbe7e9e45c30fd811cfc7a28e7\` ON \`vehicles_pilots_people\``);
        await queryRunner.query(`DROP TABLE \`vehicles_pilots_people\``);
        await queryRunner.query(`DROP INDEX \`IDX_dbb6d7f488e121e45469367796\` ON \`vehicles_films_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_d67ef45285714227b1573fb07c\` ON \`vehicles_films_films\``);
        await queryRunner.query(`DROP TABLE \`vehicles_films_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_eafaecce6c35a9d87395a16006\` ON \`starships_pilots_people\``);
        await queryRunner.query(`DROP INDEX \`IDX_7ff2ec92788af709393bc1de83\` ON \`starships_pilots_people\``);
        await queryRunner.query(`DROP TABLE \`starships_pilots_people\``);
        await queryRunner.query(`DROP INDEX \`IDX_df31d17a8f191cea4cffca5c80\` ON \`starships_films_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_26c2061f1654e41ba2ff1dd623\` ON \`starships_films_films\``);
        await queryRunner.query(`DROP TABLE \`starships_films_films\``);
    }

}
