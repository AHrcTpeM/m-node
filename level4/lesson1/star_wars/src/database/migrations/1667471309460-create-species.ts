import { MigrationInterface, QueryRunner } from "typeorm";

export class createSpecies1667471309460 implements MigrationInterface {
    name = 'createSpecies1667471309460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`species\` (\`name\` varchar(255) NOT NULL, \`classification\` varchar(255) NOT NULL, \`designation\` varchar(255) NOT NULL, \`average_height\` varchar(255) NOT NULL, \`average_lifespan\` varchar(255) NOT NULL, \`eye_color\` varchar(255) NOT NULL DEFAULT 'n/a', \`hair_colors\` varchar(255) NOT NULL, \`skin_colors\` varchar(255) NOT NULL, \`language\` varchar(255) NOT NULL DEFAULT 'true', \`homeworld\` varchar(255) NULL DEFAULT 'true', \`url\` varchar(255) NOT NULL DEFAULT 'true', \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_86eba64ed08b3673df47cca655\` (\`url\`), PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_86eba64ed08b3673df47cca655\` ON \`species\``);
        await queryRunner.query(`DROP TABLE \`species\``);
    }

}
