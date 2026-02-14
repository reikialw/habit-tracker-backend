import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHabitRelation1771071133298 implements MigrationInterface {
    name = 'AddHabitRelation1771071133298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "habit" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "active" boolean NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_habit" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "active" boolean NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" varchar, CONSTRAINT "FK_999000e9ce7a69128f471f0a3f9" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_habit"("id", "title", "active", "createdAt", "userId") SELECT "id", "title", "active", "createdAt", "userId" FROM "habit"`);
        await queryRunner.query(`DROP TABLE "habit"`);
        await queryRunner.query(`ALTER TABLE "temporary_habit" RENAME TO "habit"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "habit" RENAME TO "temporary_habit"`);
        await queryRunner.query(`CREATE TABLE "habit" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "active" boolean NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" varchar)`);
        await queryRunner.query(`INSERT INTO "habit"("id", "title", "active", "createdAt", "userId") SELECT "id", "title", "active", "createdAt", "userId" FROM "temporary_habit"`);
        await queryRunner.query(`DROP TABLE "temporary_habit"`);
        await queryRunner.query(`DROP TABLE "habit"`);
    }

}
