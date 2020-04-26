# graceful-error

### 一、基础介绍

GracefulError 在 Node 原生错误对象 Error 的基础之上，新增了 6 个属性，如下所示。

#### Node 原生错误对象自有属性

- name 错误类名
- message 错误描述信息
- stack 错误堆栈

#### 新增扩展属性

- appId 应用唯一标识
- logIndex 日志索引
- code 错误码
- level 错误级别，例如：info、warn、error
- feature 业务标识
- context 错误上下文对象，适用于存储一些错误上下文信息

### 二、API

#### 1. ErrorLevelEnum

ErrorLevelEnum 错误级别枚举对象，原始定义如下

```js
const ErrorLevelEnum = {
  INFO: 'info',
  NOTICE: 'notice',
  ALERT: 'alert',
  WARN: 'warn',
  ERROR: 'error',
  CRITICAL: 'critical',
};
```

示例代码：

```js
ErrorLevelEnum.INFO; // 'info'
ErrorLevelEnum.ERROR; // 'error'
```

#### 2. createError(options, context)

参数说明：

- options 错误配置对象
  - options.message 错误描述信息
  - options.appId 应用唯一标识
  - options.logIndex 日志索引
  - options.code 错误码
  - options.level 错误级别，例如：info、warn、error
  - options.feature 业务标识
- context 错误上下文对象，适用于存储一些错误上下文信息

示例代码：

```js
const { createError, ErrorLevelEnum } = require('graceful-error');
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
```

#### 3. wrapError(err, options, context)

将一个错误对象包装成 GracefulError 类型的错误。

参数说明：

- err 原始的错误对象
- options 同 createError options 参数
- context 同 createError context 参数

```js
const { wrapError } = require('graceful-error');

const oldError = new Error('hello world');
const newError = wrapError(oldError);
```

#### 4. toJSON()

将 err 错误对象转换成一个 JSON 对象

```js
const errJSON = err.toJSON();
```
