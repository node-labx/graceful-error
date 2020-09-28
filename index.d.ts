interface IOptions {
  message: string;
  code: string | number;
  msg: string;
  appId?: string;
  logIndex?: string;
  level?: string;
  errorType?: string;
  feature?: string;
}

interface IContext {
  [key: string]: any;
}
interface IGracefulErrorOptions extends IOptions {
  context: IContext;
}

interface IGracefulErrorToJSONResult extends IOptions {
  name: string;
  stack: string;
  context: IContext;
}

declare class GracefulError {
  constructor(options: IGracefulErrorOptions);

  toJSON(): IGracefulErrorToJSONResult;
}

export function createError(options: IOptions, context?: IContext): GracefulError;
export function wrapError(err: any, options?: IOptions, context?: IContext): GracefulError;
export enum ErrorLevelEnum {
  INFO,
  NOTICE,
  ALERT,
  WARN,
  ERROR,
  CRITICAL,
}
