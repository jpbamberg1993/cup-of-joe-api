import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCoffeeAndRatingColumns1595119867832 implements MigrationInterface {
    name = 'AddCoffeeAndRatingColumns1595119867832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rating" ADD "review" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coffee" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coffee" ADD "origin" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coffee" ADD "type" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "origin"`);
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "review"`);
    }

}
