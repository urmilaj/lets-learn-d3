---
title: Basic JavaScript
---

### Web Development Basics: JavaScript

JavaScript, created in 1995 by Brendan Eich, adds interactivity to web pages. D3.js is built with JavaScript to dynamically create, manipulate, and animate data visualizations.

---

## What is JavaScript?

JavaScript is a programming language that brings websites to life. While HTML creates structure and CSS adds styling, JavaScript adds behavior and interactivity.

Think of it like this:
- HTML is the skeleton
- CSS is the appearance
- JavaScript is the actions and reactions

---

## Console

 1. Console.log (Your Best Friend)

The **console** is a tool that lets you see messages and test code. It's like a notebook for developers.

```
console.log("Hello, World!");
console.log(123);
console.log("The answer is:", 42);
```

**To see the console:**
- Press `F12` in your browser
- Click on the **Console** tab
- You'll see your messages there!

---

## Comments

Comments are notes for yourself (or other programmers). JavaScript ignores them.

```
// This is a single-line comment

/* This is a
   multi-line comment */

console.log("This code runs"); 
// console.log("This comment doesn't run") This comment doesn't run
```

---

## Variables

Variables (storing information) are like labeled boxes where you store information to use later.

Creating Variables

```
// let: for variables that can change
let age = 25;
let name = "Alice";

// const: for variables that DON'T change
const PI = 3.14159;
const birthYear = 1998;

// var: old way (try to avoid)
var oldVariable = "outdated";
```

**Use:**
- `let` when the value might change
- `const` when the value stays the same

 Variable Naming Rules:

✅ **Valid:**
```
let userName = "John";
let user_name = "John";
let userName2 = "John";
let $price = 99;
```

❌ **Invalid:**
```
let 2userName = "John";    // Can't start with number
let user-name = "John";     // Can't use hyphens
let let = "John";           // Can't use reserved words
```

**Convention:** Use camelCase (first word lowercase, rest uppercase)

---

## Data Types

JavaScript has different types of data:

 **1. Numbers**

```
let age = 30;
let price = 19.99;
let negative = -5;
```

 **2. Strings (Text)**

```
let name = "Alice";
let message = 'Hello, World!';
let sentence = "She said, 'Hello!'";
let age = '30';

// Combining strings (concatenation)
let greeting = "Hello, " + name + "!";  // "Hello, Alice!"

// Template literals (modern way)
let greeting2 = `Hello, ${name}!`;      // "Hello, Alice!"
```

**Note:** Template literals use backticks (`` ` ``) and `${}` to insert variables

 **3. Booleans (True/False)**

```
let isStudent = true;
let hasLicense = false;
let isAdult = age >= 18;  // true if age is 18 or more
```

 **4. Arrays (Lists)**

```
let fruits = ["apple", "banana", "orange"];
let numbers = [1, 2, 3, 4, 5];
let mixed = ["text", 42, true];

// Accessing items (counting starts at 0!)
console.log(fruits[0]);  // "apple"
console.log(fruits[1]);  // "banana"
console.log(fruits[2]);  // "orange"

// Array properties and methods
console.log(fruits.length);      // 3 (how many items)
fruits.push("grape");            // Add to end
fruits.pop();                    // Remove from end
```

**Remember:** Array indexes start at 0, not 1!

 **5. Objects (Collections of Properties)**

```
let person = {
    name: "Alice",
    age: 25,
    isStudent: true,
    city: "New York"
};

// Accessing properties (two ways)
console.log(person.name);        // "Alice"
console.log(person["age"]);      // 25

// Adding or changing properties
person.job = "Developer";        // Add new property
person.age = 26;                 // Change existing property
```

Think of objects like real-world objects - a person has a name, age, etc.

---

## Operators

Operators are symbols that perform operations on values and variables. Think of them as the mathematical and logical tools that let you calculate, compare, and combine data in your programs.

**Arithmetic Operators**

```
let a = 10;
let b = 3;

console.log(a + b);   // 13 (addition)
console.log(a - b);   // 7  (subtraction)
console.log(a * b);   // 30 (multiplication)
console.log(a / b);   // 3.333... (division)
console.log(a % b);   // 1  (remainder/modulo)

// Increment/Decrement
let count = 5;
count++;              // count = count + 1 (now 6)
count--;              // count = count - 1 (now 5)
```

**Comparison Operators**

```
let x = 5;
let y = 10;

console.log(x == y);   // false (equal value)
console.log(x != y);   // true  (not equal)
console.log(x === y);  // false (equal value AND type)
console.log(x !== y);  // true  (not equal value OR type)
console.log(x < y);    // true  (less than)
console.log(x > y);    // false (greater than)
console.log(x <= y);   // true  (less than or equal)
console.log(x >= y);   // false (greater than or equal)
```

**Important:** Use `===` (strict equality) instead of `==` to avoid surprises!

**Logical Operators**

```
let age = 20;
let hasID = true;

// AND (&&): Both must be true
console.log(age >= 18 && hasID);     // true

// OR (||): At least one must be true
console.log(age >= 18 || hasID);     // true

// NOT (!): Flips true to false or false to true
console.log(!hasID);                 // false
```

---


## Conditional Statements

Conditional statements let your code make decisions based on conditions. Think of them as "if this is true, then do that" instructions. They're how programs choose different actions depending on the situation, just like you decide whether to bring an umbrella based on whether it's raining.

If Statements

```
let age = 18;

if (age >= 18) {
    console.log("You are an adult");
}

// If-Else
if (age >= 18) {
    console.log("You can vote");
} else {
    console.log("You cannot vote yet");
}

// If-Else If-Else
let score = 85;

if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B");
} else if (score >= 70) {
    console.log("Grade: C");
} else {
    console.log("Grade: F");
}
```

**How it works:**
1. JavaScript checks the first condition
2. If it's true, it runs that code block and stops
3. If it's false, it moves to the next condition
4. `else` is the "if nothing else worked" option

---

## Loops

Loops let you repeat code multiple times without writing it over and over. Think of them as instructions that say "do this action X times" or "keep doing this until something changes." They're essential for working with lists of data, which is exactly what you'll do constantly in D3 visualizations.


**For Loop** (when you know how many times to repeat)

```
// Print numbers 0 to 4
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// Breaking it down:
// let i = 0       - Start with i at 0
// i < 5           - Keep going while i is less than 5
// i++             - Add 1 to i after each loop
```

**Output:**
```
0
1
2
3
4
```

Looping Through Arrays

```
let fruits = ["apple", "banana", "orange"];

