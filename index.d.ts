interface IBaseOptions {
  message: string;
  appId: string;
  code: string;
  level: string;
  feature: string;
}

interface IGracefulErrorOptions extends IBaseOptions {
  context: object;
}

interface IGracefulErrorToJSONResult extends IBaseOptions {
  name: string;
  stack: string;
  context: object;
}

declare class GracefulError {
  constructor(options: IGracefulErrorOptions);

  toJSON(): IGracefulErrorToJSONResult;
}

export function createError(options: IBaseOptions, context: object): GracefulError;
export enum ErrorLevelEnum {
  INFO,
  WARN,
  ERROR,
  ALERT,
  CRITICAL,
}
