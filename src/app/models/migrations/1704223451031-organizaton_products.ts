import { MigrationInterface, QueryRunner } from "typeorm"
import { database } from '../../../config/index.js';

export class OrganizatonProducts1704223451031 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE ${database.schema}.organization_products (
            id SERIAL PRIMARY KEY,
            product_id INTEGER NOT NULL,
            organization_id INTEGER NOT NULL,
            is_active BOOLEAN NOT NULL,
           updated_by INTEGER DEFAULT NULL,
           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
           deleted_at TIMESTAMP DEFAULT NULL
        );`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE organizaton_products;`);
    }

}