import { MigrationInterface, QueryRunner } from "typeorm";

export class initiateDB1680678797579 implements MigrationInterface {
    name = 'initiateDB1680678797579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "meeting" ("id" SERIAL NOT NULL, "phone" character varying, "zoomUrl" character varying NOT NULL, CONSTRAINT "PK_dccaf9e4c0e39067d82ccc7bb83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "managerId" integer, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact_info" ("id" SERIAL NOT NULL, "phone" character varying, "email" character varying NOT NULL, "employeeId" integer, CONSTRAINT "REL_f188a018423a2cc75535509ff9" UNIQUE ("employeeId"), CONSTRAINT "PK_65b98fa4ffb26dceb9192f5d496" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee_meetings_meeting" ("employeeId" integer NOT NULL, "meetingId" integer NOT NULL, CONSTRAINT "PK_42c91b964b9c480aadec311fafb" PRIMARY KEY ("employeeId", "meetingId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0f0c3a58474a40670f633832aa" ON "employee_meetings_meeting" ("employeeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_10f26ded70438524748ef34cd1" ON "employee_meetings_meeting" ("meetingId") `);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_f4a920dfa304e096fad40e8c4a0" FOREIGN KEY ("managerId") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contact_info" ADD CONSTRAINT "FK_f188a018423a2cc75535509ff97" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_meetings_meeting" ADD CONSTRAINT "FK_0f0c3a58474a40670f633832aa8" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee_meetings_meeting" ADD CONSTRAINT "FK_10f26ded70438524748ef34cd10" FOREIGN KEY ("meetingId") REFERENCES "meeting"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_meetings_meeting" DROP CONSTRAINT "FK_10f26ded70438524748ef34cd10"`);
        await queryRunner.query(`ALTER TABLE "employee_meetings_meeting" DROP CONSTRAINT "FK_0f0c3a58474a40670f633832aa8"`);
        await queryRunner.query(`ALTER TABLE "contact_info" DROP CONSTRAINT "FK_f188a018423a2cc75535509ff97"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_f4a920dfa304e096fad40e8c4a0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_10f26ded70438524748ef34cd1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0f0c3a58474a40670f633832aa"`);
        await queryRunner.query(`DROP TABLE "employee_meetings_meeting"`);
        await queryRunner.query(`DROP TABLE "contact_info"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "meeting"`);
    }

}
