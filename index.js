class GracefulError extends Error {
  constructor({ message, appId, logIndex, code, level, feature, context }) {
    super(message);
    this.name = 'GracefulError';
    this.appId = appId;
    this.logIndex = logIndex;
    this.code = code;
    this.level = level;
    this.feature = feature;
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
      logIndex: this.logIndex,
      code: this.code,
      level: this.level,
      feature: this.feature,
      context: this.context,
    };
  }
}

const ErrorLevelEnum = {
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  ALERT: 'alert',
  CRITICAL: 'critical',
};

function createError({ message, appId, logIndex, code, level, feature }, context) {
  let err = new GracefulError({ message, appId, logIndex, code, level, feature, context });
  return err;
}

module.exports = {
  createError,
  ErrorLevelEnum: Object.freeze(ErrorLevelEnum),
};
