import { MigrationInterface, QueryRunner } from "typeorm";

export class createVehicles1667663752421 implements MigrationInterface {
    name = 'createVehicles1667663752421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`vehicles\` (\`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`vehicle_class\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL DEFAULT 'true', \`cargo_capacity\` varchar(255) NOT NULL DEFAULT 'true', \`consumables\` varchar(255) NOT NULL DEFAULT 'true', \`url\` varchar(255) NOT NULL DEFAULT 'true', \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_5355e93a3aeb7ca9456a5a9dc3\` (\`url\`), PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_5355e93a3aeb7ca9456a5a9dc3\` ON \`vehicles\``);
        await queryRunner.query(`DROP TABLE \`vehicles\``);
    }

}
