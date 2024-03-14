import { StatusCodes } from 'http-status-codes';

const CRITERIA_NOT_FOUNT = Object.freeze({
  message: 'criteria  not define',
  code: StatusCodes.BAD_REQUEST,
});

export { CRITERIA_NOT_FOUNT };
