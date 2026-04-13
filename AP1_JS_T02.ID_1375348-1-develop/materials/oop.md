# Object-Oriented Approach in JavaScript

JavaScript supports object-oriented programming, and its core OOP concept is based on working with objects.

**_Object_** is an entity that has distinct behavior and specific characteristics.

To create objects, JavaScript uses classes — special templates that define which properties an object will have and what it can do. A common example of a class is a _car_. There are many configurations, brands, and body types, but they are fundamentally similar — differing only in certain details.

Each object has a **state**, which is described by a set of properties. Typically, this set of properties remains the same for related objects, with only the values of those properties changing.

Another important feature of an object is its **behavior** — how it changes and interacts with other objects. Usually, an object's actions are aimed either at modifying its state or at passing data to other objects.

JavaScript uses a **prototype-based inheritance mechanism**. An object can inherit properties and methods from another object. This approach to inheritance is a distinctive feature of the JavaScript language. Unlike classical inheritance in languages like Java or C++, JavaScript employs a prototype-based object model instead of a class-based one.

## `prototype` and `__proto__`

The _**prototype**_ and _**\_\_proto\_\_**_ properties in JavaScript are both related to prototype inheritance but serve different purposes.

**prototype** is a property of constructor functions. Every function in JavaScript is also an object and has a prototype property, which points to a prototype object. This object defines the prototype for all instances created by that constructor function. All such instances inherit the properties and methods of this prototype.

```javascript
function Animal(name) {
  this.name = name;
}

// prototype points to the prototype object
console.log(Animal.prototype); // Output: Object {}
```

***\_\_proto\_\_*** is a property present on every JavaScript object. It points to the prototype object that the current object inherits from. This property allows runtime access to an object’s prototype, although it's considered outdated. For working with prototypes, modern methods like `Object.create`, `Object.getPrototypeOf`, and `Object.setPrototypeOf` are recommended.

```javascript
const myDog = new Animal('Buddy');

// __proto__ points to the object's prototype
console.log(myDog.__proto__); // Output: Animal {}
```

There is a direct relationship between _**\_\_proto\_\_**_ and prototype: the _**\_\_proto\_\_**_  of an object is equal to the prototype of the constructor function used to create it.

```javascript
someobject.__prototype__ === someObjectConstructor.prototype

const arr = []; // arr.__proto__ === Array.prototype

class MyClass {}

const myclass = new MyClass(); // myclass.__proto__ === MyClass.prototype;
```

**Creating Objects**

In JavaScript, objects can be created using:

- object literals ({}),
- the constructor function new Object(),
- or the Object.create method.

```javascript

// Creating an object

const car = {
  brand: 'Toyota',
  model: 'Camry',
  year: 2022,
  start: function() {
    console.log('Engine started');
  }
};


// Accessing properties and methods
console.log(car.brand); // Output: Toyota
car.start(); // Output: Engine started
```

As more properties are added, objects can become large. Manually creating each object like this can be tedious and inefficient. That’s where **constructor functions** come in.

In JavaScript, classes are implemented using constructor functions — regular functions that are used with the new keyword to create new objects.

```javascript

// Constructor function
function Car(brand, model, year) {
  this.brand = brand;
  this.model = model;
  this.year = year;
}

// Adding a method to the prototype

Car.prototype.start = function() {

console.log('Engine started');

};

// Creating an object using the constructor
const myCar = new Car('Toyota', 'Camry', 2023);
myCar.start(); // Output: Engine started
```

## Implementing Prototype-Based Inheritance

In JavaScript, inheritance is implemented through **prototypes**. When an object is created, it is automatically assigned a prototype — another object. Prototypes form a chain that allows objects to inherit properties and methods.

