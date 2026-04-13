# Modules

The module system in JavaScript was introduced to help organize code into more modular and maintainable structures. Before modules, JavaScript relied on the global namespace, which often led to name conflicts and maintenance issues.

## ES Modules (ESM)

ESM, or ECMAScript Modules, is the standardized module system introduced in ECMAScript 6 (ES6) and designed for use in both browsers and server environments. It offers an asynchronous and declarative approach to importing and exporting code. ESM supports circular dependencies, meaning modules can reference each other.

Files using ESM typically have a .mjs extension to distinguish them from CommonJS modules. However, with proper configuration, standard .js extensions can also be used.

```javascript
// module.mjs
const message = "Hello, ESM!";
export { message };

// main.mjs
import { message } from './module.mjs';
console.log(message); // Outputs "Hello, ESM!"
 ```

To export multiple items, use named exports with the export keyword. To import specific parts of a module, use the import keyword and specify the parts you want.

If a module exports only one entity, you can use a **default export**. In that case, import it without curly braces:

```javascript
// module.mjs
const message = "Hello, ESM!";
export default message;

// main.mjs
import message from './module.mjs';
console.log(message); // Outputs "Hello, ESM!"
 ```

You can also import modules **dynamically** at runtime:

```javascript
// main.mjs
const modulePath = './module.mjs';

import(modulePath).then((module) => {
  console.log(module.message); // Outputs "Hello, ESM!"
});

 ```

## CommonJS

**CommonJS** is a module format developed for server-side JavaScript, specifically in Node.js. It provides a synchronous method for organizing and managing dependencies, which can be inefficient for I/O or external resource loading.

For exporting in CommonJS, use the global module and exports objects. For importing, use require.

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
console.log(myModule.message); // Outputs "Hello, CommonJS!"

// main.js
const { greet, someValue } = require('./module');
greet("Alice"); // Outputs "Hello, Alice!"
console.log(someValue); // Outputs 42

 ```

## CommonJS AMD (Asynchronous Module Definition)

**AMD** is a module format designed for browser environments. It allows for **asynchronous loading of modules**, making it ideal for web development where resources may be fetched dynamically.

It defines a single global define function. require is used for importing.

```javascript
// module.js - Exporting a variable

define([], function () {
  return "Hello, AMD!";
});


// module.js - Exporting a function and object

define([], function () {
  function greet(name) {
    console.log(`Hello, ${name}!`);
  }

  return {
    greet,
    someValue: 42,
  };
});

// module.js - Export with named dependencies
define(['dependency1', 'dependency2'], function (dep1, dep2) {
  // use dep1 and dep2
  return "Hello, AMD!";
});

// main.js - Import entire module
require(['module'], function (myModule) {
  console.log(myModule); // Outputs "Hello, AMD!"
});

// main.js - Import specific value
require(['module'], function (myModule) {
  console.log(myModule.someValue); // Outputs 42
});

// main.js - Named imports
require(['module', 'dependency1', 'dependency2'], function (myModule, dep1, dep2) {
  // использование myModule, dep1 и dep2
  console.log(myModule); // Outputs "Hello, AMD!"
});
```

## UMD (Universal Module Definition)

**UMD** is a design pattern for writing JavaScript modules that work in multiple environments — CommonJS (e.g., Node.js), AMD (e.g., in the browser), and as global variables.

The goal of UMD is to provide a universal way to define and use modules across different runtimes.

```javascript
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD
    define(["dependency"], factory);
  } else if (typeof exports === "object") {
    // CommonJS
    module.exports = factory(require("dependency"));
  } else {
    // Global variable (browser)
    root.myModule = factory(root.dependency);
  }
})(typeof self !== "undefined" ? self : this, function (dependency) {
  // Module code

  function myFunction() {
    console.log(dependency.someMethod());
  }

  return {
    myFunction: myFunction,
  };
});

```

## Modules in the Browser

Modern browsers support ESM natively. You can use modules via the `<script>` tag with `type="module"`:

```javascript
<!-- index.html -->
<script type="module" src="main.mjs"></script>
```
You can also use `AMD` in the browser via libraries like `RequireJS`:

```javascript
<!-- index.html -->
<script data-main="main" src="require.js"></script>

```

**Recommendation:** `ESM` is currently the preferred and recommended module system for modern JavaScript development.