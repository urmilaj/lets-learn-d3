---
title: D3 scales
---

# D3 scales

**Scales** are one of D3's most important concepts. They help you translate your data values into visual properties like position, size, and color.

Think of a scale as a **translator** or **converter**:
- Your data might be numbers like `[1, 50, 100]`
- But your SVG canvas might be 500 pixels wide
- A scale helps you convert data values into pixel positions

Scales are the bridge between your **data world** and your **visual world**:

```
Data World              Scale               Visual World
-----------            -------             -------------
0 to 100       →  [scaleLinear]   →      0px to 500px
"Mon", "Tue"   →  [scaleOrdinal]  →      "red", "blue", "green"
Date objects   →  [scaleTime]     →      0px to 500px
```

---

## Scales importance 

Why Are Scales Important? Without scales, you'd need to manually calculate positions and sizes:

```
// ❌ Without scales - manual math is tedious and error-prone
const data = [10, 50, 100, 200];

svg.selectAll("circle")
  .data(data)
  .join("circle")
    .attr("cx", (d, i) => i * 100)  // Hardcoded spacing
    .attr("r", d => d / 4);         // Manual size calculation
```

With scales, D3 does the math for you.

---

## Types of D3 Scales

D3 offers different types of scales for different types of data. We'll focus on three essential ones:

### 1. **scaleLinear** - For Continuous Numbers

Use when your data is **linear** i.e **continuous numerical values** (like temperatures, prices, ages).

```
const linearScale = d3.scaleLinear()
```

**Examples:**
- Converting temperatures to bar heights
- Mapping ages to circle sizes
- Positioning points on a line chart


### 2. **scaleOrdinal** - For Categories

Use when your data is **categorical** (like names, groups).

```
const ordinalScale = d3.scaleOrdinal()
```

**Examples:**
- Assigning colors to different categories
- Mapping product names to colors
- Assigning patterns to groups


### 3. **scaleTime** - For Dates

Use when your data is **dates or time values**.

```
const timeScale = d3.scaleTime()
```

**Examples:**
- Creating timelines
- Plotting time-series data
- X-axis for date-based charts

### Quick Comparison

| Scale Type | Data Type | Example Input | Example Output |
|------------|-----------|---------------|----------------|
| `scaleLinear` | Continuous numbers | `0, 50, 100` | `0px, 250px, 500px` |
| `scaleOrdinal` | Categories | `"Mon", "Tue"` | `"red", "blue"` |
| `scaleTime` | Dates | `new Date(2024, 0, 1)` | `0px, 300px, 600px` |

---

## How to Create a D3 Scale

Every D3 scale has two essential parts: **domain** and **range**.

### The Basic Syntax

```
const myScale = d3.scaleLinear()
  .domain([minData, maxData])    // Input: your data values
  .range([minPixels, maxPixels]); // Output: visual values (pixels, colors, etc.)
```

### Understanding Domain and Range

**`.domain()`** - The input side (your data world)
- Defines the minimum and maximum values in your data
- Example: `[0, 100]` means your data goes from 0 to 100

**`.range()`** - The output side (your visual world)  
- Defines the minimum and maximum visual values
- Example: `[0, 500]` means map to pixels from 0 to 500

### How It Works

```
// Create a scale
const xScale = d3.scaleLinear()
  .domain([0, 100])   // Data ranges from 0 to 100
  .range([0, 500]);   // Map to 0 to 500 pixels

// Use the scale to convert data to pixels
xScale(0);    // Returns: 0 pixels
xScale(50);   // Returns: 250 pixels (middle)
xScale(100);  // Returns: 500 pixels
xScale(25);   // Returns: 125 pixels
```

---

## scaleLinear Interactive playground

**scaleLinear** - For Continuous Numbers

```
const scale = d3.scaleLinear()
  .domain([0, 100])      // Data: 0 to 100
  .range([0, 500]);      // Pixels: 0 to 500
```

**Examples:**
- Converting temperatures to bar heights
- Mapping ages to circle sizes
- Positioning points on a line chart

Move the slider to see how the scale converts data values to pixel positions!

```js
const circleData = view(Inputs.range([0, 50], {label: 'Circle Data Value', step: 1, value: 25}));
```

```js echo
const circleXscale = d3.scaleLinear()
  .domain([0, 50])    // Data: 0 to 50
  .range([50, 750]);  // Pixels: 50 to 750 (with padding)
```

