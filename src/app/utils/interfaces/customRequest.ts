import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';
import { Language } from '../constants.js';

interface ICustomHeaders {
  language: Language;
  authorization?: string;
  appversion?: string;
}

interface ICustomRequest extends Request {
  headers: IncomingHttpHeaders & ICustomHeaders;
}

export { ICustomRequest, ICustomHeaders };
