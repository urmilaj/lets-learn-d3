---
title: Line chart
---

# Line Chart

Line charts are perfect for showing trends and changes over time. Unlike bar charts that use rectangles, line charts use SVG `<path>` elements to connect data points with a continuous line.

1. We'll create a **simple line chart** showing Afghanistan's corruption perception over the years using the happiness dataset.
2. A **multi line chart**, corruption perception for multiple countries.

---

## What You'll Learn

- Using `d3.line()` to generate SVG path data
- Using `d3.scaleTime()` for time-based x-axis
- Using `d3.scaleLinear()` for y-axis (continuous data)
- Using `d3.timeParse()` to convert strings to dates
- Using `d3.extent()` to find min and max values
- Using `.datum()` instead of `.data()` for single paths
- Drawing paths with `<path>` elements
- Formatting axis ticks with `d3.timeFormat()`

---

## The Data

We're using the `happiness.csv` dataset, filtering for Afghanistan only.

**Download the dataset:** <a href="../../data/happiness.csv" download="happiness.csv">📥 Download happiness.csv</a>

### Sample Data Structure

| Year | Country | Perceptions of corruption |
|------|---------|--------------------------|
| 2015 | Afghanistan | 0.882 |
| 2016 | Afghanistan | 0.865 |
| 2017 | Afghanistan | 0.924 |
| 2018 | Afghanistan | 0.910 |

---

## Step 1: Loading and Filtering Data

```
d3.csv("./data/happiness.csv").then(data => {
  console.log("CSV Data:", data);

  // Filter for Afghanistan only
  const afghanistanData = data.filter(d => d.Country === "Afghanistan");

  console.log("Afghanistan Data:", afghanistanData);
  
  // Time parser - convert year strings to Date objects
  const parseYear = d3.timeParse("%Y");
  
  // All chart code goes here...
});
```

**Why filter for one country?**
- Simpler to start with a single line
- Learn the basics before moving to multi-line charts
- Keeps the data structure straightforward

**What's `d3.timeParse("%Y")`?**
- Parses year strings ("2015") into JavaScript Date objects
- `"%Y"` is the format specifier for 4-digit years
- Required for `scaleTime` which works with Date objects

---

## Step 2: Define Chart Dimensions

```
const width = 500;
const height = 300;
const margin = { top: 20, right: 20, bottom: 50, left: 60 };
```

---

## Step 3: Create Scales

Line charts for time-series data use **`scaleTime` for the x-axis** (dates/years) and **`scaleLinear` for the y-axis** (values).

### X-axis Scale (Years - Time Scale)

```
const xScale = d3.scaleTime()
  .domain(d3.extent(afghanistanData, d => parseYear(d.Year)))
  .range([margin.left, width - margin.right]);
```

**What's `d3.scaleTime()`?**
- Specialized scale for time/date data
- Works with JavaScript Date objects (not numbers or strings)
- Automatically handles time intervals nicely
- Better than `scaleLinear` for dates because it understands time concepts

**Why parse years?**
```
parseYear("2015") // Returns: Date object for Jan 1, 2015
```
- CSV data comes as strings: `"2015"`, `"2016"`, etc.
- `scaleTime` needs Date objects, not strings
- `parseYear(d.Year)` converts each year string to a Date

**Using `d3.extent()` with dates:**

```
d3.extent(afghanistanData, d => parseYear(d.Year))
// Returns: [Date(2015-01-01), Date(2019-01-01)]
```

**Why `d3.extent()`?**
- Returns `[min, max]` in one call
- More efficient than calling `d3.min()` and `d3.max()` separately
- Perfect for line charts where you want to show the full data range

### Y-axis Scale (Corruption Values)

```
const yScale = d3.scaleLinear()
  .domain([0, d3.max(afghanistanData, d => +d["Perceptions of corruption"])])
  .range([height - margin.bottom, margin.top])
  .nice();
```

**Why start at 0?**
- Shows the full context of the values
- Avoids misleading visualizations
- Standard practice for most metrics

