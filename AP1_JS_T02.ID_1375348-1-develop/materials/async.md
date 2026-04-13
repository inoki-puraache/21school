# Asynchronous Programming

JavaScript is based on a **single-threaded** execution model, where all operations are carried out in a single thread. As a single-threaded runtime language, JavaScript does not support running multiple tasks in parallel within one process.

However, there are mechanisms for enabling parallel execution.

## Event Loop

The **event loop** is a key part of the asynchronous execution model in JavaScript. It controls how events are processed and how code is executed in a single-threaded environment.

- The entire program is executed within the call stack. Each function invoked in the program is placed on top of the stack.
- While executing, a function may trigger asynchronous operations like timers (`setTimeout`), server requests, event handlers, etc.
- Asynchronous operations are placed in the **message queue** after the call stack has finished processing.
- The **event loop** monitors both the call stack and the message queue. When the call stack is empty, the event loop picks the first message from the queue and adds it to the call stack for execution.
- The event loop also manages the **microtask queue**. Microtasks are functions that run _after_ the current task is completed, but _before_ I/O events or timers.

The operation of the **Event Loop** can be schematically represented like this:

![Alt text](image.png)

## Parallel Execution

- **Web Workers** are a mechanism that allows JavaScript code to be run in a background thread, in parallel with the main thread. They come with limitations — for example, no access to the DOM — but they can perform asynchronous operations, handle complex computations, and interact with the main thread through message passing.

```javascript
// main.js
const worker = new Worker('worker.js'); // path to file
worker.postMessage('Hello from main thread');

// worker.js
onmessage = function (event) {
  console.log('Message received:', event.data);
};

```

- **Service Workers** are a special kind of Web Worker that operate in the background and can be used for tasks like caching, sending notifications, and performing background operations. They're commonly used in web apps to handle network requests and improve performance. For example, they're a key component in Progressive Web Apps (PWA), enabling offline use, faster load times, and more.

```javascript
// index.js

// Registering a service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
```

```javascript
//service-worker.js

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles/main.css',
        '/scripts/main.js',
        '/images/logo.png'
        // Add more resources to cache here
      ]);
    })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
    // Actions on service worker activation
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

- **Using Promise.all**: If you have multiple independent async tasks, you can execute them in parallel using Promise.all. It waits for all provided promises to complete and returns an array of their results.

```javascript
const promise1 = asyncFunction1();
const promise2 = asyncFunction2();
const promise3 = asyncFunction3();

const results = await Promise.all([promise1, promise2, promise3]);

```

## Using Timers

JavaScript provides several timers via the runtime environment (e.g., Node.js or browsers), which allow code to be executed asynchronously or after a specific delay. Code inside them is queued as **macrotasks**.

1. **setTimeout**  
    Executes code after a specified delay (in milliseconds). Returns a timeout ID that can be used to cancel it with clearTimeout.

```javascript
setTimeout(() => {
  console.log('Delayed code');
}, 1000);
clearTimeout(timeoutId); // Cancels the timeout if needed
```

2. **setInterval**  
    Executes code at regular intervals. Returns an interval ID that can be canceled with clearInterval.

```javascript
let counter = 0;
const intervalId = setInterval(() => {
  console.log(`Interval: ${counter}`);
  counter++;

  if (counter === 5) {
    clearInterval(intervalId); // Stop after 5 runs
  }
}, 1000);
```

3. **setImmediate**  
    Schedules a function to run as soon as the current event loop phase completes.

Note: setImmediate is deprecated and not recommended for use. Some browsers may still support it, but it's likely removed from web standards or preserved only for compatibility.

```javascript
setImmediate(() => {
  console.log('Immediate code');  // Executes in the next event loop cycle
});
```

## Callback Hell

**Callback hell** (also known as the "Pyramid of Doom" due to the visual indentation of nested callbacks) describes a situation in asynchronous code where multiple callbacks are nested within one another, making the code hard to read and maintain. This usually happens when callbacks are used inside other callbacks, leading to deep and tangled code structures.

Example:

```javascript
function fun1(callback){
    setTimeout(()=>{
    
        let i = 1 ;
        callback(i); i++ ;
        setTimeout(()=>{
     
           callback(i); i++;
           setTimeout(()=>{
        
             callback(i); i++ ;
             setTimeout(()=>{
          
                callback(i); i++ ;
                setTimeout(()=>{
            
                  callback(i); i++ ;
                  // .... and so on
                  
                }, 800)
             }, 700)
           }, 500)
        }, 300)
    }, 100)
}
 ```

To solve this, **Promises** were introduced.

## Using Promises

A **Promise** in JavaScript is an object representing an asynchronous operation that may complete successfully or with an error. Promises make asynchronous code easier to read and manage.

A Promise is created with a callback function (called the executor), which takes two arguments: resolve and reject. The executor function runs immediately when the Promise is created.

A Promise has three states:

- **Pending**: Initial state, neither fulfilled nor rejected.
- **Fulfilled**: The operation completed successfully.
- **Rejected**: The operation failed.

Example:

```javascript

