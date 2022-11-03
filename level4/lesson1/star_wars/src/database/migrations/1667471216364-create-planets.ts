import { MigrationInterface, QueryRunner } from "typeorm";

export class createPlanets1667471216364 implements MigrationInterface {
    name = 'createPlanets1667471216364'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`planets\` (\`name\` varchar(255) NOT NULL, \`diameter\` varchar(255) NOT NULL, \`rotation_period\` varchar(255) NOT NULL, \`orbital_period\` varchar(255) NOT NULL, \`gravity\` varchar(255) NOT NULL, \`population\` varchar(255) NOT NULL, \`climate\` varchar(255) NOT NULL, \`terrain\` varchar(255) NOT NULL, \`surface_water\` varchar(255) NOT NULL DEFAULT 'true', \`url\` varchar(255) NOT NULL DEFAULT 'true', \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_de8e5a046e3a80e5ac3d776e83\` (\`url\`), PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_de8e5a046e3a80e5ac3d776e83\` ON \`planets\``);
        await queryRunner.query(`DROP TABLE \`planets\``);
    }

}
