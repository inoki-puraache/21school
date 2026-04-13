# Объектно-ориентированный подход в JavaScript

JavaScript поддерживает объектно-ориентированное программирование, и его основная концепция ООП основана на работе с объектами.

**_Объект_** — это сущность, обладающая особенным поведением и отличительными характеристиками.
Для создания объектов используются классы — специальные шаблоны, которые определяют, какими
свойствами будет обладать объект и что он умеет делать. Пример класса — _автомобиль_. Существует много разных комплектаций, марок и типов кузова, но по сути все они похожи, разница лишь в незначительных деталях.

Каждый объект обладает состоянием, которое описывается набором свойств. Как правило, этот
набор не меняется от одного родственного объекта к другому. Изменяются лишь значения этих
свойств.

Другая важная характеристика объекта — поведение. Оно показывает, как объект изменяется и как взаимодействует с другими объектами. Обычно все действия объекта направлены либо на изменение его состояния, либо на передачу данных другим объектам.

JavaScript использует механизм прототипов для реализации наследования. Объект может наследовать свойства и методы от другого объекта. Прототипное наследование — это особенность языка JavaScript, которая определяет, как объекты наследуют свойства и методы от других объектов. Вместо классов, как в классическом наследовании (например, в языке Java или C++), в JavaScript используется прототипная модель объектов.

## `Prototype` и `__proto__`

Свойства _**prototype**_ и _**\_\_proto\_\_**_ в JavaScript связаны с прототипным наследованием и имеют разные цели.

**_prototype_** — это свойство функции-конструктора. Каждая функция в JavaScript является объектом, и у нее есть свойство prototype, которое ссылается на объект-прототип. Свойство используется для определения прототипа объекта, созданного с использованием данной функции-конструктора. Все экземпляры, созданные от этой функции-конструктора, наследуют свойства и методы из объекта, на который указывает prototype.

```javascript
function Animal(name) {
  this.name = name;
}

// prototype связан с объектом-прототипом
console.log(Animal.prototype);  // Вывод: Object {}

```

***\_\_proto\_\_*** — это свойство каждого объекта в JavaScript. Оно указывает на объект-прототип, от которого наследуются свойства и методы. Этос свойство используется для доступа и изменения прототипа объекта во время выполнения. Однако, следует отметить, что **proto** считается устаревшим, и для манипуляций с прототипами рекомендуется использовать более современные методы, такие как `Object.create`, `Object.getPrototypeOf`, `Object.setPrototypeOf`.

```javascript
const myDog = new Animal('Buddy');

// __proto__ связан с прототипом объекта
console.log(myDog.__proto__);  // Вывод: Animal {}

```

При этом, есть связь между _**\_\_proto\_\_**_ и ._**prototype**_. proto является ссылкой на прототип объекта, а prototype является объектом, который будет использоваться в качестве прототипа для новых объектов, созданных с помощью функции-конструктора.

```javascript
someobject.__prototype__ === someObjectConstructor.prototype

const arr = []; // arr.__proto__ === Array.prototype

class MyClass {}

const myclass = new MyClass(); // myclass.__proto__ === MyClass.prototype;
```

## Создание объектов

В JavaScript объекты можно создавать с использованием литерала объекта `{}` или с использованием конструктора `new Object()`, а также функции `Object.create`.

```javascript
// Создание объекта
const car = {
  brand: 'Toyota',
  model: 'Camry',
  year: 2022,
  start: function() {
    console.log('Engine started');
  }
};

// Доступ к свойствам и методам
console.log(car.brand);  // Вывод: Toyota
car.start();             // Вывод: Engine started

```

По мере добавления новых свойств объект разрастается, в объекте может быть довольно много свойств и методов, и создавать каждый объект вручную долго и неудобно, поэтому можно использовать классы. В JavaScript классы реализованы через функции-конструкторы. Это обычные функции, но с их помощью можно создавать объекты, используя ключевое слово `new`.

```javascript
// Функция-конструктор
function Car(brand, model, year) {
  this.brand = brand;
  this.model = model;
  this.year = year;
}

// Добавление метода в прототип
Car.prototype.start = function() {
  console.log('Engine started');
};

// Создание объекта с использованием функции-конструктора
const myCar = new Car('Toyota', 'Camry', 2023);
myCar.start();  // Вывод: Engine started
 ```

## Реализация прототипного наследования

