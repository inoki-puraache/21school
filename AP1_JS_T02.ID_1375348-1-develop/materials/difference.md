# Differences Between JavaScript and C/C++

## Compilation vs Interpretation

JavaScript is primarily an **interpreted** language. This means that the code is converted into bytecode and executed by a virtual machine within a web browser or another environment. As a result, JavaScript is highly **platform-independent** — it can run on virtually any system. This is one of the reasons why it’s widely used for building cross-platform and browser-based applications. It’s important to note that JavaScript was originally designed to allow developers to write code that would run efficiently in the browser.

**C++**, on the other hand, is a **compiled** language. When executing C++ code, the compiler translates it directly into machine code — without any intermediate virtual machine. This makes C++ less universal, as the resulting code is typically platform-specific. However, this low-level nature is exactly why C++ is commonly used for developing core parts of operating systems or performance-critical applications such as video games.

## Garbage Collection

JavaScript has **automatic garbage collection**. When memory is allocated during execution, it is automatically freed when no longer needed. This process is handled by the JavaScript engine.

In contrast, **C++ requires manual memory management**. The programmer must explicitly allocate and free memory. This has improved since C++11, which introduced **smart pointers** to help automate and safeguard memory handling, but the responsibility still largely lies with the developer.

## Typing

JavaScript is **dynamically and weakly typed**. This means variables do not require explicit data type declarations. You can use `var` (ES5), or more modern `let` and `const` (ES6) to declare variables without specifying types.

C++, on the contrary, is **statically and strongly typed**. You must explicitly define the data type of every variable during declaration. In addition, C++ generally requires the programmer to manage memory manually using `new / malloc` and release it with `delete / free`.

## Object-Oriented Programming (OOP)

JavaScript and C/C++ have **fundamentally different OOP models**:

- JavaScript uses a **prototype-based object model**. Every object inherits from another object (its prototype). There is no strict notion of classes (although ES6 introduces class syntax as syntactic sugar). JavaScript objects are **dynamic** — properties can be added or changed at runtime. Prototypes and closures are often used to build data models and implement design patterns.
- C/C++ use the **classical class-based OOP model** with explicit classes and inheritance hierarchies. Classes define templates for objects, specifying their structure and behavior. C/C++ structures and classes are **static**, meaning their structure is defined at compile time. The languages support traditional OOP principles such as **inheritance**, **encapsulation**, and **polymorphism**, with programs structured around objects and class methods.