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

  toResponse() {
    return {
      success: this.success,
      message: this.message,
      data: this.data,
    };
  }
}
