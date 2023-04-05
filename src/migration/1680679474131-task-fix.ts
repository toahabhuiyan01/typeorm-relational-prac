import { MigrationInterface, QueryRunner } from "typeorm";

export class taskFix1680679474131 implements MigrationInterface {
    name = 'taskFix1680679474131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "employeeId" integer`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_07278e1532a8daa462123fb7bc1" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_07278e1532a8daa462123fb7bc1"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "employeeId"`);
    }

}
