import type { Response } from 'express';
import { ServiceResponse as ServiceResponse } from '../serviceResponse';

export const handleServiceResponse = (
  serviceResponse: ServiceResponse<any>,
  response: Response,
) => {
  response
    .status(serviceResponse.statusCode)
    .send(serviceResponse.toResponse());
};
