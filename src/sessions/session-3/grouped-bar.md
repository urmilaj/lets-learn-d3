---
title: Grouped bar chart
---


# Grouped bar chart

A grouped bar chart uses applies the same concepts as a simple bar chart, but instead of using `d3.scaleBand()` once, you can use it several times to create multi-level grouped bar chart. For example, if you have happiness data for multiple countries for multiple years, you can create a grouped bar chart, with the **country** has the first main group and **years** has the second level sub group. Take a look at the data below for reference.

---

## What You'll Learn

- Filtering data for specific countries
- Using `d3.group()` to create hierarchical data structures
- Creating nested scales with `scaleBand()` (x0 for main groups, x1 for sub-groups)
- Using `scaleOrdinal()` for color mapping by category
- Nested data binding (groups within groups)
- Adding custom axis labels for multi-level groupings
- Working with grouped Map structures from `d3.group()`

---

## Data

```js
const data = await FileAttachment("../../data/happiness.csv").csv();
```


We're using the **raw** `happiness.csv` dataset.

**Download the dataset:** <a href="../../data/happiness.csv" download="happiness.csv">📥 Download happiness.csv</a>


```js
Inputs.table(data)
```

---

## Step 1: Loading and Filtering Data

### Load the CSV

```
d3.csv("./data/happiness.csv").then(data => {
  console.log("CSV Data:", data);
  
  // All chart code goes here...
});
```

### Filter for Specific Countries

For this example, we'll compare **Afghanistan** and **Germany** across multiple years:

```
const filteredData = data.filter(d => d.Country === "Afghanistan" || d.Country === "Germany");

console.log("Filtered Data:", filteredData);
```

**What's `.filter()`?**
- Keeps only rows where the condition is `true`
- `||` is the OR operator - matches either country
- Returns a new array with only Afghanistan and Germany data

**Result:** We now have only rows for these two countries across all years.

---

## Step 2: Grouping Data with `d3.group()`

This is the key to grouped bar charts! We need to organize our data hierarchically: **Country → Year → Data**.

### Using `d3.group()` for Nested Structure

```
const group = d3.group(filteredData, d => d.Country, d => d.Year);

console.log("Grouped Data:", group);
```

**Breaking it down:**

1. **First parameter (`filteredData`)** - The data to group
2. **Second parameter (`d => d.Country`)** - First level of grouping (by Country)
3. **Third parameter (`d => d.Year`)** - Second level of grouping (by Year within each Country)

**What does `d3.group()` return?**

A **nested Map** structure:

```
Map {
  "Afghanistan" => Map {
    "2015" => [{ Country: "Afghanistan", Year: "2015", ... }],
    "2016" => [{ Country: "Afghanistan", Year: "2016", ... }],
    "2017" => [{ Country: "Afghanistan", Year: "2017", ... }]
  },
  "Germany" => Map {
    "2015" => [{ Country: "Germany", Year: "2015", ... }],
    "2016" => [{ Country: "Germany", Year: "2016", ... }],
    "2017" => [{ Country: "Germany", Year: "2017", ... }]
  }
}
```

**Why this structure?**
- Makes it easy to iterate over countries first
- Then iterate over years within each country
- Perfect for nested data binding in D3!

### `d3.group()` vs `d3.rollup()`

| Method | Returns | Use When |
|--------|---------|----------|
| `d3.group()` | Map with **all rows** in arrays | You need the original data rows |
| `d3.rollup()` | Map with **aggregated values** | You need to calculate sum, mean, etc. |

In this chart, we need the actual data rows (not aggregated), so we use `d3.group()`.

---

## Step 3: Extracting Unique Values

We need arrays of unique countries and years for our scales.

### Getting Unique Countries

```
const countries = [...new Set(filteredData.map(d => d.Country))];

console.log("Countries:", countries); // ["Afghanistan", "Germany"]
```

**Breaking it down:**

1. **`.map(d => d.Country)`** - Extract all country values: `["Afghanistan", "Afghanistan", "Germany", "Germany", ...]`
2. **`new Set(...)`** - Create a Set (removes duplicates): `Set { "Afghanistan", "Germany" }`
3. **`[...  ]`** - Spread operator converts Set back to array: `["Afghanistan", "Germany"]`

