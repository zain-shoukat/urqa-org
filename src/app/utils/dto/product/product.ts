import { IBaseEntity  } from '../base.js';

export interface IProduct extends IBaseEntity {
    name?: string;
    code: string;
    isActive: boolean;
    updatedBy?: number;
  
}


export interface ICreateProducts extends IBaseEntity {
    name?: string;
    code: string;
    isActive: boolean;
    updatedBy?: number;
}

export async function productCreationMapper(
    product: ICreateProducts,
): Promise<ICreateProducts> {
    const createProduct: ICreateProducts = {
        name: product.name,
        code: product.code,
        isActive: product.isActive,
        updatedBy:product.updatedBy 
    
    };
    return createProduct;
}