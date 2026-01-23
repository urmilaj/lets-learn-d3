---
title: Horizontal bar chart
---

# Horizontal bar chart

We will be creating a horizontal bar chart, similar to the vertical bar chart. But, in this example, we will be doing some data munging to convet the raw data in a format required to create the chart.

---

## What You'll Learn

- Filtering raw data with `.filter()`
- Aggregating data using `d3.rollup()`
- Converting Map objects to arrays
- Using `scaleLinear` for horizontal bars
- Using `scaleBand` for categorical y-axis
- Flipping axes compared to vertical bar charts

---

```js
const data = await FileAttachment("../../data/music.csv").csv({typed: true});
```

## The Data

We're using the **raw** `music.csv` dataset, which contains detailed revenue data with multiple rows per format and year.

**Download the dataset:** <a href="../../data/music.csv" download="music.csv">📥 Download music.csv</a>

### Raw Data Structure

Unlike the pre-aggregated data from the vertical bar chart, this dataset has:
- Multiple rows for the same format (different years)
- Revenue values that need to be summed
- More detailed breakdowns

**Example rows:**

```js
Inputs.table(data)
```

**The Challenge:** We need to filter for "Tape" category and sum up all revenues by Format!

---

## Step 1: Loading and Filtering Data

### Load the CSV

```
d3.csv("./data/music.csv").then(data => {
  console.log("CSV Data:", data);
  
  // All your chart code goes here...
});
```

### Filter for Tape Category

First, let's filter to get only Tape format data:

```js echo
const tapeData = data.filter(d => d.Category === "Tape");

console.log("Tape Data:", tapeData);
```

**What's `.filter()`?**
- JavaScript array method
- Returns a new array with only items that match the condition
- `d => d.Category === "Tape"` checks if each row has Category of "Tape"

**Result:** We now have only rows where `Category === "Tape"` (8-Track and Cassette formats)

---

## Step 2: Aggregating Data with `d3.rollup()`

Now we have multiple rows per format (one for each year). We need to **sum all revenues by Format**.

### Using `d3.rollup()` to Aggregate

```js echo
// Sum revenues by Format
const revenueByFormat = d3.rollup(
  tapeData,                                         // Data to aggregate
  v => d3.sum(v, d => +d["Revenues in millions"]), // Reducer: sum revenues
  d => d.Format                                     // Grouping key: Format
);

console.log("Revenue by Format Map:", revenueByFormat);
```

**Breaking it down:**

1. **First parameter (`tapeData`)** - The data to aggregate
2. **Second parameter (reducer function)** - What to calculate for each group
   - `v` = all rows in this group
   - `d3.sum(v, d => +d["Revenues in millions"])` = sum up the revenues
   - `+d["Revenues in millions"]` = convert string to number
3. **Third parameter (key function)** - How to group the data
   - `d => d.Format` = group by Format field

**Result:** A Map object like:
```
Map {
  "8-Track" => 2238.0,
  "Cassette" => 34135.7
}
```

### Why `d3.rollup()` instead of plain JavaScript?

You *could* do this with `reduce()`, but `d3.rollup()` is:
- More readable for data aggregation
- Built specifically for grouping and summarizing
- Returns a Map (perfect for D3 scales)

---

## Step 3: Converting Map to Array

D3 scales work best with arrays, so let's convert our Map:

```js echo
// Convert Map to array for easier use
const aggregatedData = Array.from(revenueByFormat, ([Format, Revenue]) => ({
  Format,
  Revenue
}));

console.log("Aggregated Revenue by Format:", aggregatedData);
```

**What's happening:**
- `Array.from()` converts the Map to an array
- Destructures each entry `[key, value]` into `[Format, Revenue]`
- Creates objects with `Format` and `Revenue` properties

**Result:**
```
[
  { Format: "8-Track", Revenue: 2238.0 },
  { Format: "Cassette", Revenue: 34135.7 }
]
```

Now we're ready to create the chart! 🎉

---

## Step 4: Define Chart Dimensions

```js echo
// Dimensions
const width = 928;
const height = 500;
const margin = { top: 20, right: 20, bottom: 50, left: 100 };
```

**Note the left margin:** 100px to fit format names on the y-axis

---

## Step 5: Create Scales (Flipped!)

For horizontal bars, we flip the axes compared to vertical bars:

### X-axis Scale (Values - NOW HORIZONTAL!)

```js echo
// X-axis is now for the values (was Y in vertical bar)
const xScale = d3.scaleLinear()
  .domain([0, d3.max(aggregatedData, d => +d.Revenue)])
  .range([margin.left, width - margin.right])
```

**Key difference:** 
- Linear scale for x-axis (was y-axis in vertical)
- Domain is revenue values
- Range goes left to right

### Y-axis Scale (Categories - NOW VERTICAL!)

```js echo
// Y-axis is now for categories (was X in vertical bar)
const yScale = d3.scaleBand()
  .domain(aggregatedData.map(d => d.Format))
  .range([margin.top, height - margin.bottom])
  .padding(0.1);
```

**Key difference:**
- Band scale for y-axis (was x-axis in vertical)
- Domain is format names
- Range goes top to bottom

---

## Step 6: Create Axes

```js echo
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);
```

---

## Step 7: Create SVG Container

```
// Create SVG
const svg = d3.select(".container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
```

```js
const svg = d3.create("svg")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
```

---

## Step 8: Draw the X-axis (Bottom)

```js echo
// Add x-axis
svg.append("g")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(xAxis)
  .call(g => g.select(".domain").remove())
  .call(g => g.selectAll(".tick line")
    .attr("y2", -height + margin.top + margin.bottom)
    .attr("stroke-width", 0.1))
  .call(g => g.append("text")
    .attr("x", width - margin.right)
    .attr("y", 35)
    .attr("fill", "black")
    .attr("text-anchor", "end")
    .text("Revenue ($ millions)"));
```

