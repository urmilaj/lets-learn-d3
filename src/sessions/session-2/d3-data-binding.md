---
title: D3 data binding
---

# D3 data binding

**Data binding** is D3's superpower! It's how you connect your data (like numbers in an array) to visual elements on your page (like circles or rectangles). Instead of manually creating elements one by one, D3 can automatically create, update, or remove elements based on your data.

---

## Binding Your Data

The `.data()` method is the **essential step** that attaches your data array to a selection. This is always needed for data binding!

**Basic concept:**
```
const numbers = [10, 20, 30];

d3.select("svg") // this assumes you already have an svg element with width and height in your html
  .selectAll("circle")
  .data(numbers)  // Bind the data - this step is essential!
```

**What `.data()` does:**
- Attaches each data point to elements in your selection
- D3 tries to match each data point to an existing element
- Sets up the relationship between data and DOM elements

---

## Creating Elements

The `.join()` method is the **simple way** to create, update, and remove elements based on your bound data.

**Basic concept:**
```
const numbers = [10, 20, 30];

d3.select("svg") // this assumes you already have an svg element with width and height in your html
  .selectAll("circle")
  .data(numbers)      // Step 1: Bind data
  .join("circle")     // Step 2: Create circles for the data
    .attr("r", d => d);  // Use data to set radius
```

**Why `.join()` is great:**
- ✅ Automatically creates elements for new data
- ✅ Updates existing elements
- ✅ Removes elements when data is removed


### Key Concept: The `d` Parameter
When you bind data, D3 gives you access to each data point through a function parameter (usually called d):

```
const data = [5, 10, 15, 20];

d3.selectAll("circle")
  .data(data)
  .join("circle")
  .attr("r", d => d)  // 'd' is each number: 5, then 10, then 15, then 20
  .attr("fill", d => d > 10 ? "red" : "blue");  // Use data to make decisions!

```

**What `d` represents:**
- First circle: `d = 5`
- Second circle: `d = 10`
- Third circle: `d = 15`
- Fourth circle: `d = 20`

---

## Select then bind

You need to **FIRST** select or selectAll the shape (eg: circle, rect, line) you would like to create, join your data, then use join. <br>
**Key takeaway** - `.selectAll() -> .data() --> .join()`

### Wait... Selecting Elements That Don't Exist Yet?

This might seem strange at first: **Why do we `.selectAll("circle")` when there are no circles yet?** 

This is one of D3's unique patterns! Here's what's happening:

```javascript
d3.select("svg") // this assumes you already have an svg element with width and height in your html
  .selectAll("circle")  // 🤔 No circles exist yet - this is an empty selection
  .data(numbers)        // Bind data to this empty selection
  .join("circle")       // NOW create the circles!
```

**Think of it like this:**
1. `.selectAll("circle")` creates an **empty placeholder** for circles
2. `.data()` says "I have 3 data points that need circles"
3. `.join("circle")` says "Okay, let me create 3 circles to match those data points!"

**Why this pattern?**
- D3 needs to know **what type of element** you want to create
- By selecting first, you're telling D3: "I want to work with circles"
- Then `.join()` knows to create `<circle>` elements (not rectangles, not text, etc.)

**Bottom line:** It's okay that nothing exists yet! This is the standard D3 pattern for creating new elements from data.

---

## Interactive Playground

Try it yourself! Enter comma-separated numbers to create circles with those radii:

```js
const circleData = view(
  Inputs.text({
    label: "Enter circle radii (comma-separated):",
    value: "5, 50, 150, 10, 80, 100, 10"
  })
)
```

```js
htl.svg`<svg width="800" height="350">
  <g>
    ${Plot.dot(circleData.split(",").map(d => parseFloat(d.trim())), {x:(d,i) => i*10, r:d=>d, fill:d=>d>25?'rebeccaPurple':'orange'}).plot({margin: 20, width: 800, height: 350, x: {axis: null}, y: {axis: null}, r: {range: [5, 50]}})}
  </g>
</svg>`
```

```js
const data = circleData.split(",").map(d => parseFloat(d.trim())).filter(d => !isNaN(d));
```

```js
html`<div style="margin-top: 20px;">
  <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
    <strong>Generated D3 Code:</strong>
    <pre style="margin-top: 10px; background: white; padding: 15px; border-radius: 3px; overflow-x: auto;"><code>const data = [${data.join(", ")}];

d3.select("svg")
  .selectAll("circle")
  .data(data)
  .join("circle")
    .attr("cx", (d, i) => 50 + i * 80)
    .attr("cy", 175)
    .attr("r", d => d)
    .attr("fill", d => d > 25 ? "rebeccaPurple" : "orange");</code></pre>
  </div>
</div>`
```

**Try these experiments:**
- Change the numbers to see different sized circles
- Add more numbers (separated by commas) to create more circles
- Remove numbers to see circles disappear
- Notice how circles larger than 25 are purple, smaller ones are orange!

---

## Practice Exercises

Now it's time to practice! Work through these exercises to master data binding with D3.

### 🟢 Exercise 1: Simple Number Array with Rectangles

Create rectangles from an array of numbers. Each number represents the height of a rectangle.

<details>
<summary>✅ Solution</summary>

```
const heights = [20, 40, 60, 80, 30];

d3.select("svg")
  .selectAll("rect")
  .data(heights)
  .join("rect")
    .attr("x", (d, i) => i * 50)
    .attr("y", d => 100 - d)
    .attr("width", 40)
    .attr("height", d => d)
    .attr("fill", "steelblue");
```

</details>

---

### 🟢 Exercise 2: Array of Strings

Create text elements from an array of fruit names.

<details>
<summary>✅ Solution</summary>

```
const fruits = ["🍎", "🍊", "🍋", "🍇", "🍓"];

d3.select("svg")
  .selectAll("text")
  .data(fruits)
  .join("text")
    .attr("x", (d, i) => 20 + i * 70)
    .attr("y", 35)
    .attr("font-size", 30)
    .text(d => d);
```

</details>

---

### 🟡 Exercise 3: Array of Objects

Create circles from an array of objects where each object has `x`, `y`, and `radius` properties.

<details>
<summary>✅ Solution</summary>

```
const points = [
  { x: 50, y: 50, radius: 10 },
  { x: 100, y: 80, radius: 20 },
  { x: 150, y: 40, radius: 15 },
  { x: 200, y: 70, radius: 25 }
];

d3.select("svg")
  .selectAll("circle")
  .data(points)
  .join("circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", d => d.radius)
    .attr("fill", "coral")
    .attr("opacity", 0.7);
```

</details>

---

### 🟡 Exercise 4: Mixed Data - Create a Bar Chart

Create a bar chart from an array of objects representing sales data.

<details>
<summary>✅ Solution</summary>

```
const sales = [
  { product: "Laptop", amount: 1200 },
  { product: "Phone", amount: 800 },
  { product: "Tablet", amount: 500 },
  { product: "Watch", amount: 300 }
];

const svg = d3.select("svg");

// Create bars
svg.selectAll("rect")
  .data(sales)
  .join("rect")
    .attr("x", 80)
    .attr("y", (d, i) => i * 40 + 10)
    .attr("width", d => d.amount / 5)
    .attr("height", 30)
    .attr("fill", "steelblue");

// Create labels
svg.selectAll("text")
  .data(sales)
  .join("text")
    .attr("x", 5)
    .attr("y", (d, i) => i * 40 + 30)
    .attr("font-size", 14)
    .text(d => d.product);
```

</details>


<style>
    * {
        font-family: sans-serif;
    }
</style>