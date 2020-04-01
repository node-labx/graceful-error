const test = require('ava');
const { createError, ErrorLevelEnum } = require('../index');

test('ErrorLevelEnum', t => {
  t.deepEqual(ErrorLevelEnum, {
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error',
  });
});

test('createError', t => {
  const err = createError(
    {
      message: 'this is a message.',
      appId: 'test',
      code: 'ERR_INVALID_PARAM',
      level: ErrorLevelEnum.ERROR,
    },
    {
      foo: 'bar',
    }
  );
  t.is(err.message, 'this is a message.');
  t.is(err.appId, 'test');
  t.is(err.code, 'ERR_INVALID_PARAM');
  t.is(err.level, 'error');
  t.deepEqual(err.context, {
    foo: 'bar',
  });
});

test('createError#toJSON', t => {
  const err = createError(
    {
      message: 'this is a message.',
      appId: 'test',
      code: 'ERR_INVALID_PARAM',
      level: ErrorLevelEnum.ERROR,
    },
    {
      foo: 'bar',
    }
  ).toJSON();
  t.is(err.message, 'this is a message.');
  t.is(err.appId, 'test');
  t.is(err.code, 'ERR_INVALID_PARAM');
  t.is(err.level, 'error');
});