**What's new:**
- `.selectAll(".tick line").attr("y2", ...)` extends tick lines to create grid lines
- `.append("text")` adds axis label

---

## Step 9: Draw the Y-axis (Left)

```js echo
// Add y-axis
svg.append("g")
  .attr("transform", `translate(${margin.left},0)`)
  .call(yAxis)
  .call(g => g.select(".domain").remove())
```

---

## Step 10: Draw the Bars (Horizontal!)

```js
// Draw bars
svg.append("g")
  .selectAll("rect")
  .data(aggregatedData)
  .join("rect")
    .attr("x", margin.left)                          // Start at left margin
    .attr("y", d => yScale(d.Format))                // Y position from format
    .attr("width", d => xScale(d.Revenue) - margin.left)  // Width from revenue
    .attr("height", yScale.bandwidth())              // Height from band scale
    .attr("fill", "rebeccaPurple");
```

**Understanding horizontal bar attributes:**

| Attribute | Vertical Bar | Horizontal Bar |
|-----------|--------------|----------------|
| **x** | `xScale(category)` | `margin.left` (fixed start) |
| **y** | `yScale(value)` (top of bar) | `yScale(category)` |
| **width** | `xScale.bandwidth()` | `xScale(value) - margin.left` |
| **height** | `yScale(0) - yScale(value)` | `yScale.bandwidth()` |

**Key differences:**
- **x**: Always starts at left margin
- **width**: Calculated from revenue value (grows to the right)
- **y**: Position based on format category
- **height**: Fixed height from band scale

---

```js
// Add chart to the page
display(svg.node());
```

## Complete Working Example

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Music data - Horizontal Bar Chart - Tape Revenue by Format</title>
</head>
<body>
    <div class="container"></div>

    <script type="module">
        import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

        d3.csv("./data/music.csv").then(data => {
            console.log("CSV Data:", data);

            // Step 1: Filter for Tape category
            const tapeData = data.filter(d => d.Category === "Tape");
            console.log("Tape Data:", tapeData);

            // Step 2: Aggregate revenues by Format using d3.rollup
            const revenueByFormat = d3.rollup(
                tapeData,
                v => d3.sum(v, d => +d["Revenues in millions"]),
                d => d.Format
            );
            console.log("Revenue by Format Map:", revenueByFormat);

            // Step 3: Convert Map to array
            const aggregatedData = Array.from(revenueByFormat, ([Format, Revenue]) => ({
                Format,
                Revenue
            }));
            console.log("Aggregated Data:", aggregatedData);

            // Dimensions
            const width = 928;
            const height = 500;
            const margin = { top: 20, right: 20, bottom: 50, left: 100 };

            // Scales (flipped!)
            const xScale = d3.scaleLinear()
                .domain([0, d3.max(aggregatedData, d => +d.Revenue)])
                .range([margin.left, width - margin.right])

            const yScale = d3.scaleBand()
                .domain(aggregatedData.map(d => d.Format))
                .range([margin.top, height - margin.bottom])
                .padding(0.1);

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
                .call(g => g.selectAll(".tick line")
                    .attr("y2", -height + margin.top + margin.bottom)
                    .attr("stroke-width", 0.1))
                .call(g => g.append("text")
                    .attr("x", width - margin.right)
                    .attr("y", 35)
                    .attr("fill", "black")
                    .attr("text-anchor", "end")
                    .text("Revenue ($ millions)"))

            // Add y-axis
            svg.append("g")
                .attr("transform", `translate(${margin.left},0)`)
                .call(yAxis)
                .call(g => g.select(".domain").remove())

            // Draw bars
            svg.append("g")
                .selectAll("rect")
                .data(aggregatedData)
                .join("rect")
                .attr("x", margin.left)
                .attr("y", d => yScale(d.Format))
                .attr("width", d => xScale(d.Revenue) - margin.left)
                .attr("height", yScale.bandwidth())
                .attr("fill", "rebeccaPurple");
        });
    </script>
</body>
</html
```

---

## Key Concepts Recap

| Concept | Purpose | Method |
|---------|---------|--------|
| **`.filter()`** | Keep only matching rows | `data.filter(d => condition)` |
| **`d3.rollup()`** | Group and aggregate data | `d3.rollup(data, reducer, key)` |
| **`Array.from()`** | Convert Map to array | `Array.from(map, transformer)` |
| **Axis flipping** | Horizontal vs vertical | Swap x/y scales and attributes |
| **scaleLinear (x)** | Map revenue to width | For numerical values |
| **scaleBand (y)** | Map categories to height | For format names |

---

## Try It Yourself

**Exercises:**

1. **Try different categories**: Change `"Tape"` to `"Vinyl"` or `"Streaming"`
2. **Add more formats**: Remove the filter to show all music formats
3. **Sort the bars**: Sort `aggregatedData` by revenue before charting
4. **Change colors**: Use a different fill color
5. **Add value labels**: Append text showing the exact revenue on each bar

---

## Comparison: Vertical vs Horizontal Bar Charts

| Aspect | Vertical Bar | Horizontal Bar |
|--------|--------------|----------------|
| **Best for** | Time series, many categories | Long category names, fewer categories |
| **X-axis** | Categories (scaleBand) | Values (scaleLinear) |
| **Y-axis** | Values (scaleLinear) | Categories (scaleBand) |
| **Bar x** | From scale | Fixed (margin.left) |
| **Bar y** | Calculated from value | From scale |
| **Bar width** | From bandwidth | Calculated from value |
| **Bar height** | Calculated from value | From bandwidth |

---


<style>
    * {
        font-family: sans-serif;
    }
</style>
