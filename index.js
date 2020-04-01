class GracefulError extends Error {
  constructor({ message, appId, code, level, context }) {
    super(message);
    this.name = 'GracefulError';
    this.appId = appId;
    this.code = code;
    this.level = level;
    this.context = context;
  }

  toJSON() {
    return {
      // Standard
      name: this.name,
      message: this.message,
      stack: this.stack,

      // custom
      appId: this.appId,
      code: this.code,
      level: this.level,
      context: this.context,
    };
  }
}

const ErrorLevelEnum = {
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
};

function createError({ message, appId, code, level }, context) {
  let err = new GracefulError({ message, appId, code, level, context });
  return err;
}

module.exports = {
  createError,
  ErrorLevelEnum,
};
