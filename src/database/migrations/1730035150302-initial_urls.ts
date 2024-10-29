import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialUrls1730035150302 implements MigrationInterface {
    name = 'InitialUrls1730035150302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "urls" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "shortUrlId" character varying NOT NULL, "originalUrl" character varying NOT NULL, "expiredAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_6a8f56eda62d140277c82c1bdf2" PRIMARY KEY ("shortUrlId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "urls"`);
    }

}