### Getting Unique Years (Sorted)

```
const years = [...new Set(filteredData.map(d => +d.Year))].sort((a, b) => a - b);

console.log("Years:", years); // [2015, 2016, 2017, ...]
```

**Additional steps:**
- **`+d.Year`** - Convert string to number (important for sorting!)
- **`.sort((a, b) => a - b)`** - Sort years numerically in ascending order

**Why convert to number?**
```
// String sort (WRONG):
["2019", "2015", "2017"].sort() // ["2015", "2017", "2019"] ✓ (works by luck)

// But be careful:
["9", "10", "11"].sort() // ["10", "11", "9"] ❌ (alphabetical!)

// Number sort (CORRECT):
[9, 10, 11].sort((a, b) => a - b) // [9, 10, 11] ✓
```

---

## Step 4: Define Chart Dimensions

```
const width = 928;
const height = 500;
const margin = { top: 20, right: 20, bottom: 100, left: 60 };
```

**Note:** `bottom: 100` - Extra space for two levels of labels (years + countries)!

---

## Step 5: Create Nested Scales

This is where grouped bar charts get interesting - we need **TWO x-scales**!

### X0 Scale (Main Groups - Countries)

```
// x0 scale for countries (outer grouping)
const x0 = d3.scaleBand()
  .domain(countries)                              // ["Afghanistan", "Germany"]
  .range([margin.left, width - margin.right])    // Full chart width
  .paddingInner(0.25);                           // 25% space between country groups
```

**What this does:**
- Divides the chart width into sections for each country
- Each country gets a "band" of space
- `.paddingInner(0.25)` adds spacing between country groups

### X1 Scale (Sub-groups - Years)

```
// x1 scale for years within each country (inner grouping)
const x1 = d3.scaleBand()
  .domain(years)                  // [2015, 2016, 2017, ...]
  .range([0, x0.bandwidth()])     // Within one country's band!
  .padding(0.08);                 // 8% space between year bars
```

**Key difference:**
- `.range([0, x0.bandwidth()])` - Range is **within one country's space**, not the full chart!
- Subdivides each country section into bars for each year


### Y Scale (Values)

```
const yScale = d3.scaleLinear()
  .domain([0, d3.max(filteredData, d => +d["Perceptions of corruption"])])
  .range([height - margin.bottom, margin.top])
```

Standard linear scale for the corruption perception values.

### Color Scale (Countries)

```
// Color scale for countries
const colorScale = d3.scaleOrdinal()
  .domain(countries)                    // ["Afghanistan", "Germany"]
  .range(["#e6af2e", "#6b0504"]);      // [yellow-orange, dark red]
```

**Why `scaleOrdinal()`?**
- Countries are categorical (not continuous)
- Each country gets its own distinct color
- Makes it easy to distinguish countries visually

---

## Step 6: Create SVG Container

```
const svg = d3.select(".container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
```

---

## Step 7: Add Custom Axis Labels

Grouped bar charts need **two levels of labels**: main groups (countries) and sub-groups (years).

### Country Labels (Bottom Level)

```
// Add country labels below years
const countryLabels = svg.append("g")
  .attr("transform", `translate(0,${height - margin.bottom + 35})`);

countries.forEach(country => {
  countryLabels.append("text")
    .attr("x", x0(country) + x0.bandwidth() / 2)  // Center of country band
    .attr("y", 0)
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .text(country);
});
```

**Key calculation:**
- `x0(country)` - Left edge of country band
- `+ x0.bandwidth() / 2` - Add half the width = center!

### Year Labels (Above Country Labels)

```
// Add year labels above country labels
const yearLabels = svg.append("g")
  .attr("transform", `translate(0,${height - margin.bottom + 15})`);

countries.forEach(country => {
  years.forEach(year => {
    yearLabels.append("text")
      .attr("x", x0(country) + x1(year) + x1.bandwidth() / 2)  // Position within country
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .text(year);
  });
});
```

