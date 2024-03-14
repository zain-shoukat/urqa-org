import {
    Entity,
    Column,  
  } from 'typeorm';
  
import { IProduct } from '../../utils/dto/index.js';
import { BaseEntity } from './base.js';
import { IsString, IsNotEmpty, IsBoolean, IsInt, IsOptional, IsNumber, isNotEmpty } from 'class-validator';

  @Entity('products')
  export class Products extends BaseEntity implements IProduct{
   
    @IsString({ message: 'Name must be a string' })
    @IsOptional()
    @Column({ length: 255, nullable: true })
    name?: string;

    @IsString({ message: 'Code must be a string' })
    @IsNotEmpty({ message: 'Code is required' })
    @Column({ length: 50, nullable: false })
    code!: string;

    @IsBoolean({ message: 'isActive must be a boolean' })
    @Column({ name: 'is_active', type: 'boolean', default: false })
    isActive!: boolean;

    @IsInt({ message: 'updatedBy must be an integer' })
    @IsOptional()
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @Column({ name: 'updated_by', type: 'integer', nullable: true, default: null })
    updatedBy?: number;
  

  }
  