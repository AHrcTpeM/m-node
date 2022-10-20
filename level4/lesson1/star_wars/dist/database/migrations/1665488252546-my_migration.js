"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myMigration1665488252546 = void 0;
class myMigration1665488252546 {
    constructor() {
        this.name = 'myMigration1665488252546';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`people\` (\`name\` varchar(255) NOT NULL, \`height\` varchar(255) NOT NULL, \`mass\` varchar(255) NOT NULL, \`hair_color\` varchar(255) NOT NULL, \`skin_color\` varchar(255) NOT NULL, \`eye_color\` varchar(255) NOT NULL, \`birth_year\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`homeworld\` varchar(255) NOT NULL DEFAULT 'true', \`species\` text NOT NULL, \`vehicles\` text NOT NULL, \`starships\` text NOT NULL, \`created\` varchar(255) NOT NULL DEFAULT 'true', \`edited\` varchar(255) NOT NULL DEFAULT 'true', \`url\` varchar(255) NOT NULL DEFAULT 'true', \`image\` text NOT NULL, UNIQUE INDEX \`IDX_f3d026dcae4b855e5ac3dc7834\` (\`url\`), PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films\` (\`title\` varchar(255) NOT NULL, \`episode_id\` int NOT NULL, \`opening_crawl\` text NOT NULL, \`director\` varchar(255) NOT NULL, \`producer\` varchar(255) NOT NULL, \`release_date\` datetime NOT NULL, \`species\` text NOT NULL, \`starships\` text NOT NULL, \`vehicles\` text NOT NULL, \`planets\` text NOT NULL, \`url\` varchar(255) NOT NULL DEFAULT 'true', \`created\` varchar(255) NOT NULL DEFAULT 'true', \`edited\` varchar(255) NOT NULL DEFAULT 'true', UNIQUE INDEX \`IDX_6c40323ce20cc863369cc33ee8\` (\`url\`), PRIMARY KEY (\`title\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`planets\` (\`name\` varchar(255) NOT NULL, \`diameter\` varchar(255) NOT NULL, \`rotation_period\` varchar(255) NOT NULL, \`orbital_period\` varchar(255) NOT NULL, \`gravity\` varchar(255) NOT NULL, \`population\` varchar(255) NOT NULL, \`climate\` varchar(255) NOT NULL, \`terrain\` varchar(255) NOT NULL, \`surface_water\` varchar(255) NOT NULL DEFAULT 'true', \`films\` text NOT NULL, \`residents\` text NOT NULL, \`created\` varchar(255) NOT NULL DEFAULT 'true', \`edited\` varchar(255) NOT NULL DEFAULT 'true', \`url\` varchar(255) NOT NULL DEFAULT 'true', PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`species\` (\`name\` varchar(255) NOT NULL, \`classification\` varchar(255) NOT NULL, \`designation\` varchar(255) NOT NULL, \`average_height\` varchar(255) NOT NULL, \`average_lifespan\` varchar(255) NOT NULL, \`eye_color\` varchar(255) NOT NULL DEFAULT 'n/a', \`hair_colors\` varchar(255) NOT NULL, \`skin_colors\` varchar(255) NOT NULL, \`language\` varchar(255) NOT NULL DEFAULT 'true', \`homeworld\` varchar(255) NULL DEFAULT 'true', \`people\` text NOT NULL, \`films\` text NOT NULL, \`created\` varchar(255) NOT NULL DEFAULT 'true', \`edited\` varchar(255) NOT NULL DEFAULT 'true', \`url\` varchar(255) NOT NULL DEFAULT 'true', PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`starships\` (\`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`starship_class\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL DEFAULT 'true', \`hyperdrive_rating\` varchar(255) NOT NULL DEFAULT 'true', \`MGLT\` varchar(255) NOT NULL DEFAULT 'true', \`cargo_capacity\` varchar(255) NOT NULL DEFAULT 'true', \`consumables\` varchar(255) NOT NULL DEFAULT 'true', \`films\` text NOT NULL, \`pilots\` text NOT NULL, \`created\` varchar(255) NOT NULL DEFAULT 'true', \`edited\` varchar(255) NOT NULL DEFAULT 'true', \`url\` varchar(255) NOT NULL DEFAULT 'true', PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehicles\` (\`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`vehicle_class\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL DEFAULT 'true', \`cargo_capacity\` varchar(255) NOT NULL DEFAULT 'true', \`consumables\` varchar(255) NOT NULL DEFAULT 'true', \`films\` text NOT NULL, \`pilots\` text NOT NULL, \`created\` varchar(255) NOT NULL DEFAULT 'true', \`edited\` varchar(255) NOT NULL DEFAULT 'true', \`url\` varchar(255) NOT NULL DEFAULT 'true', PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_films_films\` (\`peopleUrl\` varchar(255) NOT NULL, \`filmsUrl\` varchar(255) NOT NULL, INDEX \`IDX_7eb6329de2622a74e568c2bc06\` (\`peopleUrl\`), INDEX \`IDX_13505ec9b2e630c92e57a4617a\` (\`filmsUrl\`), PRIMARY KEY (\`peopleUrl\`, \`filmsUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`people_films_films\` ADD CONSTRAINT \`FK_7eb6329de2622a74e568c2bc061\` FOREIGN KEY (\`peopleUrl\`) REFERENCES \`people\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_films_films\` ADD CONSTRAINT \`FK_13505ec9b2e630c92e57a4617a8\` FOREIGN KEY (\`filmsUrl\`) REFERENCES \`films\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`people_films_films\` DROP FOREIGN KEY \`FK_13505ec9b2e630c92e57a4617a8\``);
        await queryRunner.query(`ALTER TABLE \`people_films_films\` DROP FOREIGN KEY \`FK_7eb6329de2622a74e568c2bc061\``);
        await queryRunner.query(`DROP INDEX \`IDX_13505ec9b2e630c92e57a4617a\` ON \`people_films_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_7eb6329de2622a74e568c2bc06\` ON \`people_films_films\``);
        await queryRunner.query(`DROP TABLE \`people_films_films\``);
        await queryRunner.query(`DROP TABLE \`vehicles\``);
        await queryRunner.query(`DROP TABLE \`starships\``);
        await queryRunner.query(`DROP TABLE \`species\``);
        await queryRunner.query(`DROP TABLE \`planets\``);
        await queryRunner.query(`DROP INDEX \`IDX_6c40323ce20cc863369cc33ee8\` ON \`films\``);
        await queryRunner.query(`DROP TABLE \`films\``);
        await queryRunner.query(`DROP INDEX \`IDX_f3d026dcae4b855e5ac3dc7834\` ON \`people\``);
        await queryRunner.query(`DROP TABLE \`people\``);
    }
}
exports.myMigration1665488252546 = myMigration1665488252546;
//# sourceMappingURL=1665488252546-my_migration.js.map