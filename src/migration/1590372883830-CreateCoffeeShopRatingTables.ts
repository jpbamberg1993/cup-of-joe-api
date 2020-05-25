import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCoffeeShopRatingTables1590372883830 implements MigrationInterface {
    name = 'CreateCoffeeShopRatingTables1590372883830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shop" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "streetOne" character varying NOT NULL, "streetTwo" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "zip" character varying NOT NULL, "dateVisited" TIMESTAMP WITH TIME ZONE NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_f0640e30fef1d175426d80dbc13" UNIQUE ("name"), CONSTRAINT "PK_ad47b7c6121fe31cb4b05438e44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rating" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "rating" integer NOT NULL, "coffeeId" uuid, CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "coffee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "shopId" uuid, CONSTRAINT "PK_4d27239ee0b99a491ad806aec46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_265ad0d0e0e50fc273b4f690a7b" FOREIGN KEY ("coffeeId") REFERENCES "coffee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coffee" ADD CONSTRAINT "FK_1a7ba20c0b02fa329b300674ff1" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" DROP CONSTRAINT "FK_1a7ba20c0b02fa329b300674ff1"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_265ad0d0e0e50fc273b4f690a7b"`);
        await queryRunner.query(`DROP TABLE "coffee"`);
        await queryRunner.query(`DROP TABLE "rating"`);
        await queryRunner.query(`DROP TABLE "shop"`);
    }

}
