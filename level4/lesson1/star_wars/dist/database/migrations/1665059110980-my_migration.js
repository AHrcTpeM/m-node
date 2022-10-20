"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myMigration1665059110980 = void 0;
class myMigration1665059110980 {
    constructor() {
        this.name = 'myMigration1665059110980';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`people\` (\`name\` varchar(255) NOT NULL, \`height\` varchar(255) NOT NULL, \`mass\` varchar(255) NOT NULL, \`hair_color\` varchar(255) NOT NULL, \`skin_color\` varchar(255) NOT NULL, \`eye_color\` varchar(255) NOT NULL, \`birth_year\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`homeworld\` varchar(255) NOT NULL DEFAULT 'true', \`films\` varchar(255) NOT NULL DEFAULT 'true', \`species\` varchar(255) NOT NULL DEFAULT 'true', \`vehicles\` varchar(255) NOT NULL DEFAULT 'true', \`starships\` varchar(255) NOT NULL DEFAULT 'true', \`created\` varchar(255) NOT NULL DEFAULT 'true', \`edited\` varchar(255) NOT NULL DEFAULT 'true', \`url\` varchar(255) NOT NULL DEFAULT 'true', PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`people\``);
    }
}
exports.myMigration1665059110980 = myMigration1665059110980;
//# sourceMappingURL=1665059110980-my_migration.js.map