```javascript
// Parent constructor
function Animal(name) {
    this.name = name;
}

// Adding a method to the parent prototype
Animal.prototype.makeSound = function() {
    console.log('Some generic sound');
};

// Child constructor
function Dog(name, breed) {
    // Call the parent constructor
    Animal.call(this, name);
    this.breed = breed;
}

// Inherit from the parent prototype
Dog.prototype = Object.create(Animal.prototype);

// Add a method to the child prototype
Dog.prototype.bark = function() {
    console.log('Woof!');
};

// Create an instance of the child object
const myDog = new Dog('Buddy', 'Golden Retriever');

// Use inherited methods
myDog.makeSound(); // Output: Some generic sound
myDog.bark(); // Output: Woof!
```

## Implementing Prototype-Based Polymorphism

Polymorphism in JavaScript is implemented by allowing objects to have methods with the same name but different implementations.

```javascript
// Parent constructor
function Shape() {}

// Add a method to the parent prototype

Shape.prototype.draw = function() {
    console.log('Drawing a shape');
};

// Child constructor
function Circle(radius) {
    Shape.call(this);
this.radius = radius;
}

// Inherit from the parent prototype
Circle.prototype = Object.create(Shape.prototype);

// Override the method to implement polymorphism
Circle.prototype.draw = function() {
    console.log('Drawing a circle with radius ' + this.radius);
};

// Another child constructor
function Square(side) {
    Shape.call(this);
    this.side = side;
}

// Inherit from the parent prototype
Square.prototype = Object.create(Shape.prototype);

// Override the method to implement polymorphism
Square.prototype.draw = function() {
    console.log('Drawing a square with side ' + this.side);
};

// Create object instances
const circle = new Circle(5);
const square = new Square(4);

// Using polymorphism
circle.draw(); // Output: Drawing a circle with radius 5
square.draw(); // Output: Drawing a square with side 4
```

**Implementing Encapsulation**

In JavaScript, encapsulation is typically achieved through **closures** and **private properties**. Private variables and methods are stored inside a closure, making them inaccessible from the outside.

```javascript
// Constructor function
function Counter() {

    // Private variable
    let count = 0;

    // Private method
    function increment() {
        count++;
    }

    // Public method with access to the private method
    this.getCount = function() {
        increment(); // Private method is accessible inside
        return count;
    };
}

// Create an instance of the object
const counter = new Counter();

// Using the method with encapsulated state
console.log(counter.getCount()); // Output: 1
console.log(counter.getCount()); // Output: 2
```

## OOP with ES6+

The ECMAScript 2015 (ES6) standard and later versions introduced a new syntax for defining classes in JavaScript, making object-oriented programming easier and more readable. While this syntax provides a cleaner way to define objects and inheritance, it’s still based on JavaScript’s **prototype** system under the hood.

This approach is now considered the **preferred and recommended** way to work with OOP in JavaScript.

ES6 introduced new keywords like class, extends, and super, which provide a more convenient and explicit way to define object-oriented structures in JavaScript.

### Class Definition

```javascript
class Animal {

    // Constructor — runs when an instance of the class is created
    constructor(name) {
    this.name = name;
    }

    // Class method
    makeSound() {
        console.log('Some generic sound');
    }

}

const myDog = new Animal('Buddy');
```

### Inheritance (ES6+)

The extends keyword is used to create a subclass (child class) that inherits properties and methods from another class (the parent class). The super keyword is used within the child class to call the parent class’s constructor or its methods.

```javascript
class Dog extends Animal {
    constructor(name, breed) {
        // Call the parent constructor
        super(name);
        this.breed = breed;
    }

    // Override the parent method
    makeSound() {
        console.log('Woof!');
    }

    // New method specific to the child class
    bark() {
        console.log('Barking!');
    }
}

const myDog = new Dog('Buddy', 'Golden Retriever');

myDog.makeSound(); // Output: Woof!
myDog.bark(); // Output: Barking!
```

### Polymorphism (ES6+)