// Method 1: For loop
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

// Method 2: For...of loop (easier!)
for (let fruit of fruits) {
    console.log(fruit);
}
```

**While Loop** (keep going while condition is true)

```
let count = 0;

while (count < 5) {
    console.log(count);
    count++;
}
```

**Be careful!** Make sure your condition eventually becomes false, or you'll create an infinite loop!

---

## Functions
Functions are like recipes - you define them once, then use them many times.

**Basic Function**

```
// Define the function
function greet() {
    console.log("Hello!");
}

// Use the function (called "calling" or "invoking")
greet();  // Prints: Hello!
greet();  // Prints: Hello! again
```

**Functions with Parameters** (Inputs)

```
function greetPerson(name) {
    console.log("Hello, " + name + "!");
}

greetPerson("Alice");  // Hello, Alice!
greetPerson("Bob");    // Hello, Bob!
```

`name` is a **parameter** - a variable that receives a value when you call the function.

**Functions that Return Values**

```
function add(a, b) {
    return a + b;
}

let result = add(5, 3);
console.log(result);  // 8

// Use directly
console.log(add(10, 20));  // 30
```

The `return` keyword sends a value back when the function is called.

**Arrow Functions** (Modern Shorter Syntax)

```
// Traditional function
function add(a, b) {
    return a + b;
}

// Arrow function (does the same thing)
const add = (a, b) => {
    return a + b;
};

// Even shorter (if just one return statement)
const add = (a, b) => a + b;
```

---

## Document Object Model

The **DOM** is how JavaScript interacts with your HTML. Think of it as a bridge between JavaScript and your webpage.

**Selecting Elements**

```
// By ID
let header = document.getElementById("header");

// By class name (gets all elements with that class)
let boxes = document.getElementsByClassName("box");

// By tag name
let paragraphs = document.getElementsByTagName("p");

// Modern way (recommended)
let header = document.querySelector("header");        // First match
let boxes = document.querySelectorAll(".box");         // All matches
```

**Changing Content**

```
// Change text
let heading = document.querySelector("h1");
heading.textContent = "New Heading!";

// Change HTML
let div = document.querySelector("myDiv");
div.innerHTML = "<p>New <strong>content</strong>!</p>";
```

**Changing Styles**

```
let box = document.querySelector(".box");

// Change one style
box.style.color = "red";
box.style.backgroundColor = "yellow";
box.style.fontSize = "20px";

// Note: CSS properties with hyphens become camelCase
// background-color → backgroundColor
// font-size → fontSize
```

**Adding/Removing Classes**

```
let button = document.querySelector("myButton");

button.classList.add("active");       // Add a class
button.classList.remove("hidden");    // Remove a class
button.classList.toggle("highlight"); // Add if missing, remove if present
```

**Creating and Adding Elements**

```
// Create a new element
let newParagraph = document.createElement("p");
newParagraph.textContent = "This is a new paragraph!";

// Add it to the page
let container = document.querySelector("container");
container.appendChild(newParagraph);
```

---

**Events** (Responding to User Actions)

Events are things that happen on your webpage - clicks, mouse movements, key presses, etc.

 Click Events

```
let button = document.querySelector("myButton");

button.addEventListener("click", function() {
    console.log("Button was clicked!");
});

// Or with an arrow function
button.addEventListener("click", () => {
    console.log("Button was clicked!");
});
```

**Common Events**

```
let input = document.querySelector("myInput");

// When user types
input.addEventListener("input", () => {
    console.log("User is typing:", input.value);
});

// When user focuses on input
input.addEventListener("focus", () => {
    console.log("Input is focused");
});

// When user clicks away
input.addEventListener("blur", () => {
    console.log("Input lost focus");
});

// When mouse moves over element
let box = document.querySelector(".box");
box.addEventListener("mouseenter", () => {
    console.log("Mouse entered the box");
});

box.addEventListener("mouseleave", () => {
    console.log("Mouse left the box");
});
```

## Additional Resources

1. Codeacademy: Learn JavaScript: Fundamentals - https://www.codecademy.com/learn/learn-javascript-fundamentals
2. JavaScript.info - https://javascript.info/
3. Eloquent JavaScript (free book) - https://eloquentjavascript.net/
4. MDN JavaScript Guide - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide

---

<style>
    * {
        font-family: sans-serif;
    }
</style>