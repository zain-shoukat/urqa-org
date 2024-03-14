import { Entity, Column } from 'typeorm';
import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsInt,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { IOrganizations } from '../../utils/dto/index.js';
import { BaseEntity } from './base.js';

@Entity('organizations')
export class Organizations
  extends BaseEntity
  implements IOrganizations
{
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @Column({ length: 255, nullable: false })
  name!: string;

  @IsString({ message: 'URL must be a string' })
  @IsNotEmpty({ message: 'URL is required' })
  @Column({ length: 255, nullable: false })
  url!: string;

  @IsString({ message: 'WebSite URL must be a string' })
  @IsNotEmpty({ message: 'WebSite URL is required' })
  @Column({
    name: 'web_site_url',
    length: 255,
    nullable: false,
  })
  webSiteUrl!: string;

  @IsString({ message: 'Country must be a string' })
  @IsNotEmpty({ message: 'Country is required' })
  @Column({ length: 255, nullable: false })
  country!: string;

  @IsString({ message: 'Language must be a string' })
  @IsNotEmpty({ message: 'Language is required' })
  @Column({ length: 50, nullable: false })
  language!: string;

  @IsString({ message: 'Timezone must be a string' })
  @IsNotEmpty({ message: 'Timezone is required' })
  @Column({
    name: 'time_zone',
    length: 50,
    nullable: false,
  })
  timeZone!: string;

  @IsString({ message: 'Currency must be a string' })
  @IsNotEmpty({ message: 'Currency is required' })
  @Column({ length: 100, nullable: false })
  currency!: string;

  @IsBoolean({ message: 'isPublished must be a boolean' })
  @Column({
    name: 'is_published',
    type: 'boolean',
    default: false,
  })
  isPublished!: boolean;

  @IsString({ message: 'Image URL must be a string' })
  @IsNotEmpty({ message: 'Image URL is required' })
  @Column({
    name: 'image_url',
    length: 255,
    nullable: false,
  })
  imageUrl!: string;

  @IsString({ message: 'Short key must be a string' })
  @IsNotEmpty({ message: 'Short key is required' })
  @Column({
    name: 'short_key',
    length: 20,
    nullable: false,
  })
  shortKey!: string;

  @Column({ length: 255, nullable: false })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  email!: string;

  @IsBoolean({ message: 'isActive must be a boolean' })
  @Column({
    name: 'is_active',
    type: 'boolean',
    default: false,
  })
  isActive!: boolean;

  @IsInt({ message: 'updatedBy must be an integer' })
  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Column({
    name: 'updated_by',
    type: 'integer',
    nullable: true,
    default: null,
  })
  updatedBy?: number;
}
