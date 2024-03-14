import { MigrationInterface, QueryRunner } from "typeorm"
import { database } from '../../../config/index.js';

export class Organizations1704223375134 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE ${database.schema}.organizations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            url VARCHAR(255) NOT NULL,
            web_site_url VARCHAR(255) NOT NULL,
            country VARCHAR(255) NOT NULL,
            language VARCHAR(50) NOT NULL,
            time_zone VARCHAR(50) NOT NULL,
            currency VARCHAR(100) NOT NULL,
            is_published BOOLEAN NOT NULL,
            image_url VARCHAR(255) NOT NULL,
            short_key VARCHAR(20) NOT NULL,
            email VARCHAR(255) NOT NULL,
            is_active BOOLEAN NOT NULL,
           updated_by INTEGER DEFAULT NULL,
           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
           deleted_at TIMESTAMP DEFAULT NULL
        );`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE organizations;`);
    }

}