В JavaScript механизм наследования реализуется через прототипы. Когда объект создается, ему автоматически назначается прототип, который является другим объектом. Прототипы обеспечивают цепочку наследования, где объекты могут наследовать свойства и методы от своих прототипов.

```javascript
// Родительский конструктор
function Animal(name) {
  this.name = name;
}

// Добавление метода в прототип родительского конструктора
Animal.prototype.makeSound = function() {
  console.log('Some generic sound');
};

// Дочерний конструктор
function Dog(name, breed) {
  // Вызов конструктора родителя с передачей контекста
  Animal.call(this, name);
  this.breed = breed;
}

// Наследование от родительского прототипа
Dog.prototype = Object.create(Animal.prototype);

// Добавление метода в прототип дочернего конструктора
Dog.prototype.bark = function() {
  console.log('Woof!');
};

// Создание экземпляра дочернего объекта
const myDog = new Dog('Buddy', 'Golden Retriever');

// Использование наследованных методов
myDog.makeSound();  // Вывод: Some generic sound
myDog.bark();       // Вывод: Woof!

```

## Реализация прототипного полиморфизма

Полиморфизм в JavaScript реализуется через возможность объектов иметь одинаковые методы, но предоставлять различную реализацию этих методов.

```javascript
// Родительский конструктор
function Shape() {}

// Добавление метода в прототип родительского конструктора
Shape.prototype.draw = function() {
  console.log('Drawing a shape');
};

// Дочерний конструктор
function Circle(radius) {
  Shape.call(this);
  this.radius = radius;
}

// Наследование от родительского прототипа
Circle.prototype = Object.create(Shape.prototype);

// Переопределение метода для реализации полиморфизма
Circle.prototype.draw = function() {
  console.log('Drawing a circle with radius ' + this.radius);
};

// Другой дочерний конструктор
function Square(side) {
  Shape.call(this);  
  this.side = side;
}

// Наследование от родительского прототипа
Square.prototype = Object.create(Shape.prototype);

// Переопределение метода для реализации полиморфизма
Square.prototype.draw = function() {
  console.log('Drawing a square with side ' + this.side);
};

// Создание экземпляров объектов
const circle = new Circle(5);
const square = new Square(4);

// Использование полиморфизма
circle.draw();  // Вывод: Drawing a circle with radius 5
square.draw();  // Вывод: Drawing a square with side 4

```

## Реализация механизма инкапсуляции

В JavaScript инкапсуляция обычно достигается с использованием замыканий и приватных свойств. Приватные переменные и методы хранятся внутри замыкания, что делает их недоступными извне.

```javascript
// Родительский конструктор
function Counter() {
  // Приватная переменная
  let count = 0;

  // Приватный метод
  function increment() {
    count++;
  }

  // Публичный метод с доступом к приватному методу
  this.getCount = function() {
    increment(); // Приватный метод доступен извне
    return count;
  };
}

// Создание экземпляра объекта
const counter = new Counter();

// Использование метода с инкапсулированным состоянием
console.log(counter.getCount());  // Вывод: 1
console.log(counter.getCount());  // Вывод: 2

```

## ООП (ES6+)

Стандарт ECMAScript 2015 (ES6) и более поздние версии ввели синтаксис для создания классов в JavaScript, что упростило работу с ООП. Классы предоставляют более читаемый и удобный синтаксис для создания объектов и использования наследования. Это лишь синтаксический сахар, _**механизм ООП, основанный на прототипах, никуда не делся**_. Этот способ работы с концепциями является более предпочтительным и рекомендуемым на данный момент.

В ECMAScript 6 (ES6) были введены новые ключевый слова, одни из которых `class`, `extends`, `super`, которые предоставляют более удобный и явный синтаксис для создания объектно-ориентированных структур в JavaScript.

### Определение класса

```javascript
class Animal {
  // Конструктор — выполняется при создании экземпляра класса
  constructor(name) {
    this.name = name;
  }

  // Метод класса
  makeSound() {
    console.log('Some generic sound');
  }
}

const myDog = new Animal('Buddy');

```

### Реализация наследования (ES6+)

Ключевое слово `extends` используется для создания подкласса (дочернего класса), который наследует свойства и методы от другого класса (родительского класса). Ключевое слово `super` используется внутри дочернего класса для вызова конструктора родительского класса или для вызова методов родительского класса.

