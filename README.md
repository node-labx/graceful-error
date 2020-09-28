# graceful-error

### 一、基础介绍

GracefulError 在 Node 原生错误对象 Error 的基础之上，新增了 8 个属性，如下所示。

#### Node 原生错误对象自有属性

- name 错误名
- message 错误描述信息，用于日志打印
- stack 错误堆栈

#### 新增扩展属性

- code 错误唯一标识，可以是数字，也可以是字符串
- msg 错误提示信息，返回给前端展示用的错误提示信息
- level 错误级别，例如：info、warn、error
- errorType 错误类型
- appId 应用唯一标识
- logIndex 日志索引
- feature 业务标识
- context 错误上下文对象，适用于存储一些错误上下文信息

> 注意：

- code / msg 返回给前端展示用的错误码和错误提示信息；
- appId / logIndex 后端日志上报应用标识及日志索引；

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

  - options.message 必传，错误描述信息
  - options.code 必传，错误码
  - options.msg 必传，错误提示信息
  - options.level 可选，错误级别，例如：info、warn、error
  - options.errorType 可选，错误类型
  - options.appId 可选，应用唯一标识
  - options.logIndex 可选，日志索引
  - options.feature 可选，业务标识

- context 可选，错误上下文对象，适用于存储一些错误上下文信息

示例代码：

```js
const { createError, ErrorLevelEnum } = require('graceful-error');
const err = createError(
  {
    message: 'Invalid HTTP header value.',
    code: 'ERR_HTTP_INVALID_HEADER_VALUE',
    msg: '请求参数不合理',
    level: ErrorLevelEnum.ERROR,
    errorType: 'demo_type',
    appId: 'demo',
    logIndex: 'demo_log_index',
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
