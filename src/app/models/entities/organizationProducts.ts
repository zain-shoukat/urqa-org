import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Products } from './products.js'; // Import the Product entity if not already done
import { Organizations } from './organizations.js'; // Import the Organization entity if not already done
import { BaseEntity } from './base.js';
import { IOrganizationProducts } from '../../utils/dto/index.js';
import { IsString, IsNotEmpty, IsBoolean, IsInt, IsOptional, IsNumber } from 'class-validator';


@Entity('organization_products')
export class OrganizationProducts extends BaseEntity implements IOrganizationProducts {

  @IsInt({ message: 'productId must be an integer' })
  @IsNotEmpty()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Column({ name: 'product_id', type: 'integer', nullable: false })
  productId!: number;

  @IsInt({ message: 'organizationId must be an integer' })
  @IsNotEmpty()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Column({ name: 'organization_id', type: 'integer', nullable: false })
  organizationId!: number;

  @IsBoolean({ message: 'isActive must be a boolean' })
  @Column({ name: 'is_active', type: 'boolean', default: false })
  isActive!: boolean;


  @IsInt({ message: 'updatedBy must be an integer' })
  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Column({ name: 'updated_by', type: 'integer', nullable: true, default: null })
  updatedBy?: number;


  @IsInt({ message: 'product must be an integer' })
  @IsNotEmpty()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @ManyToOne(() => Products, (product) => product.id)
  @JoinColumn({ name: 'product_id' })
  product!: number;


  @IsInt({ message: 'organization must be an integer' })
  @IsNotEmpty()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @ManyToOne(() => Organizations, (organization) => organization.id)
  @JoinColumn({ name: 'organization_id' })
  organization!: number;
}