```js
html`<div style="background: #f9f9f9; padding: 0px;">
  <div style="font-family: monospace; margin-bottom: 15px; padding: 10px;">
    <strong>Scale Translation:</strong><br/>
    <span style="color: #0066cc;">Data Value: ${circleData}</span> 
    → 
    <span style="color: #cc0066;">Pixel Position: ${Math.round(circleXscale(circleData))}px</span>
  </div>
  
  <svg width="800" height="300" style="background-color: #f5f5f5; border: 2px solid #333;">
    <!-- Domain labels -->
    <text x="50" y="30" text-anchor="middle" font-size="12" fill="#0066cc">Data: 0</text>
    <text x="400" y="30" text-anchor="middle" font-size="12" fill="#0066cc">Data: 25</text>
    <text x="750" y="30" text-anchor="middle" font-size="12" fill="#0066cc">Data: 50</text>
    
    <!-- Range labels -->
    <text x="50" y="280" text-anchor="middle" font-size="12" fill="#cc0066">Pixel: 50</text>
    <text x="400" y="280" text-anchor="middle" font-size="12" fill="#cc0066">Pixel: 400</text>
    <text x="750" y="280" text-anchor="middle" font-size="12" fill="#cc0066">Pixel: 750</text>
    
    <!-- SVG dimensions -->
    <text x="10" y="150" font-size="11" fill="#666">SVG Height: 300px</text>
    <text x="350" y="15" font-size="11" fill="#666">SVG Width: 800px</text>
    
    <!-- Vertical line showing current position -->
    <line x1="${circleXscale(circleData)}" y1="50" 
          x2="${circleXscale(circleData)}" y2="250" 
          stroke="#cc0066" stroke-width="2" stroke-dasharray="5,5" opacity="0.5"/>
    
    <!-- The circle -->
    <circle cx="${circleXscale(circleData)}" cy="150" r="15" 
            fill="#0066cc" stroke="black" stroke-width="2"/>

    <text x="${circleXscale(circleData)}" y="80" text-anchor="middle" 
          font-size="14" font-weight="bold" fill="#cc0066">
      Data: ${circleData}
    </text>
    
    <!-- Current position label -->
    <text x="${circleXscale(circleData)}" y="200" text-anchor="middle" 
          font-size="14" font-weight="bold" fill="#cc0066">
      ${Math.round(circleXscale(circleData))}px
    </text>
  </svg>
</div>`
```

**What's happening:**
- **Blue text** shows the data domain (0 to 50)
- **Pink text** shows the pixel range (50 to 750)
- The dotted line shows where your data value maps to
- The circle moves as you change the slider!

**Key Concept:** Once you create a scale, you use it like a function - pass in a data value, get back a visual value!

---

## scaleOrdinal Interactive playground

**scaleOrdinal** - For Categories

Use when your data is **categorical** (like names, groups).

```
const colorScale = d3.scaleOrdinal()
  .domain(["A", "D", "Tony", "Wendy", "Krishna"])
  .range(["red", "blue", "green", "orange", "purple"]);
```

**Examples:**
- Assigning colors to different categories
- Mapping product names to colors
- Assigning patterns to groups

Select a category to see how the scale maps it to a color!

```
const categories = ["A", "D", "Tony", "Wendy", "Krishna"];
```

```js
const categories = ["A", "D", "Tony", "Wendy", "Krishna"];
const selectedCategory = view(Inputs.select(categories, {label: 'Select Category', value: "Cherry"}));
```

```js echo
const categoryColorScale = d3.scaleOrdinal()
  .domain(categories)
  .range(["red", "blue", "green", "orange", "purple"]);
```

```js
// Generate consistent positions for text elements using a simple hash
const textData = [];
categories.forEach((cat, catIndex) => {
  const count = 10; // Fixed count for consistency
  for (let i = 0; i < count; i++) {
    // Use category index and item index to generate consistent positions
    const seed = catIndex * 100 + i;
    textData.push({
      category: cat,
      x: 50 + ((seed * 7919) % 700), // Use prime number for better distribution
      y: 80 + ((seed * 7901) % 180)
    });
  }
});

const svgScaleOrdinal = d3.create("svg")
  .attr("width", 800)
  .attr("height", 300)
  .style("background-color", "#f5f5f5")
  .style("border", "2px solid #333");

// Title
svgScaleOrdinal.append("text")
  .attr("x", 400)
  .attr("y", 30)
  .attr("text-anchor", "middle")
  .attr("font-size", 14)
  .attr("fill", "#666")
  .attr("font-weight", "bold")
  .text("Scatter Plot: Categories mapped to Colors");

// Legend
const legend = svgScaleOrdinal.append("g")
  .attr("transform", "translate(20, 270)");

categories.forEach((cat, i) => {
  const legendItem = legend.append("g")
    .attr("transform", `translate(${i * 120}, 0)`);
  
  legendItem.append("circle")
    .attr("r", 5)
    .attr("fill", categoryColorScale(cat));
  
  legendItem.append("text")
    .attr("x", 10)
    .attr("y", 5)
    .attr("font-size", 11)
    .text(`${cat} (${categoryColorScale(cat)})`);
});

// Draw all text elements
svgScaleOrdinal.selectAll("text.scatter")
  .data(textData)
  .join("text")
  .attr("class", "scatter")
  .attr("x", d => d.x)
  .attr("y", d => d.y)
  .attr("text-anchor", "middle")
  .attr("font-size", d => d.category === selectedCategory ? 18 : 14)
  .attr("font-weight", d => d.category === selectedCategory ? "bold" : "normal")
  .attr("fill", d => d.category === selectedCategory ? categoryColorScale(d.category) : "#999")
  .attr("opacity", d => d.category === selectedCategory ? 1 : 0.3)
  .text(d => d.category);
```

