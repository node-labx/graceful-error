const test = require('ava');
const { createError, ErrorLevelEnum } = require('../index');

test('ErrorLevelEnum', (t) => {
  t.deepEqual(ErrorLevelEnum, {
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error',
    ALERT: 'alert',
    CRITICAL: 'critical',
  });
});

test('createError', (t) => {
  const err = createError(
    {
      message: 'this is a message.',
      appId: 'test',
      code: 'ERR_HTTP_INVALID_HEADER_VALUE',
      level: ErrorLevelEnum.ERROR,
    },
    {
      foo: 'bar',
    }
  );
  t.is(err.name, 'GracefulError');
  t.is(err.message, 'this is a message.');
  t.is(err.appId, 'test');
  t.is(err.code, 'ERR_HTTP_INVALID_HEADER_VALUE');
  t.is(err.level, 'error');
  t.deepEqual(err.context, {
    foo: 'bar',
  });
});

test('createError#toJSON', (t) => {
  const err = createError(
    {
      message: 'this is a message.',
      appId: 'test',
      code: 'ERR_HTTP_INVALID_HEADER_VALUE',
      level: ErrorLevelEnum.ERROR,
    },
    {
      foo: 'bar',
    }
  ).toJSON();
  t.is(err.message, 'this is a message.');
  t.is(err.appId, 'test');
  t.is(err.code, 'ERR_HTTP_INVALID_HEADER_VALUE');
  t.is(err.level, 'error');
});