// Creating a promise
const myPromise = new Promise((resolve, reject) => {
    const success = true;
    if (success) {
        resolve('Completed successfully');
    } else {
        reject('Something went wrong');
    }
});

// Using the promise

myPromise
  .then((result) => {
    console.log(result);// 'Completed successfully'
})
  .catch((error) => {
    console.error(error);  // 'Something went wrong'
});
```

**Execution Order Example**

```javascript
console.log('Start');

const myPromise = new Promise((resolve) => {
  console.log('Inside Promise');
  resolve('Promise Resolved');
});

myPromise.then((result) => {
  console.log(result);
});

console.log('End');

// Output:

// Start
// Inside Promise
// End
// Promise Resolved
```

As you can see, 'Promise Resolved' is printed last. This is because the code inside the Promise runs immediately, but .then() callbacks are added to the microtask queue and executed after the current call stack is cleared.

### Chaining Promises

Promise chaining allows you to perform a sequence of asynchronous operations where each .then() passes its result to the next.

```javascript

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;

    if (success) {
      resolve("Success");
    } else {
      reject("Failure");
    }
  }, 1000);
});

promise

  .then((result) => {
    console.log(result); // 'Success'

    return "More info";
  })

  .then((info) => {
    console.log(info); // 'More info'

    throw new Error("Something went wrong");
  })

  .catch((error) => {
    console.error(error.message); // 'Something went wrong'
  })

  .finally(() => {
    console.log("This runs no matter what.");
  });
```

Let’s rewrite the callback hell example using Promises — it's already much clearer:

```javascript
function promiseFunction(timeout, callback) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let i = 1;
      callback(i);
      i++;
      resolve(i);
    }, timeout);
  });
}

function fun1(callback) {
  promiseFunction(100, callback)
    .then((result) => promiseFunction(300, callback))
    .then((result) => promiseFunction(500, callback))
    .then((result) => promiseFunction(700, callback))
    .then((result) => promiseFunction(800, callback))
    .catch((error) => console.error(error));
}

fun1((value) => console.log(value));

```

**Using async / await**

The async / await syntax is syntactic sugar over Promises, providing a cleaner, more readable way to write asynchronous code.

- async defines an asynchronous function that always returns a Promise.
- await pauses the execution until the Promise is resolved and returns its result.
- await can only be used inside async functions.

```javascript
function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved after 2 seconds');
    }, 2000);
  });
}

async function asyncExample() {
  console.log('Before async operation');
  const result = await resolveAfter2Seconds();
  console.log(result);
  console.log('After async operation');
}

asyncExample();

 ```

We can also rewrite the previous callback hell example using async/await:

```javascript
function promiseFunction(timeout, callback) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let i = 1;
      callback(i);
      i++;
      resolve(i);
    }, timeout);
  });
}

async function fun1(callback) {
  try {
    await promiseFunction(100, callback);
    await promiseFunction(300, callback);
    await promiseFunction(500, callback);
    await promiseFunction(700, callback);
    await promiseFunction(800, callback);
  } catch (error) {
    console.error(error);
  }
}

fun1((value) => console.log(value));

 ```

Using async/await is currently the preferred and recommended way to write asynchronous JavaScript.