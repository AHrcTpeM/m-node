"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myMigration1665062179871 = void 0;
class myMigration1665062179871 {
    constructor() {
        this.name = 'myMigration1665062179871';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`people\` DROP COLUMN \`testprop\``);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`people\` ADD \`testprop\` varchar(255) NOT NULL DEFAULT 'true'`);
    }
}
exports.myMigration1665062179871 = myMigration1665062179871;
//# sourceMappingURL=1665062179871-my_migration.js.map