**Position calculation:**
- `x0(country)` - Country's starting position
- `+ x1(year)` - Year's position **within** that country
- `+ x1.bandwidth() / 2` - Center of the year bar

---

## Step 8: Add Y-axis

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

## Step 9: Draw Grouped Bars (The Magic!)

This is where the nested data binding happens!

### First Level: Create Groups for Each Country

```
const countryGroups = svg.append("g")
  .selectAll("g")
  .data(group)                          // Bind the Map from d3.group()
  .join("g")
  .attr("transform", d => `translate(${x0(d[0])},0)`);
```

**What's happening:**
1. **`.data(group)`** - Bind the nested Map (country → years → data)
2. **`.join("g")`** - Create a `<g>` group for each country
3. **`d[0]`** - The Map key (country name: "Afghanistan" or "Germany")
4. **`translate(${x0(d[0])},0)`** - Move each country group to its x position

**Result:** We now have one `<g>` group positioned for each country.

### Second Level: Create Bars for Each Year

```
countryGroups.selectAll("rect")
  .data(d => d[1])              // d[1] is the nested Map of years
  .join("rect")
  .attr("x", d => x1(+d[0]))    // x position within country (year)
  .attr("y", d => yScale(+d[1][0]["Perceptions of corruption"]))
  .attr("width", x1.bandwidth())
  .attr("height", d => yScale(0) - yScale(+d[1][0]["Perceptions of corruption"]))
  .attr("fill", d => colorScale(d[1][0]["Country"]));
```

**Breaking down the data structure:**

For each country group:
- **`d[1]`** - The nested Map of years for this country
  ```
  Map {
    "2015" => [{ Country: "Afghanistan", Year: "2015", ... }],
    "2016" => [{ Country: "Afghanistan", Year: "2016", ... }]
  }
  ```

For each bar (year):
- **`d[0]`** - The year (Map key): `"2015"`
- **`d[1]`** - Array of data rows for this year: `[{ ... }]`
- **`d[1][0]`** - The first (and only) data row
- **`d[1][0]["Perceptions of corruption"]`** - The value to plot

**Attribute calculations:**

| Attribute | Calculation | Why |
|-----------|-------------|-----|
| **x** | `x1(+d[0])` | Position within country group based on year |
| **y** | `yScale(value)` | Top of bar based on corruption value |
| **width** | `x1.bandwidth()` | Width of year bar |
| **height** | `yScale(0) - yScale(value)` | From bottom to value |
| **fill** | `colorScale(country)` | Color based on country |

---

## Grouped bar chart output

```js
const filteredData = data.filter(d => d.Country === "Afghanistan" || d.Country === "Germany");


            const group = d3.group(filteredData, d => d.Country, d => d.Year);


            // Convert to array structure for D3
            const countries = [...new Set(filteredData.map(d => d.Country))]
            const years = [...new Set(filteredData.map(d => +d.Year))].sort((a, b) => a - b);

            // Dimensions
            const width = 928;
            const height = 500;
            const margin = { top: 20, right: 20, bottom: 100, left: 60 };

            // Scales
            // x0 scale for countries
            const x0 = d3.scaleBand()
                .domain(countries)
                .range([margin.left, width - margin.right])
                .paddingInner(0.25);

            // x1 scale for years within each country
            const x1 = d3.scaleBand()
                .domain(years)
                .range([0, x0.bandwidth()])
                .padding(0.08);

            // y scale for corruption perception
            const yScale = d3.scaleLinear()
                .domain([0, d3.max(filteredData, d => +d["Perceptions of corruption"])])
                .range([height - margin.bottom, margin.top])

            // Color scale for countries
            const colorScale = d3.scaleOrdinal()
                .domain(countries)
                .range(["#e6af2e", "#6b0504"]);

const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)

 const countryLabels = svg.append("g")
                .attr("transform", `translate(0,${height - margin.bottom + 35})`);

            countries.forEach(country => {
                countryLabels.append("text")
                    .attr("x", x0(country) + x0.bandwidth() / 2)
                    .attr("y", 0)
                    .attr("text-anchor", "middle")
                    .attr("font-size", "14px")
                    .text(country);
            });

            // Add year labels above country labels
            const yearLabels = svg.append("g")
                .attr("transform", `translate(0,${height - margin.bottom + 15})`);

            countries.forEach(country => {
                years.forEach(year => {
                    yearLabels.append("text")
                        .attr("x", x0(country) + x1(year) + x1.bandwidth() / 2)
                        .attr("y", 0)
                        .attr("text-anchor", "middle")
                        .attr("font-size", "10px")
                        .text(year);
                });
            });
      
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

            // Draw grouped bars
            const countryGroups = svg.append("g")
                .selectAll("g")
                .data(group)
                .join("g")
                .attr("transform", d => `translate(${x0(d[0])},0)`);

            countryGroups.selectAll("rect")
                .data(d => d[1])
                .join("rect")
                .attr("x", d => x1(+d[0]))
                .attr("y", d => yScale(+d[1][0]["Perceptions of corruption"]))
                .attr("width", x1.bandwidth())
                .attr("height", d => yScale(0) - yScale(+d[1][0]["Perceptions of corruption"]))
                .attr("fill", d => colorScale(d[1][0]["Country"]))

                display(svg.node());

```