<div style="background: #f9f9f9; padding: 0px;">
  <div style="font-family: monospace; margin-bottom: 15px; padding: 10px;">
    <strong>Scale Translation:</strong><br/>
    <span style="color: #0066cc;">Category: "${selectedCategory}"</span> 
    → 
    <span style="color: ${categoryColorScale(selectedCategory)};">Color: ${categoryColorScale(selectedCategory)}</span>
  </div>${svgScaleOrdinal.node()}</div>

**What's happening:**
- Each category word appears **10 times** scattered across the SVG
- When you select a category from the dropdown:
  - Selected words become **larger, bold, and colored** with their mapped color
  - Non-selected words are **small, gray, and faded** (30% opacity)
- The legend at the bottom shows the color mapping for each category
- Word positions stay consistent - they don't move when you change selections
- Try selecting different categories to see them highlight!

**Key Concept:** `scaleOrdinal` creates a one-to-one mapping between categories and values.

---


## scaleTime Interactive playground

**scaleTime** - For Dates

Use when your data is **dates or time values**.

```
const timeScale = d3.scaleTime()
  .domain([new Date(2024, 0, 1), new Date(2024, 11, 31)])  // Jan 1 to Dec 31, 2024
  .range([0, 600]);                                         // 600 pixels wide
```

**Examples:**
- Creating timelines
- Plotting time-series data
- X-axis for date-based charts

Move the slider to see how the scale converts dates to pixel positions!

```js
const monthValue = view(Inputs.range([0, 11], {label: 'Select Month (0 = Jan, 11 = Dec)', step: 1, value: 5}));
```

```js echo
const dateTimeScale = d3.scaleTime()
  .domain([new Date(2024, 0, 1), new Date(2024, 11, 31)])  // Jan 1 to Dec 31, 2024
  .range([50, 750]);  // Pixels: 50 to 750 (with padding)
```

```js
const selectedDate = new Date(2024, monthValue, 15); // 15th of selected month
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
```

```js
html`<div style="background: #f9f9f9; padding: 0px;">
  <div style="font-family: monospace; margin-bottom: 15px; padding: 10px;">
    <strong>Scale Translation:</strong><br/>
    <span style="color: #0066cc;">Date: ${monthNames[monthValue]} 15, 2024</span> 
    → 
    <span style="color: #cc0066;">Pixel Position: ${Math.round(dateTimeScale(selectedDate))}px</span>
  </div>
  
  <svg width="800" height="300" style="background-color: #f5f5f5; border: 2px solid #333;">
    <!-- Domain labels (months) -->
    <text x="50" y="30" text-anchor="middle" font-size="12" fill="#0066cc">Jan 1, 2024</text>
    <text x="400" y="30" text-anchor="middle" font-size="12" fill="#0066cc">Jun 30, 2024</text>
    <text x="750" y="30" text-anchor="middle" font-size="12" fill="#0066cc">Dec 31, 2024</text>
    
    <!-- Range labels -->
    <text x="50" y="280" text-anchor="middle" font-size="12" fill="#cc0066">Pixel: 50</text>
    <text x="400" y="280" text-anchor="middle" font-size="12" fill="#cc0066">Pixel: 400</text>
    <text x="750" y="280" text-anchor="middle" font-size="12" fill="#cc0066">Pixel: 750</text>
    
    <!-- SVG dimensions -->
    <text x="10" y="150" font-size="11" fill="#666">SVG Height: 300px</text>
    <text x="350" y="15" font-size="11" fill="#666">SVG Width: 800px</text>
    
    <!-- Month markers -->
    ${Array.from({length: 12}, (_, i) => {
      const date = new Date(2024, i, 15);
      const x = dateTimeScale(date);
      return `
        <circle cx="${x}" cy="150" r="4" fill="#999"/>
        <text x="${x}" y="135" text-anchor="middle" font-size="10" fill="#999">${monthNames[i]}</text>
      `;
    }).join('')}
    
    <!-- Vertical line showing current position -->
    <line x1="${dateTimeScale(selectedDate)}" y1="110" 
          x2="${dateTimeScale(selectedDate)}" y2="190" 
          stroke="#cc0066" stroke-width="2" stroke-dasharray="2,2" opacity="0.5"/>
    
    <!-- The circle -->
    <circle cx="${dateTimeScale(selectedDate)}" cy="150" r="15" 
            fill="#0066cc" stroke="black" stroke-width="2"/>

    <text x="${dateTimeScale(selectedDate)}" y="100" text-anchor="middle" 
          font-size="14" font-weight="bold" fill="#0066cc">
      ${monthNames[monthValue]} 15
    </text>
    
    <!-- Current position label -->
    <text x="${dateTimeScale(selectedDate)}" y="210" text-anchor="middle" 
          font-size="14" font-weight="bold" fill="#cc0066">
      ${Math.round(dateTimeScale(selectedDate))}px
    </text>
  </svg>
