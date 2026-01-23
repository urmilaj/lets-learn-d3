---
title: Vertical bar chart
---

# Vertical Bar Chart

A vertical bar chart is one of the most fundamental and widely-used data visualizations. It's perfect for comparing values across different categories using vertical bars where the height represents the data value.

---

## What You'll Learn

- Using `scaleBand` for categorical x-axis
- Using `scaleLinear` for numerical y-axis  
- Drawing axes with `d3.axisBottom()` and `d3.axisLeft()`
- The margin convention for proper chart spacing
- Filtering and preparing data
- Creating bars with SVG rectangles

---

```js
const musicData = await FileAttachment("../../data/music-aggregate.csv").csv({typed: true});
```

## The Data

We're using the `music-aggregate.csv` dataset, which contains revenue data for different music formats over the years. 

**Download the dataset:** <a href="../../data/music-aggregate.csv" download="music-aggregate.csv">Click to download music-aggregate.csv dataset</a>

---

## Step 1: Loading CSV Data with D3

To work with our data, we first need to load the CSV file. D3 provides powerful methods for loading and parsing data.

### Using `d3.csv()` to Load Data

```
// Load CSV data with vanilla JavaScript
d3.csv("./data/music-aggregate.csv").then(data => {
  // All your chart code goes inside here
  console.log(data);  // See what the data looks like
  
  // Filter, create scales, draw chart...
});
```

**What's happening here?**

1. **`d3.csv()`** - D3's method to load and parse CSV files
2. **`.then()`** - Handles the loaded data when it's ready (it's asynchronous)
3. **`data`** - The parameter containing your loaded CSV as an array of objects
4. **All chart code must go inside** the `.then()` callback

**Why `.then()`?**
- Loading files takes time (network request)
- JavaScript doesn't wait - it continues running
- `.then()` says "when the data is ready, THEN do this"

### What the Data Looks Like

```js
view(Inputs.table(musicData))
```

---

## Step 2: Define Chart Dimensions

Following the **margin convention**, we define our chart dimensions:

```js echo
// Chart dimensions
const width = 928;
const height = 500;
const margin = { top: 20, right: 20, bottom: 50, left: 100 };
```

**Why margins?** 
- Space for axes labels and tick marks
- Prevents bars from being cut off
- Makes the chart readable

---

## Step 3: Create Scales

Scales are the bridge between your data values and visual properties.

### X-axis Scale (Categories - Years)

```js echo
// Create a band scale for years (categorical x-axis)
const xScale = d3.scaleBand()
  .domain((musicData.map(d=>d.Format)))  // All unique years
  .range([margin.left, width - margin.right])  // Pixel range
  .padding(0.1);  // Space between bars (10%)
```

**What's `scaleBand`?**
- Used for categorical data (years in this case)
- Automatically calculates bar width
- `.padding(0.1)` adds 10% spacing between bars
- `.bandwidth()` gives you the width of each bar

### Y-axis Scale (Values - Revenue)

```js echo
// Create a linear scale for revenue (numerical y-axis)
const yScale = d3.scaleLinear()
  .domain([0, d3.max(musicData, d => d.Revenue)])  // 0 to max revenue
  .range([height - margin.bottom, margin.top])  // Flipped! SVG y goes down
```

**Key points:**
- `.domain([0, max])` - Always start at 0 for bar charts
- `.range()` is **flipped** - SVG y-coordinates go from top (0) to bottom (height)

---

## Step 4: Create SVG Container

```js
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
```

```
// Create SVG element
const svg = d3.select(".container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
```

---

## Step 5: Draw the x axis

```js echo
const xAxis = d3.axisBottom(xScale);
// Add x-axis
svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(xAxis)
    .call(g => g.select(".domain").remove())
```

---

## Step 6: Draw the y axis

```js echo
const yAxis = d3.axisLeft(yScale);
// Add y-axis
svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis)
    .call(g => g.select(".domain").remove())
    .call(g => g.selectAll(".tick line").attr("x2", width-margin.right).attr("stroke-width", 0.1))
    .call(g => g.append("text")
        .attr("x", 0)
        .attr("y", 28)
        .attr("fill", "black")
        .attr("text-anchor", "end")
        .text("↑ Revenue ($ millions)"));

```

## Step 7: Draw the Bars

Now for the main event - creating bars with data binding!

```js echo
// Create bars
svg.append("g")
  .selectAll("rect")
  .data(musicData)
  .join("rect")
    .attr("x", d => xScale(d.Format))  // x position from year
    .attr("y", d => yScale(d.Revenue))  // y position from revenue
    .attr("width", xScale.bandwidth())  // width from scale
    .attr("height", d => yScale(0) - yScale(d.Revenue))  // height
    .attr("fill", "rebeccaPurple");
```

**Understanding each attribute:**

- **`x`**: Horizontal position - `xScale(d.Year)` converts year to pixel position
- **`y`**: Top of the bar - `yScale(revenue)` converts revenue to pixel position
- **`width`**: `xScale.bandwidth()` - the width calculated by scaleBand
- **`height`**: `yScale(0) - yScale(revenue)` - distance from bottom to top

**Why the height calculation?**
```
yScale(0) = 480px (bottom of chart)
yScale(100) = 200px (somewhere in middle)
height = 480 - 200 = 280px ✓
```

---

**Congratulations! 🎉** You've created your first complete D3 bar chart from scratch!

```js
// Add chart to the page
display(svg.node());
```

---

## Complete Working Example

Here's the full code together:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Music data - vertical bar chart</title>
</head>
<body>
    <div class="container"></div>
    <script type="module">
        // Import D3 from the CDN
        import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

        d3.csv("./data/music-aggregate.csv").then(data => {
            console.log("CSV Data:", data);

            // Dimensions
            const width = 928;
            const height = 500;
            const margin = { top: 20, right: 20, bottom: 50, left: 100 };

            // Scales
            const xScale = d3.scaleBand()
                .domain(data.map(d => d.Format))
                .range([margin.left, width - margin.right])
                .padding(0.1);

            const yScale = d3.scaleLinear()
                .domain([0, d3.max(data, d => +d.Revenue)])
                .range([height - margin.bottom, margin.top])

            const xAxis = d3.axisBottom(xScale);
            const yAxis = d3.axisLeft(yScale);

            // Create SVG
            const svg = d3.select(".container")
                .append("svg")
                .attr("width", width)
                .attr("height", height)

            // Add x-axis
            svg.append("g")
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(xAxis)
                .call(g => g.select(".domain").remove())

            // Add y-axis
            svg.append("g")
                .attr("transform", `translate(${margin.left},0)`)
                .call(yAxis)
                .call(g => g.select(".domain").remove())
                .call(g => g.selectAll(".tick line").attr("x2", width-margin.right).attr("stroke-width", 0.1))
                .call(g => g.append("text")
                    .attr("x", 0)
                    .attr("y", 28)
                    .attr("fill", "black")
                    .attr("text-anchor", "end")
                    .text("↑ Revenue ($ millions)"));

            // Draw bars
            svg.append("g")
                .selectAll("rect")
                .data(data)
                .join("rect")
                .attr("x", d => xScale(d.Format))
                .attr("y", d => yScale(+d.Revenue))
                .attr("width", xScale.bandwidth())
                .attr("height", d => yScale(0) - yScale(+d.Revenue))
                .attr("fill", "rebeccaPurple");        
        });
    </script>
</body>
</html>
```

---


<style>
    * {
        font-family: sans-serif;
    }
</style>