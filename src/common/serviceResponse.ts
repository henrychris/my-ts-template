import { StatusCodes } from 'http-status-codes';

export class ServiceResponse<T = null> {
  readonly success: boolean;
  readonly message: string;
  readonly data: T;
  readonly statusCode: number;

  private constructor(
    success: boolean,
    message: string,
    responseObject: T,
    statusCode: number,
  ) {
    this.success = success;
    this.message = message;
    this.data = responseObject;
    this.statusCode = statusCode;
  }

  static success<T>(
    message: string = 'Success',
    responseObject: T,
    statusCode: number = StatusCodes.OK,
  ) {
    return new ServiceResponse(true, message, responseObject, statusCode);
  }

  static failure<T>(
    message: string,
    responseObject: T,
    statusCode: number = StatusCodes.BAD_REQUEST,
  ) {
    return new ServiceResponse(false, message, responseObject, statusCode);
  }

  static ok<T>(message = 'Success', responseObject: T) {
    return this.success(message, responseObject, StatusCodes.OK);
  }

  static badRequest(message = 'Something went wrong.') {
    return this.failure(message, null, StatusCodes.BAD_REQUEST);
  }

  static notFound(message = 'Resource not found') {
    return this.failure(message, null, StatusCodes.NOT_FOUND);
  }

  static validationError(
    message = 'There were one or more validation errors.',
    obj: object | null = null,
  ) {
    return this.failure(message, obj, StatusCodes.UNPROCESSABLE_ENTITY);
  }

  static serverError(
    message = 'Something went wrong. Please try again later.',
  ) {
    return this.failure(message, null, StatusCodes.INTERNAL_SERVER_ERROR);
  }

  static forbidden(message = 'Access denied.') {
    return this.failure(message, null, StatusCodes.FORBIDDEN);
  }

  toResponse() {
    return {
      success: this.success,
      message: this.message,
      data: this.data,
    };
  }
}
