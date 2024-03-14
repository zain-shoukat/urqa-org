import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
import { IOrganizationAnswers } from '../../utils/dto/index.js';
import { BaseEntity } from './base.js';
import { Organizations } from './organizations.js'; // Import the Organization entity if not already done
import { Questionnaire } from './questionnaire.js'; // Import the Questionnaire entity if not already done
import { IsString, IsNotEmpty, IsBoolean, IsInt, IsOptional,IsNumber } from 'class-validator';

  @Entity('organization_answers')
  export class OrganizationAnswers extends BaseEntity implements IOrganizationAnswers{
  
  
    @IsInt({ message: 'questionnaireId must be an integer' })
    @IsNotEmpty()
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @Column({ name: 'questionnaire_id', type: 'integer', nullable: false })
    questionnaireId!: number;
  
    @IsString({ message: 'option must be a string' })
    @IsNotEmpty({ message: 'option is required' })
    @Column({ length: 50, nullable: false })
    @Column({ length: 500, nullable: false })
    option!: string;
  
    @IsInt({ message: 'organizationId must be an integer' })
    @IsNotEmpty()
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @Column({ name: 'organization_id', type: 'integer', nullable: false })
    organizationId!: number;

  

    @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.id)
    @JoinColumn({ name: 'questionnaire_id' })
    questionnaire!: number;
  
    @ManyToOne(() => Organizations, (organization) => organization.id)
    @JoinColumn({ name: 'organization_id' })
    organization!: number;
  }
  