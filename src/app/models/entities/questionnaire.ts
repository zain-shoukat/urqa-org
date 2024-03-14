import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
import { IsString, IsNotEmpty, IsBoolean, IsInt, IsOptional, isString,IsNumber } from 'class-validator';
import { Products } from './products.js'; // Import the Product entity if not already done
import { BaseEntity } from './base.js';
import { IQuestionnaire } from '../../utils/dto/index.js';

  @Entity('questionnaire')
  export class Questionnaire extends BaseEntity implements IQuestionnaire {
  
  
    @IsString({message: 'Name must be a String'})
    @IsNotEmpty({message: 'Name is required'})
    @Column({ length: 255, nullable: false })
    question!: string;
  
    @IsString({message: 'options must be a String'})
    @IsNotEmpty({message: 'options is required'})
    @Column({ length: 255, nullable: false })
    options!: string;
  
    
    @IsString({message: 'level must be a String'})
    @IsNotEmpty({message: 'level is required'})
    @Column({ length: 50, nullable: false })
    level!: string;
  
    @Column({ name: 'product_id', type: 'integer', nullable: false })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @IsNotEmpty()
    productId!: number;
  
    @Column({ name: 'updated_by', type: 'integer', nullable: true, default: null })
    @IsNumber({ allowNaN: false, allowInfinity: false })    
    @IsOptional()
    updatedBy?: number;
  
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @IsNotEmpty()
    @ManyToOne(() => Products, (product) => product.id)
    @JoinColumn({ name: 'product_id' })
    product!: number;
  }
  