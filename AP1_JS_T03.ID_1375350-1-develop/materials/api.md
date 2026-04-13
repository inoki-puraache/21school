# API

`API (Application Programming Interface)` is a set of rules and tools that allow different software programs to communicate with each other. It defines how software components should interact, offering an interface for making requests and receiving responses.

In programming, an API can take various forms, such as:

- `Library APIs`: Provide a collection of functions and procedures that applications can use.
- `Operating System APIs`: Offer access to system functions and resources.
- `Web APIs`: Also known as _web application programming interfaces_, these are APIs available over a network, typically via HTTP or HTTPS.

# Web API

A Web API is used to enable communication between web or mobile applications and remote servers. It allows data to be exchanged and operations to be executed between the client and the server.

A common type of Web API is the **RESTful API**, which follows the principles of REST (Representational State Transfer). A RESTful API typically exposes resources, their identifiers, and operations such as:

- `POST` (create),
- `GET` (read),
- `PUT` (update),
- `DELETE` (delete).

Data exchange between client and server usually happens in **JSON** or **XML** format. JSON has become the more popular option due to its simplicity and human-readability.

Web APIs often include authentication methods to ensure secure data transfer. **OAuth** is one of the most widely used authentication protocols for Web APIs.

# Web API in Node.js

In Node.js, an API or Web API is typically implemented using frameworks, the most common being `Express`. A Web API in this context consists of routes and route handlers, and it often returns responses in JSON or XML format.

## Example using Express.js

```typescript

// Example of creating a simple Web API with Express.js
const express = require('express');
const app = express();
const port = 3000;

// GET handler for the route /api/hello
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

// GET handler for the route /api/greet/:name
app.get('/api/greet/:name', (req, res) => {
  const { name } = req.params;
  res.json({ message: `Hello, ${name}!` });
});

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

# API in NestJS

In `NestJS`, APIs are generally organized using **controllers**, **services**, and **models**.

**Example Controller**

```typescript

import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

**Example Service**

```typescript

import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  findAll(): string {
    return 'All cats from the service';
  }
}
```