**What's `.nice()`?**
- Rounds domain to "nice" numbers (0.95 → 1.0)
- Makes axis labels cleaner and easier to read

---

## Step 4: Create the Line Generator (The Magic!)

This is what makes line charts special - `d3.line()` is a **path generator**.

```
const line = d3.line()
  .x(d => xScale(parseYear(d.Year)))
  .y(d => yScale(+d["Perceptions of corruption"]));
```

**What is `d3.line()`?**

`d3.line()` is a **function generator** that:
1. Takes an array of data points
2. Converts each point to x,y coordinates
3. Returns an SVG path string that connects all the points

**Breaking it down:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `d3.line()` | Creates a line generator | A function |
| `.x(accessor)` | How to get x-coordinate for each point | The generator (for chaining) |
| `.y(accessor)` | How to get y-coordinate for each point | The generator (for chaining) |

**Calling the line generator:**

```
// When you call line(data), it returns a path string
const pathData = line(afghanistanData);

console.log(pathData);
// Output: "M60,120L120,115L180,125L240,122L300,118"
```

**Path string breakdown:**
- `M60,120` - **M**ove to starting point (x=60, y=120)
- `L120,115` - **L**ine to next point (x=120, y=115)
- `L180,125` - **L**ine to next point (x=180, y=125)
- And so on...

---

## Step 5: Create SVG Container

```
const svg = d3.select(".container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);
```

---

## Step 6: Add X-axis

```
svg.append("g")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y")))
  .call(g => g.select(".domain").remove());
```

**New: `.tickFormat(d3.timeFormat("%Y"))`**

Since we're using `scaleTime`, we need time-specific formatting:

```
d3.timeFormat("%Y")  // Formats dates as 4-digit years: "2015", "2016"
```

**Common time format specifiers:**
- `"%Y"` - 4-digit year (2015)
- `"%y"` - 2-digit year (15)
- `"%B %Y"` - Full month and year (January 2015)
- `"%b %d"` - Abbreviated month and day (Jan 15)
- `"%m/%d/%Y"` - US date format (01/15/2015)

**Why not `d3.format("d")`?**
- `d3.format()` is for numbers
- `d3.timeFormat()` is for Date objects
- `scaleTime` works with Date objects, so we need time formatting

---

## Step 7: Add Y-axis

```
svg.append("g")
  .attr("transform", `translate(${margin.left},0)`)
  .call(d3.axisLeft(yScale))
  .call(g => g.select(".domain").remove())
  .call(g => g.selectAll(".tick line")
    .attr("x2", width - margin.left - margin.right)
    .attr("stroke-width", 0.1))
  .call(g => g.append("text")
    .attr("x", -margin.left)
    .attr("y", 10)
    .attr("fill", "currentColor")
    .attr("text-anchor", "start")
    .text("↑ Perceptions of corruption"));
```

Standard y-axis with grid lines and label.

---

## Step 8: Draw the Line Path

Here's where we use our line generator!

```
svg.append("path")
  .datum(afghanistanData)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 2)
  .attr("d", line);
```

**Alternative approach - calling the line generator directly:**

You can also skip `.datum()` and call the line generator directly:

```
svg.append("path")
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 2)
  .attr("d", line(afghanistanData));  // Call line() with data directly
```

**What's the difference?**

| Approach | Code | How it works |
|----------|------|--------------|
| **With `.datum()`** | `.datum(data).attr("d", line)` | Binds data to element, D3 calls `line(data)` automatically |
| **Direct call** | `.attr("d", line(data))` | You manually call `line(data)` and pass the result |

Both produce the exact same result! The `.datum()` approach is more "D3-like" and useful when you need the data bound to the element for other operations (like transitions or updates).

**Key differences from bar charts:**

### `.datum()` vs `.data()`

| Method | Use Case | Creates |
|--------|----------|---------|
| `.data(array)` | Bind each element to create multiple elements | Multiple rectangles, circles, etc. |
| `.datum(array)` | Bind entire array to one element | Single path for all data |

**Why `.datum()` for line charts?**
- We're creating **ONE path** that connects all points
- Not creating separate elements for each data point
- The path itself represents the entire dataset

