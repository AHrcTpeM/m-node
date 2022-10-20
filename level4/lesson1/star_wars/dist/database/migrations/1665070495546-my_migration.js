"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myMigration1665070495546 = void 0;
class myMigration1665070495546 {
    constructor() {
        this.name = 'myMigration1665070495546';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`people\` DROP COLUMN \`films\``);
        await queryRunner.query(`ALTER TABLE \`people\` ADD \`films\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`people\` DROP COLUMN \`species\``);
        await queryRunner.query(`ALTER TABLE \`people\` ADD \`species\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`people\` DROP COLUMN \`vehicles\``);
        await queryRunner.query(`ALTER TABLE \`people\` ADD \`vehicles\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`people\` DROP COLUMN \`starships\``);
        await queryRunner.query(`ALTER TABLE \`people\` ADD \`starships\` text NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`people\` DROP COLUMN \`starships\``);
        await queryRunner.query(`ALTER TABLE \`people\` ADD \`starships\` varchar(255) NOT NULL DEFAULT 'true'`);
        await queryRunner.query(`ALTER TABLE \`people\` DROP COLUMN \`vehicles\``);
        await queryRunner.query(`ALTER TABLE \`people\` ADD \`vehicles\` varchar(255) NOT NULL DEFAULT 'true'`);
        await queryRunner.query(`ALTER TABLE \`people\` DROP COLUMN \`species\``);
        await queryRunner.query(`ALTER TABLE \`people\` ADD \`species\` varchar(255) NOT NULL DEFAULT 'true'`);
        await queryRunner.query(`ALTER TABLE \`people\` DROP COLUMN \`films\``);
        await queryRunner.query(`ALTER TABLE \`people\` ADD \`films\` varchar(255) NOT NULL DEFAULT 'true'`);
    }
}
exports.myMigration1665070495546 = myMigration1665070495546;
//# sourceMappingURL=1665070495546-my_migration.js.map