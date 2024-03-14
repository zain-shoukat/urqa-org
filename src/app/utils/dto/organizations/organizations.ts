import { IBaseEntity } from '../base.js';

export interface IOrganizations extends IBaseEntity {
  name: string;
  url: string;
  webSiteUrl: string;
  country: string;
  language: string;
  timeZone: string;
  currency: string;
  isPublished: boolean;
  imageUrl: string;
  shortKey: string;
  email: string;
  isActive: boolean;
  updatedBy?: number;
}

export interface ICreateOrganizations extends IBaseEntity {
  name: string;
  url: string;
  webSiteUrl: string;
  country: string;
  language: string;
  timeZone: string;
  currency: string;
  isPublished: boolean;
  imageUrl: string;
  shortKey: string;
  email: string;
  isActive: boolean;
  updatedBy?: number;
}

export interface IFindOrgByUserId {
  email: string;
}

export async function organizationCreationMapper(
  org: ICreateOrganizations,
): Promise<ICreateOrganizations> {
  const createOrg: ICreateOrganizations = {
    name: org.name,
    url: org.url,
    webSiteUrl: org.webSiteUrl,
    country: org.country,
    language: org.language,
    timeZone: org.timeZone,
    currency: org.currency,
    isPublished: org.isPublished || false,
    imageUrl: org.imageUrl,
    shortKey: org.shortKey,
    email: org.email,
    isActive: org.isActive || true,
  };
  return createOrg;
}