---

## Complete Working Example

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grouped bar chart - happiness data</title>
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

        d3.csv("./data/happiness.csv").then(data => {

            // Filter for Afghanistan and Albania only
            const filteredData = data.filter(d => d.Country === "Afghanistan" || d.Country === "Germany");


            const group = d3.group(filteredData, d => d.Country, d => d.Year);

            // Convert to array structure for D3
            const countries = [...new Set(filteredData.map(d => d.Country))]
            const years = [...new Set(filteredData.map(d => +d.Year))].sort((a, b) => a - b);

            // Dimensions
            const width = 928;
            const height = 500;
            const margin = { top: 20, right: 20, bottom: 100, left: 60 };

            // Scales
            // x0 scale for countries
            const x0 = d3.scaleBand()
                .domain(countries)
                .range([margin.left, width - margin.right])
                .paddingInner(0.25);

            // x1 scale for years within each country
            const x1 = d3.scaleBand()
                .domain(years)
                .range([0, x0.bandwidth()])
                .padding(0.08);

            // y scale for corruption perception
            const yScale = d3.scaleLinear()
                .domain([0, d3.max(filteredData, d => +d["Perceptions of corruption"])])
                .range([height - margin.bottom, margin.top])

            // Color scale for countries
            const colorScale = d3.scaleOrdinal()
                .domain(countries)
                .range(["#e6af2e", "#6b0504"]);

            // Create SVG
            const svg = d3.select(".container")
                .append("svg")
                .attr("width", width)
                .attr("height", height)

            // Add country labels below years
            const countryLabels = svg.append("g")
                .attr("transform", `translate(0,${height - margin.bottom + 35})`);

            countries.forEach(country => {
                countryLabels.append("text")
                    .attr("x", x0(country) + x0.bandwidth() / 2)
                    .attr("y", 0)
                    .attr("text-anchor", "middle")
                    .attr("font-size", "14px")
                    .text(country);
            });

            // Add year labels above country labels
            const yearLabels = svg.append("g")
                .attr("transform", `translate(0,${height - margin.bottom + 15})`);

            countries.forEach(country => {
                years.forEach(year => {
                    yearLabels.append("text")
                        .attr("x", x0(country) + x1(year) + x1.bandwidth() / 2)
                        .attr("y", 0)
                        .attr("text-anchor", "middle")
                        .attr("font-size", "10px")
                        .text(year);
                });
            });
      
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

            // Draw grouped bars
            const countryGroups = svg.append("g")
                .selectAll("g")
                .data(group)
                .join("g")
                .attr("transform", d => `translate(${x0(d[0])},0)`);

            countryGroups.selectAll("rect")
                .data(d => d[1])
                .join("rect")
                .attr("x", d => x1(+d[0]))
                .attr("y", d => yScale(+d[1][0]["Perceptions of corruption"]))
                .attr("width", x1.bandwidth())
                .attr("height", d => yScale(0) - yScale(+d[1][0]["Perceptions of corruption"]))
                .attr("fill", d => colorScale(d[1][0]["Country"]))
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