</div>`
```

**What's happening:**
- **Blue text** shows the date domain (Jan 1 to Dec 31, 2024)
- **Pink text** shows the pixel range (50 to 750)
- Small gray circles show each month along the timeline
- The dotted line shows where your selected date maps to
- The blue circle moves as you change the month!

**Key Concept:** `scaleTime` works just like `scaleLinear`, but it understands dates! It automatically handles the irregular spacing of months and can work with any time interval.

---

## Practice Exercises

<br>

### 🟢 Exercise 1: Temperature Bar Chart with scaleLinear

Create a bar chart showing temperatures for different cities. Use `scaleLinear` to convert temperatures to bar heights.

**Data:**
```js
const temperatures = [
  { city: "New York", temp: 72 },
  { city: "London", temp: 65 },
  { city: "Tokyo", temp: 78 },
  { city: "Mumbai", temp: 95 },
  { city: "Sydney", temp: 68 }
];
```

**Tasks:**
- Create a `scaleLinear` with domain `[0, 100]` (temperature range) and range `[0, 200]` (pixel height)
- Draw rectangles with heights based on the temperature
- Position bars at x: 50, 150, 250, 350, 450

<details>
<summary>✅ Solution</summary>

```
const temperatures = [
  { city: "New York", temp: 72 },
  { city: "London", temp: 65 },
  { city: "Tokyo", temp: 78 },
  { city: "Mumbai", temp: 95 },
  { city: "Sydney", temp: 68 }
];

// Create the scale
const tempScale = d3.scaleLinear()
  .domain([0, 100])
  .range([0, 200]);

const svg = d3.create("svg")
  .attr("width", 600)
  .attr("height", 250);

svg.selectAll("rect")
  .data(temperatures)
  .join("rect")
    .attr("x", (d, i) => 50 + i * 100)
    .attr("y", d => 250 - tempScale(d.temp) - 20)  // Flip for bottom-up bars
    .attr("width", 60)
    .attr("height", d => tempScale(d.temp))
    .attr("fill", "steelblue");

// Add city labels
svg.selectAll("text")
  .data(temperatures)
  .join("text")
    .attr("x", (d, i) => 80 + i * 100)
    .attr("y", 245)
    .attr("text-anchor", "middle")
    .attr("font-size", 12)
    .text(d => d.city);
```

</details>

---

### 🟢 Exercise 2: Category Colors with scaleOrdinal

Create circles for different fruit categories, each with a unique color using `scaleOrdinal`.

**Data:**
```js
const fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
```

**Tasks:**
- Create a `scaleOrdinal` with domain as fruit names and range as colors: `["#e74c3c", "#f39c12", "#e91e63", "#9b59b6", "#3498db"]`
- Draw 5 circles positioned at y: 100
- Use the scale to assign colors based on fruit names

<details>
<summary>✅ Solution</summary>

```
const fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

const fruitColorScale = d3.scaleOrdinal()
  .domain(fruits)
  .range(["#e74c3c", "#f39c12", "#e91e63", "#9b59b6", "#3498db"]);

const svg = d3.create("svg")
  .attr("width", 600)
  .attr("height", 200);

svg.selectAll("circle")
  .data(fruits)
  .join("circle")
    .attr("cx", (d, i) => 80 + i * 100)
    .attr("cy", 100)
    .attr("r", 30)
    .attr("fill", d => fruitColorScale(d));

// Add labels
svg.selectAll("text")
  .data(fruits)
  .join("text")
    .attr("x", (d, i) => 80 + i * 100)
    .attr("y", 160)
    .attr("text-anchor", "middle")
    .attr("font-size", 12)
    .text(d => d);
```