**Comparison:**

```
// Bar chart (many rectangles):
svg.selectAll("rect")
  .data(data)           // Each item → one rectangle
  .join("rect")
  // → Creates 10 <rect> elements for 10 data points

// Line chart (one path):
svg.append("path")
  .datum(data)          // Entire array → one path
  .attr("d", line)
  // → Creates 1 <path> element connecting 10 points
```

### Path Attributes

```
.attr("fill", "none")         // No fill (or you get a filled shape!)
.attr("stroke", "steelblue")  // Line color
.attr("stroke-width", 2)      // Line thickness
.attr("d", line)              // The path data (from line generator)
```

**Why `fill: none`?**

Without it, SVG fills the area under the line!

```
With fill="none":     │  Without fill="none":
                      │
    /\  /\           │    /█\  /█\
   /  \/  \          │   /███\/███\
  /        \         │  /█████████████\
```

**The `d` attribute:**
- `d` stands for "data" (SVG path data)
- We pass our line generator function: `.attr("d", line)`
- D3 automatically calls `line(afghanistanData)` and uses the result

---

```js
const data = await FileAttachment("../../data/happiness.csv").csv();
```

## Simple line chart output

```js
 const afghanistanData = data.filter(d => d.Country === "Afghanistan");
            console.log("Afghanistan Data:", afghanistanData);

            // Time parser
            const parseYear = d3.timeParse("%Y");

            // Dimensions
            const width = 500;
            const height = 300;
            const margin = { top: 20, right: 20, bottom: 50, left: 60 };

            // Scales
            const xScale = d3.scaleTime()
                .domain(d3.extent(afghanistanData, d => parseYear(d.Year)))
                .range([margin.left, width - margin.right]);

            const yScale = d3.scaleLinear()
                .domain([0, d3.max(afghanistanData, d => +d["Perceptions of corruption"])])
                .range([height - margin.bottom, margin.top])
                .nice();

            // Line generator
            const line = d3.line()
                .x(d => xScale(parseYear(d.Year)))
                .y(d => yScale(+d["Perceptions of corruption"]));

                const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)

     // Add x-axis
            svg.append("g")
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y")))
                .call(g => g.select(".domain").remove());

            // Add y-axis
            svg.append("g")
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(yScale))
                .call(g => g.select(".domain").remove())
                .call(g => g.selectAll(".tick line")
                    .attr("x2", width - margin.left - margin.right)
                    .attr("stroke-width", 0.1))
                .call(g => g.append("text")
                    .attr("x", -margin.left)
                    .attr("y", 10)
                    .attr("fill", "currentColor")
                    .attr("text-anchor", "start")
                    .text("↑ Perceptions of corruption"));

            // Draw line
            svg.append("path")
                .datum(afghanistanData)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 2)
                .attr("d", line);

                display(svg.node());
```

## Simple line chart complete working example

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Line Chart - Afghanistan Corruption</title>
    <style>
        text {
            font-family: sans-serif;
        }
    </style>
</head>
<body>
    <div class="container"></div>

    <script type="module">
        import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

        d3.csv("./data/happiness.csv").then(data => {
            console.log("CSV Data:", data);

            // Filter for Afghanistan only
            const afghanistanData = data.filter(d => d.Country === "Afghanistan");
            console.log("Afghanistan Data:", afghanistanData);

            // Time parser
            const parseYear = d3.timeParse("%Y");

            // Dimensions
            const width = 500;
            const height = 300;
            const margin = { top: 20, right: 20, bottom: 50, left: 60 };

            // Scales
            const xScale = d3.scaleTime()
                .domain(d3.extent(afghanistanData, d => parseYear(d.Year)))
                .range([margin.left, width - margin.right]);

            const yScale = d3.scaleLinear()
                .domain([0, d3.max(afghanistanData, d => +d["Perceptions of corruption"])])
                .range([height - margin.bottom, margin.top])
                .nice();

            // Line generator
            const line = d3.line()
                .x(d => xScale(parseYear(d.Year)))
                .y(d => yScale(+d["Perceptions of corruption"]));

            // Create SVG
            const svg = d3.select(".container")
                .append("svg")
                .attr("width", width)
                .attr("height", height);

            // Add x-axis
            svg.append("g")
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y")))
                .call(g => g.select(".domain").remove());

            // Add y-axis
            svg.append("g")
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(yScale))
                .call(g => g.select(".domain").remove())
                .call(g => g.selectAll(".tick line")
                    .attr("x2", width - margin.left - margin.right)
                    .attr("stroke-width", 0.1))
                .call(g => g.append("text")
                    .attr("x", -margin.left)
                    .attr("y", 10)
                    .attr("fill", "currentColor")
                    .attr("text-anchor", "start")
                    .text("↑ Perceptions of corruption"));

            // Draw line
            svg.append("path")
                .datum(afghanistanData)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 2)
                .attr("d", line);
        });
    </script>
