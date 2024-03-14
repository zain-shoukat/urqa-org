import { IBaseEntity  } from '../base.js';

export interface IOrganizationAnswers extends IBaseEntity {

    questionnaireId: number;
    option: string;
    organizationId: number;
    questionnaire: number;
    organization: number;

}

export interface ICreateOrganizationAnswers extends IBaseEntity {

    questionnaireId: number;
    option: string;
    organizationId: number;
    questionnaire: number;
    organization: number;

}

export async function OrganizationAnswerCreationMapper(
    orgAnswer: ICreateOrganizationAnswers,
): Promise<ICreateOrganizationAnswers> {
    const createOrgAnswer: ICreateOrganizationAnswers = {
       
        questionnaireId: orgAnswer.questionnaireId,
        option: orgAnswer.option,
        organizationId: orgAnswer.organizationId,
        questionnaire: orgAnswer.questionnaire,
        organization: orgAnswer.organization
    };
    return createOrgAnswer;
}