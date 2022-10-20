import { MigrationInterface, QueryRunner } from "typeorm";
export declare class myMigration1665323302271 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