</body>
</html>
```

---

## Multi-Line Chart

```js

const selectedCountries = ["Afghanistan", "Albania", "Algeria", "Argentina", "Australia", 
                                       "Austria", "Belgium", "Brazil", "Canada", "Chile"];

// Filter data for selected countries only
const filteredData = data.filter(d => selectedCountries.includes(d.Country));

// Group data by country
const groupedData = d3.group(filteredData, d => d.Country);
const countries = Array.from(groupedData.keys());

// Time parser
const parseYear = d3.timeParse("%Y")
// Dimensions
const width2 = 500;
const height2 = 300;
const margin2 = { top: 20, right: 20, bottom: 50, left: 60 }
// Scales
const xScale2 = d3.scaleTime()
    .domain(d3.extent(filteredData, d => parseYear(d.Year)))
    .range([margin2.left, width2 - margin2.right]);

const yScale2 = d3.scaleLinear()
    .domain([0, d3.max(filteredData, d => +d["Perceptions of corruption"])])
    .range([height2 - margin2.bottom, margin2.top])
    .nice()
// Line generator
const line2 = d3.line()
    .x(d => xScale2(parseYear(d.Year)))
    .y(d => yScale2(+d["Perceptions of corruption"]));


const svg2 = d3.create("svg")
    .attr("width", width2)
    .attr("height", height2)

// Add x-axis
            svg2.append("g")
                .attr("transform", `translate(0,${height2 - margin2.bottom})`)
                .call(d3.axisBottom(xScale2).tickFormat(d3.timeFormat("%Y")))
                .call(g => g.select(".domain").remove());

            // Add y-axis
            svg2.append("g")
                .attr("transform", `translate(${margin2.left},0)`)
                .call(d3.axisLeft(yScale2))
                .call(g => g.select(".domain").remove())
                .call(g => g.selectAll(".tick line")
                    .attr("x2", width2 - margin2.left - margin2.right)
                    .attr("stroke-width", 0.1))
                .call(g => g.append("text")
                    .attr("x", -margin2.left)
                    .attr("y", 10)
                    .attr("fill", "currentColor")
                    .attr("text-anchor", "start")
                    .text("↑ Perceptions of corruption"));

            // Draw lines for each country
            svg2.selectAll(".country-line")
                .data(groupedData)
                .join("path")
                .attr("class", "country-line")
                .attr("fill", "none")
                .attr("stroke", d => d[0] === "Belgium" ? "#FF7F11" : "#909090")
                .attr("stroke-width", d => d[0] === "Belgium" ? 2 : 0.3)
                .attr("d", d => line2(d[1]))

                display(svg2.node());

```

To create a multi-line chart, most of the code stays the same! Here are the **only differences**:

### Key Differences from Single-Line Chart

**1. Filter for multiple countries instead of one:**
```
// Single-line: Filter for one country
const afghanistanData = data.filter(d => d.Country === "Afghanistan");

// Multi-line: Filter for multiple countries
const selectedCountries = ["Afghanistan", "Albania", "Algeria", "Argentina", "Australia", 
                           "Austria", "Belgium", "Brazil", "Canada", "Chile"];
