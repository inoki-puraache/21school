# Модули

Система модулей в JavaScript была введена для организации кода в более модульные и поддерживаемые структуры. До появления системы модулей, JavaScript использовал глобальное пространство имен, что могло приводить к конфликтам имен и затруднять поддержку.

## ES Modules (ESM)

ESM — это стандарт модулей ECMAScript, предназначенный для использования в браузерах и на сервере. Он был введен в ECMAScript 6 (ES6) и предоставляет асинхронный и декларативный способ подключения модулей.  ESM поддерживает циклические зависимости, что означает, что модули могут взаимно ссылаться друг на друга. Файлы, использующие ESM, обычно имеют расширение `.mjs` для обеспечения различия с CommonJS. Однако, если у тебя есть конфигурация, позволяющая использовать ESM без расширения, файлы могут использовать стандартное расширение .js.

```javascript
// module.mjs
const message = "Hello, ESM!";
export { message };

// main.mjs
import { message } from './module.mjs';
console.log(message); // Выводит "Hello, ESM!"

 ```

В случае, когда необходимо экспортировать несколько сущностей из модуля, применяется именованный экспорт. Он выполняется с помощью инструкции `export`. Чтобы импортировать какой-либо метод, необходимо воспользоваться инструкциeй `import`, указав интересующие части модуля и путь до него.

Если из файла модуля экспортируется только одна сущность, удобнее использовать экспорт по умолчанию. Для этого нужно добавить `default` после инструкции `export`. При этом импорт указывается без `{}`.

```javascript
// module.mjs
const message = "Hello, ESM!";
export default message;

// main.mjs
import message from './module.mjs';
console.log(message); // Выводит "Hello, ESM!"
 ```

Существует возможность импортировать модули динамически во время выполнения. Такой способ импорта называется **_динамическим_**.

```javascript
// main.mjs
const modulePath = './module.mjs';

import(modulePath).then((module) => {
  console.log(module.message); // Выводит "Hello, ESM!"
});

 ```

## CommonJS

**_CommonJS_** — это формат модулей, который был разработан для использования на серверной стороне JavaScript, а именно в среде выполнения `Node.js`. Он предоставляет синхронный механизм для организации модулей и управления их зависимостями, что может быть неэффективным для операций ввода-вывода или загрузки внешних зависимостей. В связи с этим для асинхронных операций, таких как чтение файла, часто используется стандартный JavaScript-подход с колбэками или Promise.

Для экспорта в CommonJS используются глобальные объекты `module` и `exports`. Для этого нужно просто добавить новое поле в объект `exports`. Для импорта используется ключевое слово `require`.

```javascript
// module.js
const message = "Hello, CommonJS!";

function greet(name) {
  console.log(`Hello, ${name}!`);
}

module.exports = {
  greet,
  someValue: 42,
  message,
};


// main.js
const myModule = require('./module');
console.log(myModule.message); // Выводит "Hello, CommonJS!"

// main.js
const { greet, someValue } = require('./module');
greet("Alice"); // Выводит "Hello, Alice!"
console.log(someValue); // Выводит 42

 ```

## CommonJS AMD (Asynchronous Module Definition)

Это формат модулей, предназначенный для работы в браузерной среде и обеспечивающий асинхронную загрузку модулей. Он был создан как альтернатива синхронному CommonJS для сценариев веб-разработки, где загрузка ресурсов может быть асинхронной.

Спецификация определяет одну функцию «**_define_**», которая доступна как свободная переменная или глобальная переменная. `require` используется для импорта.

```javascript
// module.js `экспорт переменной`
define([], function () {
  return "Hello, AMD!";
});

// module.js `Экспорт функции и объекта`
define([], function () {
  function greet(name) {
    console.log(`Hello, ${name}!`);
  }

  return {
    greet,
    someValue: 42,
  };
});


// module.js `Экспорт с именованными зависимостями`
define(['dependency1', 'dependency2'], function (dep1, dep2) {
  // использование dep1 и dep2
  return "Hello, AMD!";
});


// main.js `Импорт всего модуля`
require(['module'], function (myModule) {
  console.log(myModule); // Выводит "Hello, AMD!"
});


// main.js `Ипорт конкретной переменной`
require(['module'], function (myModule) {
  console.log(myModule.someValue); // Выводит 42
});


// main.js `Именованный импорт`
require(['module', 'dependency1', 'dependency2'], function (myModule, dep1, dep2) {
  // использование myModule, dep1 и dep2
  console.log(myModule); // Выводит "Hello, AMD!"
});


 ```

## UMD (Universal Module Definition)

**_UMD_** — это шаблон для написания модулей JavaScript, который позволяет использовать один и тот же код как в среде CommonJS (например, Node.js), так и в среде AMD (Asynchronous Module Definition), а также как глобальную переменную в браузере.

Цель UMD заключается в том, чтобы создать универсальный способ определения и использования модулей, который может быть адаптирован к различным средам выполнения.

```javascript
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['dependency'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory(require('dependency'));
    } else {
        // Глобальная переменная
        root.myModule = factory(root.dependency);
    }
}(typeof self !== 'undefined' ? self : this, function (dependency) {
    // Код модуля

    function myFunction() {
        console.log(dependency.someMethod());
    }

    // Возвращает объект, который будет виден в зависимости от среды выполнения
    return {
        myFunction: myFunction
    };
}));

```

## Определение модулей в браузере

Современные браузеры поддерживают ESM. Модули могут быть использованы с атрибутом  `type="module"` в теге `<script>`.

```javascript
<!-- index.html -->
<script type="module" src="main.mjs"></script>
```

Можно использовать и `AMD`, но придется использовать библиотеки для реализации, например, `RequireJS`.

```javascript
<!-- index.html -->
<script data-main="main" src="require.js"></script>

```

На данный момент предпочтительно и рекомендуемо использовать систему модулей `ESM`.
