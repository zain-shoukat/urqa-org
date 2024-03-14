import { IBaseEntity  } from '../base.js';

export interface IOrganizationProducts extends IBaseEntity {
  
    productId: number;
    organizationId: number;
    isActive: boolean;
    updatedBy?: number;
    product: number;
    organization: number;
}


export interface ICreateOrganizationProducts extends IBaseEntity {
  
    productId: number;
    organizationId: number;
    isActive: boolean;
    updatedBy?: number;
    product: number;
    organization: number;

}

export async function OrganizationProductCreationMapper(
    orgProduct: IOrganizationProducts,
): Promise<IOrganizationProducts> {
    const createOrgProduct: IOrganizationProducts = {
       
        productId: orgProduct.productId,
        organizationId: orgProduct.organizationId,
        isActive: orgProduct.isActive,
        updatedBy: orgProduct.updatedBy,
        product: orgProduct.product,
        organization: orgProduct.organization
    };
    return createOrgProduct;
}