const filteredData = data.filter(d => selectedCountries.includes(d.Country));
```

**2. Group data by country using `d3.group()`:**
```
// Group data by country - creates a Map
const groupedData = d3.group(filteredData, d => d.Country);
// Returns: Map { "Afghanistan" => [...], "Albania" => [...], ... }
```

**3. Use `.selectAll().data()` instead of `.append().datum()`:**
```
// Single-line: One path for one dataset
svg.append("path")
  .datum(afghanistanData)
  .attr("d", line);

// Multi-line: Multiple paths for multiple datasets
svg.selectAll(".country-line")
  .data(groupedData)           // Each Map entry = one country's data
  .join("path")
  .attr("class", "country-line")
  .attr("d", d => line(d[1])); // d[1] is the country's data array
```

**4. Style each line differently (optional):**
```
.attr("stroke", d => d[0] === "Belgium" ? "#FF7F11" : "#909090")  // Highlight Belgium
.attr("stroke-width", d => d[0] === "Belgium" ? 2 : 0.3)          // Make it thicker
```
- `d[0]` = country name (Map key)
- `d[1]` = country's data array (Map value)

That's it! Everything else (scales, axes, line generator) remains identical.

---

## Multi line chart complete working example

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mullti Line Chart</title>
    <style>
        text {
            font-family: sans-serif;
        }
    </style>
</head>
<body>
    <div class="container"></div>

    <!-- Notice type="module" -->
    <script type="module">
        // Import D3 from the CDN
        import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

        d3.csv("../../dummy-example-data/happiness.csv").then(data => {

            console.log("CSV Data:", data);

            // Select 10 countries including Afghanistan
            const selectedCountries = ["Afghanistan", "Albania", "Algeria", "Argentina", "Australia", 
                                       "Austria", "Belgium", "Brazil", "Canada", "Chile"];
            
            // Filter data for selected countries only
            const filteredData = data.filter(d => selectedCountries.includes(d.Country));

            // Group data by country
            const groupedData = d3.group(filteredData, d => d.Country);
            const countries = Array.from(groupedData.keys());

            console.log("Countries:", countries);

            // Time parser
            const parseYear = d3.timeParse("%Y");

            // Dimensions
            const width = 500;
            const height = 300;
            const margin = { top: 20, right: 20, bottom: 50, left: 60 };

            // Scales
            const xScale = d3.scaleTime()
                .domain(d3.extent(filteredData, d => parseYear(d.Year)))
                .range([margin.left, width - margin.right]);

            const yScale = d3.scaleLinear()
                .domain([0, d3.max(filteredData, d => +d["Perceptions of corruption"])])
                .range([height - margin.bottom, margin.top])
                .nice();

            // Line generator
            const line = d3.line()
                .x(d => xScale(parseYear(d.Year)))
                .y(d => yScale(+d["Perceptions of corruption"]));

            // Create SVG
            const svg = d3.select(".container")
                .append("svg")
                .attr("width", width)
                .attr("height", height);

            // Add x-axis
            svg.append("g")
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y")))
                .call(g => g.select(".domain").remove());

            // Add y-axis
            svg.append("g")
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(yScale))
                .call(g => g.select(".domain").remove())
                .call(g => g.selectAll(".tick line")
                    .attr("x2", width - margin.left - margin.right)
                    .attr("stroke-width", 0.1))
                .call(g => g.append("text")
                    .attr("x", -margin.left)
                    .attr("y", 10)
                    .attr("fill", "currentColor")
                    .attr("text-anchor", "start")
                    .text("↑ Perceptions of corruption"));

            // Draw lines for each country
            svg.selectAll(".country-line")
                .data(groupedData)
                .join("path")
                .attr("class", "country-line")
                .attr("fill", "none")
                .attr("stroke", d => d[0] === "Belgium" ? "#FF7F11" : "#909090")
                .attr("stroke-width", d => d[0] === "Belgium" ? 2 : 0.3)
                .attr("d", d => line(d[1]));

        });
    </script>
</body>
</html>
```

<style>
    * {
        font-family: sans-serif;
    }
</style>