</details>

---

### 🟡 Exercise 3: Timeline with scaleTime

Create a timeline showing major events in 2024 using `scaleTime`.

**Data:**
```js
const events = [
  { date: new Date(2024, 0, 15), name: "New Year Event" },
  { date: new Date(2024, 3, 10), name: "Spring Festival" },
  { date: new Date(2024, 6, 4), name: "Summer Camp" },
  { date: new Date(2024, 9, 31), name: "Halloween" },
  { date: new Date(2024, 11, 25), name: "Christmas" }
];
```

**Tasks:**
- Create a `scaleTime` with domain from Jan 1, 2024 to Dec 31, 2024 and range `[50, 750]`
- Draw circles at positions based on event dates
- Add text labels for event names

<details>
<summary>✅ Solution</summary>

```
const events = [
  { date: new Date(2024, 0, 15), name: "New Year Event" },
  { date: new Date(2024, 3, 10), name: "Spring Festival" },
  { date: new Date(2024, 6, 4), name: "Summer Camp" },
  { date: new Date(2024, 9, 31), name: "Halloween" },
  { date: new Date(2024, 11, 25), name: "Christmas" }
];

const timelineScale = d3.scaleTime()
  .domain([new Date(2024, 0, 1), new Date(2024, 11, 31)])
  .range([50, 750]);

const svg = d3.create("svg")
  .attr("width", 800)
  .attr("height", 200);

// Timeline bar
svg.append("line")
  .attr("x1", 50)
  .attr("y1", 100)
  .attr("x2", 750)
  .attr("y2", 100)
  .attr("stroke", "#999")
  .attr("stroke-width", 2);

// Event circles
svg.selectAll("circle")
  .data(events)
  .join("circle")
    .attr("cx", d => timelineScale(d.date))
    .attr("cy", 100)
    .attr("r", 8)
    .attr("fill", "steelblue");

// Event labels
svg.selectAll("text")
  .data(events)
  .join("text")
    .attr("x", d => timelineScale(d.date))
    .attr("y", 130)
    .attr("text-anchor", "middle")
    .attr("font-size", 11)
    .text(d => d.name);
```

</details>

---

### 🟡 Exercise 4: Multi-Scale Scatter Plot

Create a scatter plot using both `scaleLinear` for positioning and `scaleOrdinal` for coloring.

**Data:**
```js
const students = [
  { name: "Alice", score: 85, grade: "A" },
  { name: "Bob", score: 72, grade: "B" },
  { name: "Charlie", score: 90, grade: "A" },
  { name: "Diana", score: 65, grade: "C" },
  { name: "Eve", score: 78, grade: "B" }
];
```

**Tasks:**
- Create a `scaleLinear` for scores (domain: `[0, 100]`, range: `[50, 450]`)
- Create a `scaleOrdinal` for grades (domain: `["A", "B", "C"]`, range: `["green", "orange", "red"]`)
- Draw circles positioned by score (x-axis) and colored by grade

<details>
<summary>✅ Solution</summary>

```
const students = [
  { name: "Alice", score: 85, grade: "A" },
  { name: "Bob", score: 72, grade: "B" },
  { name: "Charlie", score: 90, grade: "A" },
  { name: "Diana", score: 65, grade: "C" },
  { name: "Eve", score: 78, grade: "B" }
];

const scoreScale = d3.scaleLinear()
  .domain([0, 100])
  .range([50, 450]);

const gradeColorScale = d3.scaleOrdinal()
  .domain(["A", "B", "C"])
  .range(["green", "orange", "red"]);

const svg = d3.create("svg")
  .attr("width", 500)
  .attr("height", 200);

svg.selectAll("circle")
  .data(students)
  .join("circle")
    .attr("cx", d => scoreScale(d.score))
    .attr("cy", 100)
    .attr("r", 15)
    .attr("fill", d => gradeColorScale(d.grade))
    .attr("opacity", 0.7);

// Add student names
svg.selectAll("text")
  .data(students)
  .join("text")
    .attr("x", d => scoreScale(d.score))
    .attr("y", 140)
    .attr("text-anchor", "middle")
    .attr("font-size", 11)
    .text(d => d.name);
```

</details>






<style>
    * {
        font-family: sans-serif;
    }
</style>