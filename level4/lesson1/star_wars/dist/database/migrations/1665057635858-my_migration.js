"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myMigration1665057635858 = void 0;
class myMigration1665057635858 {
    constructor() {
        this.name = 'myMigration1665057635858';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`people\` DROP COLUMN \`testprop\``);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`people\` ADD \`testprop\` varchar(255) NOT NULL DEFAULT 'true'`);
    }
}
exports.myMigration1665057635858 = myMigration1665057635858;
//# sourceMappingURL=1665057635858-my_migration.js.map