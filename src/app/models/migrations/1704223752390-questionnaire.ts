import { MigrationInterface, QueryRunner } from "typeorm"
import { database } from '../../../config/index.js';

export class Questionnaire1704223752390 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE ${database.schema}.questionnaire (
            id SERIAL PRIMARY KEY,
            question VARCHAR(255) NOT NULL,
            options VARCHAR(255) NOT NULL,
            level VARCHAR(50) NOT NULL,
            product_id INTEGER NOT NULL,
            updated_by INTEGER DEFAULT NULL,
           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
           deleted_at TIMESTAMP DEFAULT NULL
        );`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE questionnaire;`);
    }
}
