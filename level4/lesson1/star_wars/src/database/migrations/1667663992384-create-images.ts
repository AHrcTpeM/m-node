import { MigrationInterface, QueryRunner } from "typeorm";

export class createImages1667663992384 implements MigrationInterface {
    name = 'createImages1667663992384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`images\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_a4d7e908a3574e21ca5f06d0aa\` (\`url\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a4d7e908a3574e21ca5f06d0aa\` ON \`images\``);
        await queryRunner.query(`DROP TABLE \`images\``);
    }

}
