import { MigrationInterface, QueryRunner } from "typeorm";

export class createFilms1667663510360 implements MigrationInterface {
    name = 'createFilms1667663510360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`films\` (\`title\` varchar(255) NOT NULL, \`episode_id\` int NOT NULL, \`opening_crawl\` text NOT NULL, \`director\` varchar(255) NOT NULL, \`producer\` varchar(255) NOT NULL, \`release_date\` datetime NOT NULL, \`url\` varchar(255) NOT NULL DEFAULT 'true', \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_6c40323ce20cc863369cc33ee8\` (\`url\`), PRIMARY KEY (\`title\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_6c40323ce20cc863369cc33ee8\` ON \`films\``);
        await queryRunner.query(`DROP TABLE \`films\``);
    }

}
