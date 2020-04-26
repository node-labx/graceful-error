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
  NOTICE: 'notice',
  ALERT: 'alert',
  WARN: 'warn',
  ERROR: 'error',
  CRITICAL: 'critical',
};

function createError({ message, appId, logIndex, code, level, feature }, context = {}) {
  let err = new GracefulError({ message, appId, logIndex, code, level, feature, context });
  return err;
}

function wrapError(err, options = {}, context = {}) {
  if (err.name === 'GracefulError') {
    return err;
  }
  let error = new GracefulError({
    message: (options && options.message) || err.message,
    appId: (options && options.appId) || err.appId,
    logIndex: (options && options.logIndex) || err.logIndex,
    code: (options && options.code) || err.code,
    level: (options && options.level) || err.level,
    feature: (options && options.feature) || err.feature,
    context,
  });
  error.stack = err.stack;
  return error;
}

module.exports = {
  createError,
  wrapError,
  ErrorLevelEnum: Object.freeze(ErrorLevelEnum),
};
