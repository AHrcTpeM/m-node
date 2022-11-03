import { MigrationInterface, QueryRunner } from "typeorm";

export class createStarships1667471388824 implements MigrationInterface {
    name = 'createStarships1667471388824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`starships\` (\`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`starship_class\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL DEFAULT 'true', \`hyperdrive_rating\` varchar(255) NOT NULL DEFAULT 'true', \`MGLT\` varchar(255) NOT NULL DEFAULT 'true', \`cargo_capacity\` varchar(255) NOT NULL DEFAULT 'true', \`consumables\` varchar(255) NOT NULL DEFAULT 'true', \`url\` varchar(255) NOT NULL DEFAULT 'true', \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_9feba736ac458e843a5df80ff1\` (\`url\`), PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_9feba736ac458e843a5df80ff1\` ON \`starships\``);
        await queryRunner.query(`DROP TABLE \`starships\``);
    }

}
