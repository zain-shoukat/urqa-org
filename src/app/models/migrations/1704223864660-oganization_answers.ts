import { MigrationInterface, QueryRunner } from "typeorm"
import { database } from '../../../config/index.js';

export class OganizationAnswers1704223864660 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE ${database.schema}.oganization_answers (
            id SERIAL PRIMARY KEY,
            questionnaire_id INTEGER NOT NULL,
            option VARCHAR(500) NOT NULL,
            organization_id INTEGER NOT NULL,
           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
           deleted_at TIMESTAMP DEFAULT NULL
        );`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP TABLE oganization_answers;`);

    }

}