```javascript
class Shape {
    constructor() {
        // Shared constructor for all shapes
    }

    // Shared method
    getArea() {
        console.log('Undefined area');
        return undefined;
    }
}

class Circle extends Shape {
    constructor(radius) {
    super();
    this.radius = radius;
    }

    // Override the method for circle
    getArea() {
        const area = Math.PI * this.radius ** 2;
        console.log(`Area of the circle: ${area.toFixed(2)}`);
        return area;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    // Override the method for rectangle
    getArea() {
        const area = this.width \* this.height;
        console.log(`Area of the rectangle: ${area}`);
        return area;
    }
}

// Function using polymorphism
function printArea(shape) {
    shape.getArea();
}

// Creating instances of different classes
const circle = new Circle(5);
const rectangle = new Rectangle(4, 6);

// Calling function using polymorphism
printArea(circle); // Output: Area of the circle: 78.54
printArea(rectangle); // Output: Area of the rectangle: 24
printArea(new Shape()); // Output: Undefined area
```

In this example, Circle and Rectangle are subclasses of Shape, each overriding the getArea method. The printArea function takes a Shape object and calls its getArea method, demonstrating polymorphism.

### Encapsulation in ES6+

As previously mentioned, JavaScript commonly achieves encapsulation through closures. The # symbol denotes a private field or method. This syntax was introduced relatively recently and may still be unsupported or only partially supported in some JavaScript engines — a polyfill might be required.

```javascript
class Counter {
    #count = 0; // Private class field

    increment() {
        this.#count++;
    }

    decrement() {
        if (this.#count > 0) {
            this.#count--;
        }
    }

    getCount() {
        return this.#count;
    }

    #isNumber() {
        return typeof this.#count === 'number';
    }
}

const counter = new Counter();

counter.increment();
counter.increment();
counter.decrement();
console.log(counter.getCount()); // Output: 2
console.log(counter.#count); // Error: Private field '#count' must be declared in an enclosing class
```

However, private methods can also be emulated.

```javascript

class MyClass {
    constructor() {
    // Private function enclosed in the constructor
    const privateMethod = () => {
      console.log('This is a private method');
    };

    // Public method with access to the private function
    this.publicMethod = () => {
      privateMethod();
      console.log('This is a public method');
    };
  }
}

const instance = new MyClass();

instance.publicMethod(); // Output: This is a private method, This is a public method
instance.privateMethod(); // Error: instance.privateMethod is not a function
```

In the example above, privateMethod is a function enclosed within the constructor of MyClass. It’s accessible only from within instances of the class and cannot be called externally. However, it’s important to note that this is **_not truly private_** — rather, it’s a convention indicating that the method shouldn’t be accessed from outside. The real protection of such "private" methods relies on conventions and community discipline, not on the language’s mechanisms.

### Getters and Setters

**_Getters and setters_** are special methods in objects or classes that are used to read (getter) or write (setter) property values. In ES6+, they can be used both in plain objects and in class definitions.

```javascript
const person = {
  firstName: 'John',
  lastName: 'Doe',

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
};

console.log(person.fullName);  // Output: John Doe
```


```javascript
const person = {
  _firstName: 'John',
  _lastName: 'Doe',

  set fullName(name) {
    const [firstName, lastName] = name.split(' ');
    this._firstName = firstName;
    this._lastName = lastName;
  },

  get fullName() {
    return `${this._firstName} ${this._lastName}`;
  }
};

person.fullName = 'Jane Smith';
console.log(person.fullName); // Output: Jane Smith
```

### Static Fields and Methods

**Static fields and methods** belong to the class itself, not to its instances. They are declared using the static keyword.

```javascript
class MathOperations {
  static PI = 3.14;
}

console.log(MathOperations.PI); // Output: 3.14

class MathOperations {
  static square(x) {
    return x * x;
  }
}

console.log(MathOperations.square(5)); // Output: 25
```

If you plan to use a static variable inside a class method, then **_the method must also be static_**.

```javascript
class Counter {
  static count = 0; // Static variable

  static increment() {
    Counter.count++;
  }

  static getCount() {
    return Counter.count;
  }
}

Counter.increment();
Counter.increment();
console.log(Counter.getCount());  // Output: 2
```