```javascript
class Dog extends Animal {
  constructor(name, breed) {
    // Вызов конструктора родителя
    super(name);
    this.breed = breed;
  }

  // Переопределение метода родителя
  makeSound() {
    console.log('Woof!');
  }

  // Новый метод дочернего класса
  bark() {
    console.log('Barking!');
  }
}


const myDog = new Dog('Buddy', 'Golden Retriever');
myDog.makeSound();  // Вывод: Woof!
myDog.bark();       // Вывод: Barking!
```

### Реализация полиморфизма (ES6+)

```javascript
class Shape {
  constructor() {
    // Общий конструктор для всех фигур
  }

  // Общий метод для всех фигур
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

  // Переопределение метода getArea для круга
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

  // Переопределение метода getArea для прямоугольника
  getArea() {
    const area = this.width * this.height;
    console.log(`Area of the rectangle: ${area}`);
    return area;
  }
}

// Функция, использующая полиморфизм
function printArea(shape) {
  shape.getArea();
}

// Создание экземпляров разных классов
const circle = new Circle(5);
const rectangle = new Rectangle(4, 6);

// Вызов функции с использованием полиморфизма
printArea(circle);      // Вывод: Area of the circle: 78.54
printArea(rectangle);   // Вывод: Area of the rectangle: 24
printArea(new Shape()); // Вывод: Undefined area

```

В данном примере `Circle` и `Rectangle` являются дочерними классами от `Shape`, переопределяя метод `getArea`. Функция `printArea` принимает объект типа `Shape` и вызывает его метод `getArea`, что демонстрирует полиморфизм.

### Релизация инкапсуляции ES6+

Как уже говорилось, в JavaScript инкапсуляция часто достигается с использованием замыканий.

Символ `#` говорит о приватном поле или методе. Но эта возможность была добавлена в язык недавно. В движках JavaScript пока _**не поддерживается или поддерживается частично**_, нужен полифил.

```javascript
class Counter {
  #count = 0; // Приватное поле класса

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
    return typeof(this.#count) === 'number';
  }
}

const counter = new Counter();

counter.increment();
counter.increment();
counter.decrement();

console.log(counter.getCount()); // Вывод: 2
console.log(counter.#count);      // Ошибка (приватное поле не доступно извне)

```

Однако можно эмулировать приватные методы.

```javascript
class MyClass {
  constructor() {
    // Приватная функция, замкнутая в конструкторе
    const privateMethod = () => {
      console.log('This is a private method');
    };

    // Публичный метод, имеющий доступ к приватному методу
    this.publicMethod = () => {
      privateMethod();
      console.log('This is a public method');
    };
  }
}

const instance = new MyClass();
instance.publicMethod(); // Вывод: This is a private method, This is a public method
instance.privateMethod(); // Ошибка (приватный метод не доступен извне)
```

В примере выше, `privateMethod` является замкнутой функцией внутри конструктора MyClass. Она доступна только внутри экземпляров класса и не может быть вызвана извне. Однако важно отметить, что это _**не является строго приватным методом**_, а скорее соглашением о том, что метод не должен вызываться извне класса. Реальная защита от вызова таких «приватных» методов основывается на соглашениях и силе сообщества, а не на механизмах языка.

### Геттеры и сеттеры

**_Геттеры и сеттеры_** — это специальные методы в объекте или классе, предназначенные для чтения (геттер) и записи (сеттер) значений свойств. В ES6+ они могут быть использованы как для обычных объектов, так и для классов.

```javascript
const person = {
  firstName: 'John',
  lastName: 'Doe',

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
};

console.log(person.fullName); // Вывод: John Doe
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
console.log(person.fullName); // Вывод: Jane Smith

```

### Статические поля и методы

Статические поля и методы принадлежат классу, а не экземпляру. Они объявляются с использованием ключевого слова `static`.

```javascript
class MathOperations {
  static PI = 3.14;
}

console.log(MathOperations.PI); // Вывод: 3.14

class MathOperations {
  static square(x) {
    return x * x;
  }
}

console.log(MathOperations.square(5)); // Вывод: 25


```

Если мы собираемся использовать статическую перменную внутри функции класса, то **_функция обязана быть статической_**.

```javascript
class Counter {
  static count = 0; // Статическая переменная

  static increment() {
    Counter.count++;
  }

  static getCount() {
    return Counter.count;
  }
}

Counter.increment();
Counter.increment();
console.log(Counter.getCount()); // Вывод: 2

```