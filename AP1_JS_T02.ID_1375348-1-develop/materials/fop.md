# Functional Programming Approach in JavaScript

**_Functional programming_** (FP) in JavaScript is a programming paradigm that emphasizes working with functions — passing them as arguments, returning them from other functions, and composing them to build logic. JavaScript is a multiparadigm language, and functional programming can be effectively applied within it. The following concepts form the basis of functional programming in JavaScript:

## First-Class Functions

**_First-class functions_** in JavaScript are treated as first-class objects. This means they can be assigned to variables, passed as arguments to other functions, and returned from functions.

```javascript
// Assigning a function to a variable
const add = function(a, b) {
  return a + b;
};

// Passing a function as an argument
function operate(a, b, operation) {
  return operation(a, b);
}

console.log(operate(2, 3, add)); // Outputs: 5
```

## Higher-Order Functions

**_Higher-order functions_** are functions that either take other functions as arguments or return functions as results.

```javascript
// Higher-order function
function multiplyBy(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = multiplyBy(2);
console.log(double(5)); // Outputs: 10
```

## Pure Functions

**_Pure functions_** return results solely based on their input parameters and do not depend on or alter external state. This makes them predictable and easier to test.

```javascript
// Pure function
function add(a, b) {
  return a + b;
}

 ```

## Closures

A **_closure_** is a mechanism that allows a function to retain access to variables from its lexical scope even after that scope has finished executing.

```javascript
function counter() {
  let count = 0;

  return function() {
    count++;
    console.log(count);
  };
}

const increment = counter();
increment(); // Output: 1
increment(); // Output: 2
```

## Immutability

Immutability encourages avoiding data mutation. Instead of modifying existing data, new versions are created. This helps reduce side effects and makes code easier to debug and reason about.

```javascript
// Not recommended
let mutableArray = [1, 2, 3];
mutableArray.push(4);

// Recommended
const immutableArray = [1, 2, 3];
const newArray = [...immutableArray, 4];
```