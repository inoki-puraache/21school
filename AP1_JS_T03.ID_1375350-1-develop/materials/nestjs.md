# Nest.js

Nest.js is a framework for building scalable and efficient server-side applications using Node.js. It provides a structured and modular approach to development, using TypeScript (or JavaScript) as the primary language.

# Controllers

Controllers are responsible for handling incoming requests and returning responses. To create a basic controller, you use classes and decorators. Decorators bind metadata to classes, enabling Nest to construct a routing map that connects specific requests to corresponding handlers.

In the example below, we use the @Controller decorator to define a base controller. We specify an optional path prefix posts. Path prefixes in @Controller help group related routes and reduce code duplication. For example, we could group authentication routes under the prefix auth.

```typescript
// posts.controller.ts
import { Controller, Get } from '@nestjs/common'

@Controller('posts')
export class PostController {
  @Get()
  getAllPosts(): string {
    return 'All posts'
  }
}
```

In many cases, handlers need access to the request object. Nest provides a way to access the request object from the underlying platform (such as Express) using decorators. You can inject the request into a handler with the @Req decorator:

```typescript
import { Controller, Get, Req } from '@nestjs/common'
import { Request } from 'express'

@Controller('posts')
export class PostController {
  @Get()
  getAllPosts(@Req req: Request): string {
    return 'All posts'
  }
}
```

The request object represents the HTTP request and contains query string parameters, route parameters, headers, and the request body. Often, you don’t need to extract them manually—instead, use specialized decorators like @Body or @Query. Here's a list of available decorators and the corresponding request components:

```typescript
- `@Request, @Req` — `req`;
- `@Response, @Res` — `res`;
- `@Next` — `next`;
- `@Session` — `req.session`;
- `@Param(key?: string)` — `req.params / req.params[key]`;
- `@Body(key?: string)` — `req.body / req.body[key]`;
- `@Query(key?: string)` — `req.query / req.query[key]`;
- `@Headers(name?: string)` — `req.headers / req.headers[name]`;
- `@Ip` — `req.ip`;
- `@HostParam` — `req.hosts`.
```

# Providers

![Alt text](image-2.png)

*__Providers__* are a fundamental concept in `Nest`. Many of the base classes in Nest can be treated as providers — services, repositories, factories, helpers, etc. The core idea of a provider is that it can be injected as a dependency. This allows objects to relate to each other, and the process of "wiring" these objects together can largely be handled by Nest’s runtime system.

# Services

*__Services__* are one of the main building blocks for organizing business logic in a Nest application. Services are designed to handle specific tasks and provide functionality to controllers, other providers, or other parts of the application. They support dependency injection and are a key component of the `Nest.js` architecture.

# Modules

A *__module__* is a class annotated with the `@Module()` decorator. This decorator provides metadata that Nest uses to structure the application.

Every application has at least one module — the `root module`. The root module is the starting point Nest uses to build the application graph — an internal data structure that helps Nest resolve relationships and dependencies between modules and providers. While theoretically, very small applications can consist of only a root module, this is not typical.

The `@Module()` decorator takes an object with several properties:

- `providers` – the providers that will be instantiated by the Nest injector and can be shared within the module;
- `controllers` – the set of controllers defined in the module;
- `imports` – a list of other modules that export the providers required in this module;
- `exports` – a subset of providers that should be available to modules that import this module. You can export the provider instance itself or just its token (i.e., its provide value).

# Middlewares

A *__middleware__* is a function that is called before the route handler. Middleware functions have access to the request and response objects, as well as the `next()` function, which they must call to pass control to the next handler in the request-response cycle.

The next function is typically named next.

Example:

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
```


# Exception Filters

`Nest` comes with a built-in exception layer that handles all unhandled exceptions in the application. If an exception is not caught by your application code, it is intercepted by this layer, which then automatically sends a user-friendly response.

![Alt text](image-3.png)

```typescript
@Get()
async findAll() {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
```

# Pipes

A `pipe` is a class annotated with the @Injectable() decorator that implements the PipeTransform interface.

Pipes have two typical use cases:

- Transforming input data into the desired format (e.g., from string to integer);
- Validating and evaluating input data: if valid, pass it through unchanged; if not, throw an exception.

![Alt text](image-4.png)

Nest comes with nine built-in pipes:

- `ValidationPipe`
- `ParseIntPipe`
- `ParseFloatPipe`
- `ParseBoolPipe`
- `ParseArrayPipe`
- `ParseUUIDPipe`
- `ParseEnumPipe`
- `DefaultValuePipe`
- `ParseFilePipe`

Example usage:

```javascript
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}
```


# Guards

`Guards` are classes marked with the `@Injectable()` decorator that implement the `CanActivate` interface.

![Alt text](image-5.png)

Guards have a single responsibility: they determine whether a given request will be handled by the route handler or not, based on specific conditions at runtime (e.g., permissions, roles, access control lists, etc.).

Example:

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
```

# Interceptors

An *__interceptor__* is a class annotated with @Injectable() and implementing the NestInterceptor interface.

![Alt text](image-6.png)

Interceptors offer a set of powerful capabilities inspired by aspect-oriented programming (AOP):

- Bind extra logic before/after method execution;
- Transform the result returned by a function;
- Handle exceptions thrown by a function;
- Extend base method behavior;
- Fully override method execution based on conditions (e.g., for caching).

Example:

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}
```
