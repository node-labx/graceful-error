# graceful-error

#### Node 原生错误对象自有属性

- name 错误类名
- message 错误描述信息
- stack 错误堆栈

#### 扩展属性

- appId 应用唯一标识
- code 错误码，所有错误码都以 ERR 开头（与 Node 原生错误码保持一致），应用内保证全局唯一，例如：ERR_HTTP_INVALID_HEADER_VALUE
- level 错误级别，例如：info、warn、error
- context 错误上下文对象，适用于存储一些错误上下文信息

### API

```js
const { createError, ErrorLevelEnum } = require('graceful-error');

const err = createError(
  {
    message: 'Invalid HTTP header value.',
    appId: 'test',
    code: 'ERR_HTTP_INVALID_HEADER_VALUE',
    level: ErrorLevelEnum.ERROR,
  },
  {
    foo: 'bar',
  }
);
```
