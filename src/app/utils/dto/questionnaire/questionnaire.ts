import { IBaseEntity  } from '../base.js';

export interface IQuestionnaire extends IBaseEntity {
 
    question: string;
    options: string;
    level: string;
    productId: number;
    updatedBy?: number;
    product: number;
}

export interface ICreateQuestionnaires extends IBaseEntity {
    question: string;
    options: string;
    level: string;
    productId: number;
    updatedBy?: number;
    product: number;
}

export async function QuestionnaireCreationMapper(
    questionnaire: ICreateQuestionnaires,
): Promise<ICreateQuestionnaires> {
    const createQuestionnaire: ICreateQuestionnaires = {
    
        question: questionnaire.question,
        options: questionnaire.options,
        level: questionnaire.level,
        productId: questionnaire.productId,
        updatedBy: questionnaire.updatedBy,
        product: questionnaire.product
    };
    return createQuestionnaire;
}