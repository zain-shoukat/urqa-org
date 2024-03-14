import { MigrationInterface, QueryRunner } from "typeorm"
import { database } from '../../../config/index.js';

export class Products1704223535436 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE ${database.schema}.products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NULL,
            code VARCHAR(50) NOT NULL,
            is_active BOOLEAN NOT NULL,
           updated_by INTEGER DEFAULT NULL,
           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
           deleted_at TIMESTAMP DEFAULT NULL
        );`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE products;`);
    }

}
