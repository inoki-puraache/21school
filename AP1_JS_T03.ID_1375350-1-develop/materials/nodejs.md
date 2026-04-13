# Node.js

`Node.js` is a JavaScript runtime built on Google’s V8 engine, the same engine used in the Google Chrome browser. Node.js enables the execution of JavaScript on the server side, unlocking new capabilities for building scalable and efficient web applications.

Node.js uses an event-driven architecture and non-blocking I/O operations, making it highly efficient at handling multiple requests without blocking the execution thread.

By default, Node.js uses `CommonJS` for module organization, which allows developers to split code across multiple files and reuse it throughout an application. However, `ESM (ECMAScript Modules)` can also be used.

Node.js has a vast library ecosystem and a large community. It's open-source, cross-platform, and since its introduction in 2009, it has gained massive popularity and now plays a major role in modern web development.

One unique advantage of Node.js is that millions of frontend developers who write JavaScript for browsers can now also use the same language for backend development—without needing to learn a completely different language.

# Performance

One of Node.js’s most attractive features is its speed. JavaScript code executed in Node.js can run up to twice as fast as code written in compiled languages like C or Java, and many times faster than interpreted languages like Python or Ruby.

This is largely due to Node’s non-blocking architecture. The actual performance results depend on the benchmark used, but overall, Node.js is considered a very fast platform.

# Node.js REPL

*__REPL__* stands for `Read-Evaluate-Print-Loop`. It's an interactive shell that allows users to enter JavaScript commands, execute them immediately, and view the results.

This makes REPL a powerful tool for quickly testing code, experimenting, and debugging.

# 1. Starting REPL

You can start the Node.js REPL by running the node command in a terminal without specifying a script file. You’ll see a REPL prompt (>) and can begin typing JavaScript code that executes immediately.

```nodejs
> const x = 10;
undefined
> x * 2
20
```

To run a script file instead, use:

```nodejs
node script.js
```

REPL retains a history of entered commands, which you can navigate using the up/down arrow keys.

## 2. REPL Special Commands

All REPL commands start with a dot (.):

- `.help`: displays help for REPL commands.
- `.editor`: opens the multi-line editor mode; exit with Ctrl+D to run the code.
- `.break`: exits multi-line input mode, similar to Ctrl+C.
- `.clear`: resets the REPL context to an empty object and clears current multi-line input.
- `.load`: <filename&gt>: loads a JavaScript file relative to the current directory.
- .save <filename&gt>: saves the current REPL session to a file.
- `.exit`: exits REPL (same as pressing Ctrl+C twice).

## Event Loop

The `Event Loop` is a core mechanism that allows Node.js to efficiently manage asynchronous operations and event handling. It runs continuously in a single thread and cycles through various stages.

`Libuv`, a C library, implements this pattern and is a fundamental part of Node.js.

Each complete pass through all stages of the event loop is called a `tick`.

The event loop consists of 6 phases:

![Alt text](image.png)

- `timers`: Executes callbacks scheduled by setTimeout() and setInterval().
- `pending callbacks`: Executes most I/O callbacks, excluding close events, timers, and setImmediate().
- `idle, prepare`: Used internally by Node.js.
- `poll`: Retrieves new I/O events; Node may block here.
- `check`: Executes callbacks scheduled by setImmediate().
- `close callbacks`: Executes, for example, socket.on('close', ...).