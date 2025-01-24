import { ServiceResponse } from '../../common/serviceResponse';
import { asyncHandler } from '../../common/util/asyncHandler';
import { handleServiceResponse } from '../../common/util/httpHandler';
import { Request, Response } from 'express';

export const test = asyncHandler(async function (_req: Request, res: Response) {
  const resp = ServiceResponse.ok('test success', null);
  return handleServiceResponse(resp, res);
});
