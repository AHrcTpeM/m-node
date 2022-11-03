import { MigrationInterface, QueryRunner } from "typeorm";

export class createImages1667471845012 implements MigrationInterface {
    name = 'createImages1667471845012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`images\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`peopleName\` varchar(255) NULL, \`filmsTitle\` varchar(255) NULL, \`speciesName\` varchar(255) NULL, \`starshipsName\` varchar(255) NULL, \`vehiclesName\` varchar(255) NULL, \`planetsName\` varchar(255) NULL, UNIQUE INDEX \`IDX_a4d7e908a3574e21ca5f06d0aa\` (\`url\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_a8b6140b7713dce74551c047b85\` FOREIGN KEY (\`peopleName\`) REFERENCES \`people\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_ee9a0635984f31deb3bab13ba08\` FOREIGN KEY (\`filmsTitle\`) REFERENCES \`films\`(\`title\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_5ab331642ec72ce8acd34ae5736\` FOREIGN KEY (\`speciesName\`) REFERENCES \`species\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_1f3fc2aa86b6a332b59b37cc60c\` FOREIGN KEY (\`starshipsName\`) REFERENCES \`starships\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_b692250a7db06c988b774cfa3a0\` FOREIGN KEY (\`vehiclesName\`) REFERENCES \`vehicles\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_c934ffc3dae5fc641daa172d6d0\` FOREIGN KEY (\`planetsName\`) REFERENCES \`planets\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_c934ffc3dae5fc641daa172d6d0\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_b692250a7db06c988b774cfa3a0\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_1f3fc2aa86b6a332b59b37cc60c\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_5ab331642ec72ce8acd34ae5736\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_ee9a0635984f31deb3bab13ba08\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_a8b6140b7713dce74551c047b85\``);
        await queryRunner.query(`DROP INDEX \`IDX_a4d7e908a3574e21ca5f06d0aa\` ON \`images\``);
        await queryRunner.query(`DROP TABLE \`images\``);
    }

}
