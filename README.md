# graceful-error

#### Node 原生错误对象自有属性

- name 错误类名
- message 错误描述信息
- stack 错误堆栈

#### 扩展属性

- appId 应用唯一标识
- logIndex 日志索引
- code 错误码
- level 错误级别，例如：info、warn、error
- feature 业务标识
- context 错误上下文对象，适用于存储一些错误上下文信息

### API

```js
const { createError, ErrorLevelEnum } = require('graceful-error');

// 1.createError
const err = createError(
  {
    message: 'Invalid HTTP header value.',
    appId: 'demo',
    logIndex: 'demo_log_index',
    code: 'ERR_HTTP_INVALID_HEADER_VALUE',
    level: ErrorLevelEnum.ERROR,
    feature: 'demo_feature',
  },
  {
    foo: 'bar',
  }
);

// 2.toJSON
const errJSON = err.toJSON();
```
