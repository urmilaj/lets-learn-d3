---
title: D3 example
---

### D3 intro

D3.js (Data-Driven Documents), created in 2011 by Mike Bostock, revolutionized web-based data visualization. Built on web standards (HTML, SVG, CSS), D3 enables interactive, dynamic visualizations by binding data to DOM elements. Its flexibility powers everything from simple bar charts, dashboards to complex network diagrams, geographic maps and animations.

---

## Some initial thoughts

Creating data visualization with D3 may feel complex and overwhelming at the start. But if you breakdown the process of creating any chart (simple or complex), it makes the whole process easier.

For example, one community member shared that they would like to recreate the below dandelion chart with D3 and make it interactive.

![dandelion chart](/assets/down-to-earth.jpg)

Image source: [*What 30 Years of Down To Earth Reporting Tells Us by Rajit Sengupta*](https://www.linkedin.com/posts/rajitsengupta_what-30-years-of-down-to-earth-reporting-activity-7400940842154156032-XRpG?utm_source=share&utm_medium=member_desktop&rcm=ACoAAB0Hk2oBQVedhudYdriblNiouETJ1B4QZFg)

Now, looking at the image below may make it look complex. But lets break it down. If you look closely at this dandelion chart, essentially its a pie chart, which is made to look like a dandelion flower by adding seed-heads varied in colour for each specific theme.

---

<div class="tip">
    This section below is just to showcase the power and possibilities of D3.js. This is an advanced example. Feel free to skip this section, if it feels overwhelming. We'll dive into D3 basics next week, after that you can come back to have a look at this example. 
</div>

<br>

## How to create a dandelion chart with D3

Lets try and create this chart. 


1. **First we need data, data, dataaa!**

Ofcourse, we do not have the exact dataset that the original chart uses, but dont worry lets create a dummy dataset based on the image. Here's the dummy data table below.

```js
const dandelionData = await FileAttachment("./data/dandelion-example.csv").csv()
```

<div class="card">${Inputs.table(dandelionData)}</div>

2. **Lets filter that dataset to just one group of years**

If you see the original dandelion chart, it has one dandelion flower for **every 5 years** labeled as 1996-00, 2001-05 and so one. Lets filter it out to just **1996-00** in the year column.

**Why are we doing this?**
Lets first create one dandelion flower for the year 1996-00, then it makes it easier to create it for other years. See filtered data table below.

<div class="card">${Inputs.table(dandelionData.filter(d => d.year === "1996-00"))}</div>

3. **Lets create a pie using D3**

The pie below is created using the filtered dandelion dummy data.

```js
// Filter the data to only include rows from the year 1996-00
const pieData96 = dandelionData.filter(d => d.year === "1996-00");

// Create a pie layout generator that uses the 'value' property from our data
const pie = d3.pie().value(d => +d.value);

// Create an arc generator to draw the pie slices
// innerRadius: creates the donut hole in the center
// outerRadius: sets how far the slices extend outward
// padAngle: adds small gaps between slices
const arc = d3.arc().innerRadius(25).outerRadius(110).padAngle(0.02);

// Calculate the angles for each pie slice based on our filtered data
const arcs = pie(pieData96);
```

```js
svg`<svg width="600" height="600" style="background-color: #f0f0f0ff">
    <g transform="translate(300, 300)">
        ${arcs.map(d => svg`<path 
                d=${arc(d)}
                fill="#979797ff"
                stroke="white"
                stroke-width="2"
            />`
        )}
    </g>
</svg>`
```

4. **Now lets add dandelion seeds to each pie slice**

This is where the magic happens! We'll distribute small dandelion seed shapes within each arc of the pie.

```js
// Define the dandelion seed path (SVG path data)
const dandelionPath = "M13.4811 65.9498C13.3263 65.945 13.2029 66.085 13.2054 66.2625C13.208 66.44 13.3355 66.5879 13.4904 66.5927M13.4811 65.9498C13.6359 65.9546 13.7635 66.1024 13.7661 66.2799C13.7686 66.4575 13.6452 66.5975 13.4904 66.5927M13.4811 65.9498L13.4904 66.5927M13.4811 65.9498C12.9307 57.8098 11.2329 52.4929 6.82563 51.2851M9.32032 62.3935C9.16549 62.3887 9.04205 62.5287 9.04461 62.7062C9.04716 62.8838 9.17473 63.0316 9.32955 63.0364M9.32032 62.3935C9.47514 62.3983 9.60272 62.5461 9.60527 62.7236C9.60782 62.9012 9.48438 63.0412 9.32955 63.0364M9.32032 62.3935L9.32955 63.0364M9.32032 62.3935C8.88095 57.9296 8.375 55.8334 6.82563 51.2851M6.38862 66.3722C6.23379 66.3673 6.11035 66.5074 6.1129 66.6849C6.11546 66.8624 6.24303 67.0102 6.39785 67.015M6.38862 66.3722C6.54344 66.377 6.67102 66.5248 6.67357 66.7023C6.67612 66.8798 6.55268 67.0198 6.39785 67.015M6.38862 66.3722L6.39785 67.015M6.38862 66.3722C5.97536 59.3268 6.03328 56.4585 6.82563 51.2851M3.88209 60.9395C3.72727 60.9347 3.60383 61.0747 3.60638 61.2522C3.60893 61.4297 3.7365 61.5776 3.89133 61.5824M3.88209 60.9395C4.03691 60.9443 4.16449 61.0921 4.16704 61.2696C4.16959 61.4471 4.04615 61.5872 3.89133 61.5824M3.88209 60.9395L3.89133 61.5824M3.88209 60.9395C4.6012 56.1584 5.31236 54.5756 6.82563 51.2851M0.77582 65.7695C0.620997 65.7647 0.497556 65.9047 0.500107 66.0822C0.502658 66.2597 0.630234 66.4075 0.785057 66.4124M0.77582 65.7695C0.930643 65.7743 1.05822 65.9221 1.06077 66.0996C1.06332 66.2771 0.93988 66.4172 0.785057 66.4124M0.77582 65.7695L0.785057 66.4124M0.77582 65.7695C1.16914 60.6411 2.62681 51.5831 6.82563 51.2851M7.50153 0.248276C10.6053 5.67078 11.605 32.6709 6.82563 51.2851";

// Create a color scale for the themes
const colorScale = d3.scaleOrdinal()
    .domain(arcs.map(d => d.data.theme))
    .range(['#3a5cbc', '#5277c5', '#6892ce', '#7daed7', '#95cae1', '#b2e4ec', '#eff7ff']);

// Generate dandelion seeds for each arc
const dandelionSeeds = arcs.flatMap(arc => {
const arcAngleSpan = arc.endAngle - arc.startAngle;
const innerRadius = 8;
const outerRadius = 40;
const seeds = [];
    
// Calculate number of seeds based on arc size
const numAngularPositions = Math.max(1, Math.floor(arcAngleSpan * 10));
const numRadialPositions = 1;
    
// Distribute seeds within the arc
for (let i = 0; i < numAngularPositions; i++) {
    for (let j = 0; j < numRadialPositions; j++) {
        // Calculate position within the arc
        const angleOffset = (i + 0.5) / numAngularPositions * arcAngleSpan;
        const angle = arc.startAngle + angleOffset;
        const radius = innerRadius + (j + 0.5) / numRadialPositions * (outerRadius - innerRadius);
        
        const x = radius * Math.cos(angle - Math.PI / 2);
        const y = radius * Math.sin(angle - Math.PI / 2);
        const rotation = ((angle - Math.PI / 2) * 180 / Math.PI) - 90;
        
        // Vary the scale for each seed
        const scale = 0.1 + Math.random() * 1.5;
        
        seeds.push({
            x, y, rotation, scale,
            color: colorScale(arc.data.theme),
            theme: arc.data.theme
        });
    }
}

return seeds;
});
```

```js
svg`<svg width="600" height="600" style="background-color: #2b2b2b">
    <g transform="translate(300, 300)">
        ${dandelionSeeds.map(seed => svg`
            <path 
                d="${dandelionPath}"
                transform="translate(${seed.x}, ${seed.y}) rotate(${seed.rotation}) scale(${seed.scale})"
                fill="none"
                stroke="${seed.color}"
                stroke-width="1"
                opacity="0.7"
            />`
        )}
    </g>
</svg>`
```

5. **Add pollen dots in the center to complete the dandelion**

Now let's add a cluster of small dots in the center to represent the pollen core of the dandelion flower and a stem.

```js
// Generate pollen dots for the center
const numPollenDots = 350;
const centerRadius = 40;
const pollenDots = [];

for (let i = 0; i < numPollenDots; i++) {
    // Generate random position within the circle
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.sqrt(Math.random()) * centerRadius; // sqrt for uniform distribution
    
    const x = distance * Math.cos(angle);
    const y = distance * Math.sin(angle);
    
    pollenDots.push({
        x,
        y,
        r: 0.8 + Math.random() * 0.5, // Vary dot size between 0.8 and 1.3
        opacity: 0.6 + Math.random() * 0.4 // Vary opacity
    });
}
```

```js
svg`<svg width="600" height="600" style="background-color: #2b2b2b">
    <g transform="translate(300, 300)">
        <path transform="translate(-25, 0)" d="M19.3517 0.458252C52.3516 64.4583 -35.1484 206.958 19.3517 264.958" stroke="#6184B7" stroke-width="2" fill="none"/>
        <circle cx="0" cy="0" r="40" fill="#353535" />
        ${pollenDots.map(dot => svg`
            <circle 
                cx="${dot.x}" 
                cy="${dot.y}" 
                r="${dot.r}"
                fill="#6892ce"
                opacity="${dot.opacity}"
            />`
        )}
        ${dandelionSeeds.map(seed => svg`
            <path 
                d="${dandelionPath}"
                transform="translate(${seed.x}, ${seed.y}) rotate(${seed.rotation}) scale(${seed.scale})"
                fill="none"
                stroke="${seed.color}"
                stroke-width="1"
                opacity="0.7"
            />`
        )}
    </g>
</svg>`
```

---

## Creating Multiple Dandelions Based on the Full Dataset

Now let's create the complete visualization with multiple dandelion flowers, one for each year, positioned using D3 scales!

```js
// Set up dimensions
const chartWidth = 1200;
const chartHeight = 600;
const margin = { top: 150, right: 50, bottom: 80, left: 80 };
const plotWidth = chartWidth - margin.left - margin.right;
const plotHeight = chartHeight - margin.top - margin.bottom;

// Group data by year and calculate average for each year
const yearGroups = d3.group(dandelionData, d => d.year);
const yearData = Array.from(yearGroups, ([year, values]) => ({
    year,
    avg: d3.mean(values, d => +d.avg),
    data: values
}));

// Create scales
const xScale = d3.scaleBand()
    .domain(yearData.map(d => d.year))
    .range([0, plotWidth])
    .padding(0.3);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(yearData, d => d.avg)])
    .range([plotHeight, 0]);

// Generate dandelions for each year
const allDandelions = yearData.map(yearGroup => {
    const pieData = yearGroup.data;
    const pie = d3.pie().value(d => +d.value);
    const arcs = pie(pieData);
    
    // Generate seeds for this dandelion
    const seeds = arcs.flatMap(arc => {
        const arcAngleSpan = arc.endAngle - arc.startAngle;
        const innerRadius = 8;
        const outerRadius = 40;
        const numAngularPositions = Math.max(1, Math.floor(arcAngleSpan * 10));
        const result = [];
        
        for (let i = 0; i < numAngularPositions; i++) {
            const angleOffset = (i + 0.5) / numAngularPositions * arcAngleSpan;
            const angle = arc.startAngle + angleOffset;
            const radius = innerRadius + (0.5) * (outerRadius - innerRadius);
            
            const x = radius * Math.cos(angle - Math.PI / 2);
            const y = radius * Math.sin(angle - Math.PI / 2);
            const rotation = ((angle - Math.PI / 2) * 180 / Math.PI) - 90;
            const scale = 0.1 + Math.random() * 1.5;
            
            result.push({
                x, y, rotation, scale,
                color: colorScale(arc.data.theme)
            });
        }
        
        return result;
    });
    
    // Generate pollen dots for this dandelion
    const pollenDots = [];
    const numPollenDots = 350;
    const centerRadius = 40;
    
    for (let i = 0; i < numPollenDots; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.sqrt(Math.random()) * centerRadius;
        pollenDots.push({
            x: distance * Math.cos(angle),
            y: distance * Math.sin(angle),
            r: 0.8 + Math.random() * 0.5,
            opacity: 0.6 + Math.random() * 0.4
        });
    }
    
    return {
        year: yearGroup.year,
        x: xScale(yearGroup.year) + xScale.bandwidth() / 2,
        y: yScale(yearGroup.avg),
        seeds,
        pollenDots
    };
});
```

```js
svg`<svg width="${chartWidth}" height="${chartHeight}" style="background-color: #2b2b2b">
    <g transform="translate(${margin.left}, ${margin.top})">
        <line x1="0" y1="0" x2="0" y2="${plotHeight}" stroke="#666" stroke-width="2"/>
        <text x="-40" y="${plotHeight/2}" text-anchor="middle" transform="rotate(-90, -40, ${plotHeight/2})" fill="#999" font-size="14">Average Value</text>
        <line x1="0" y1="${plotHeight}" x2="${plotWidth}" y2="${plotHeight}" stroke="#666" stroke-width="2"/>
        <text x="${plotWidth/2}" y="${plotHeight + 50}" text-anchor="middle" fill="#999" font-size="14">Year Groups</text>
        ${yScale.ticks(5).map(tick => svg`
            <g transform="translate(0, ${yScale(tick)})">
                <line x1="-5" y1="0" x2="0" y2="0" stroke="#666" stroke-width="1"/>
                <text x="-10" y="0" text-anchor="end" alignment-baseline="middle" fill="#999" font-size="12">${tick}</text>
            </g>
        `)}
        ${yearData.map(d => svg`
            <text 
                x="${xScale(d.year) + xScale.bandwidth() / 2}" 
                y="${plotHeight + 20}" 
                text-anchor="middle" 
                fill="#999" 
                font-size="12"
            >${d.year}</text>
        `)}
        ${allDandelions.map(dandelion => {
            const stemHeight = plotHeight - dandelion.y;
            const stemPath = `M0,0 C${stemHeight * 0.3},${stemHeight * 0.3} ${-stemHeight * 0.2},${stemHeight * 0.7} 0,${stemHeight}`;
            
            return svg`
            <g transform="translate(${dandelion.x}, ${dandelion.y})">
                <!-- Curved Stem -->
                <path d="${stemPath}" stroke="#6184B7" stroke-width="2" fill="none"/>
                
                <!-- Center circle -->
                <circle cx="0" cy="0" r="40" fill="#353535" />
                
                <!-- Pollen dots -->
                ${dandelion.pollenDots.map(dot => svg`
                    <circle 
                        cx="${dot.x}" 
                        cy="${dot.y}" 
                        r="${dot.r}"
                        fill="#6892ce"
                        opacity="${dot.opacity}"
                    />`
                )}
                
                <!-- Dandelion seeds -->
                ${dandelion.seeds.map(seed => svg`
                    <path 
                        d="${dandelionPath}"
                        transform="translate(${seed.x}, ${seed.y}) rotate(${seed.rotation}) scale(${seed.scale})"
                        fill="none"
                        stroke="${seed.color}"
                        stroke-width="1"
                        opacity="0.7"
                    />`
                )}
            </g>
        `})}
    </g>
</svg>`
```

---

## Dandelion chart code

Below is the complete, standalone HTML file that creates the dandelion chart. This represents the type of code you'll be able to write after mastering D3.js - combining data manipulation, scales, SVG generation, and creative visualization techniques to build custom, interactive charts that go beyond standard bar and line graphs.

While this example is advanced, it demonstrates how D3's building blocks (scales, data binding, SVG manipulation) can be combined to create unique visualizations. Don't worry if it looks complex now - by the end of these sessions, you'll understand each piece and be able to create your own custom charts!

**How to run this code:**

1. Copy the entire code below
2. Create a new file in VS Code and name it `dandelion-chart.html`
3. Paste the code into the file
4. Save the file
5. Right-click in the editor and select "Open with Live Server" (or just open the HTML file in your browser)
6. The dandelion chart will appear in your browser!

**What's in this code:**
- All the HTML structure needed (head, body, styles)
- D3.js library loaded from a CDN
- Your dandelion data embedded directly in the code
- All the D3 logic to create scales, calculate positions, and draw the visualization
- SVG elements for stems, pollen dots, and dandelion seeds

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dandelion Chart with D3.js</title>
    <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: sans-serif;
            background-color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        #chart {
            background-color: #2b2b2b;
        }
    </style>
</head>
<body>
    <svg id="chart"></svg>

    <script>
        // Data from dandelion-example.csv
        const dandelionData = [
            { year: "1996-00", theme: "agriculture", value: "6", avg: "0.5" },
            { year: "1996-00", theme: "forest", value: "13", avg: "0.5" },
            { year: "1996-00", theme: "climate", value: "27", avg: "0.5" },
            { year: "1996-00", theme: "energy", value: "12", avg: "0.5" },
            { year: "1996-00", theme: "governance", value: "23", avg: "0.5" },
            { year: "1996-00", theme: "health", value: "15", avg: "0.5" },
            { year: "1996-00", theme: "water", value: "5", avg: "0.5" },
            
            { year: "2001-05", theme: "agriculture", value: "9", avg: "1.74" },
            { year: "2001-05", theme: "forest", value: "11", avg: "1.74" },
            { year: "2001-05", theme: "climate", value: "23", avg: "1.74" },
            { year: "2001-05", theme: "energy", value: "9", avg: "1.74" },
            { year: "2001-05", theme: "governance", value: "28", avg: "1.74" },
            { year: "2001-05", theme: "health", value: "13", avg: "1.74" },
            { year: "2001-05", theme: "water", value: "7", avg: "1.74" },
            
            { year: "2006-10", theme: "agriculture", value: "11", avg: "1" },
            { year: "2006-10", theme: "forest", value: "10", avg: "1" },
            { year: "2006-10", theme: "climate", value: "19", avg: "1" },
            { year: "2006-10", theme: "energy", value: "12", avg: "1" },
            { year: "2006-10", theme: "governance", value: "30", avg: "1" },
            { year: "2006-10", theme: "health", value: "11", avg: "1" },
            { year: "2006-10", theme: "water", value: "6", avg: "1" },
            
            { year: "2011-15", theme: "agriculture", value: "11", avg: "2.5" },
            { year: "2011-15", theme: "forest", value: "10", avg: "2.5" },
            { year: "2011-15", theme: "climate", value: "19", avg: "2.5" },
            { year: "2011-15", theme: "energy", value: "10", avg: "2.5" },
            { year: "2011-15", theme: "governance", value: "31", avg: "2.5" },
            { year: "2011-15", theme: "health", value: "13", avg: "2.5" },
            { year: "2011-15", theme: "water", value: "6", avg: "2.5" },
            
            { year: "2021-25", theme: "agriculture", value: "12", avg: "1.08" },
            { year: "2021-25", theme: "forest", value: "9", avg: "1.08" },
            { year: "2021-25", theme: "climate", value: "25", avg: "1.08" },
            { year: "2021-25", theme: "energy", value: "7", avg: "1.08" },
            { year: "2021-25", theme: "governance", value: "30", avg: "1.08" },
            { year: "2021-25", theme: "health", value: "11", avg: "1.08" },
            { year: "2021-25", theme: "water", value: "5", avg: "1.08" }
        ];

        // Dandelion seed path
        const dandelionPath = "M13.4811 65.9498C13.3263 65.945 13.2029 66.085 13.2054 66.2625C13.208 66.44 13.3355 66.5879 13.4904 66.5927M13.4811 65.9498C13.6359 65.9546 13.7635 66.1024 13.7661 66.2799C13.7686 66.4575 13.6452 66.5975 13.4904 66.5927M13.4811 65.9498L13.4904 66.5927M13.4811 65.9498C12.9307 57.8098 11.2329 52.4929 6.82563 51.2851M9.32032 62.3935C9.16549 62.3887 9.04205 62.5287 9.04461 62.7062C9.04716 62.8838 9.17473 63.0316 9.32955 63.0364M9.32032 62.3935C9.47514 62.3983 9.60272 62.5461 9.60527 62.7236C9.60782 62.9012 9.48438 63.0412 9.32955 63.0364M9.32032 62.3935L9.32955 63.0364M9.32032 62.3935C8.88095 57.9296 8.375 55.8334 6.82563 51.2851M6.38862 66.3722C6.23379 66.3673 6.11035 66.5074 6.1129 66.6849C6.11546 66.8624 6.24303 67.0102 6.39785 67.015M6.38862 66.3722C6.54344 66.377 6.67102 66.5248 6.67357 66.7023C6.67612 66.8798 6.55268 67.0198 6.39785 67.015M6.38862 66.3722L6.39785 67.015M6.38862 66.3722C5.97536 59.3268 6.03328 56.4585 6.82563 51.2851M3.88209 60.9395C3.72727 60.9347 3.60383 61.0747 3.60638 61.2522C3.60893 61.4297 3.7365 61.5776 3.89133 61.5824M3.88209 60.9395C4.03691 60.9443 4.16449 61.0921 4.16704 61.2696C4.16959 61.4471 4.04615 61.5872 3.89133 61.5824M3.88209 60.9395L3.89133 61.5824M3.88209 60.9395C4.6012 56.1584 5.31236 54.5756 6.82563 51.2851M0.77582 65.7695C0.620997 65.7647 0.497556 65.9047 0.500107 66.0822C0.502658 66.2597 0.630234 66.4075 0.785057 66.4124M0.77582 65.7695C0.930643 65.7743 1.05822 65.9221 1.06077 66.0996C1.06332 66.2771 0.93988 66.4172 0.785057 66.4124M0.77582 65.7695L0.785057 66.4124M0.77582 65.7695C1.16914 60.6411 2.62681 51.5831 6.82563 51.2851M7.50153 0.248276C10.6053 5.67078 11.605 32.6709 6.82563 51.2851";

        // Chart dimensions
        const chartWidth = 1200;
        const chartHeight = 600;
        const margin = { top: 150, right: 50, bottom: 80, left: 80 };
        const plotWidth = chartWidth - margin.left - margin.right;
        const plotHeight = chartHeight - margin.top - margin.bottom;

        // Select SVG and set dimensions
        const svg = d3.select("#chart")
            .attr("width", chartWidth)
            .attr("height", chartHeight);

        // Create main group with margins
        const g = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Group data by year and calculate averages
        const yearGroups = d3.group(dandelionData, d => d.year);
        const yearData = Array.from(yearGroups, ([year, values]) => ({
            year,
            avg: d3.mean(values, d => +d.avg),
            data: values
        }));

        // Create scales
        const xScale = d3.scaleBand()
            .domain(yearData.map(d => d.year))
            .range([0, plotWidth])
            .padding(0.3);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(yearData, d => d.avg)])
            .range([plotHeight, 0]);

        // Create color scale (using actual themes from data)
        const colorScale = d3.scaleOrdinal()
            .domain(['agriculture', 'forest', 'climate', 'energy', 'governance', 'health', 'water'])
            .range(['#3a5cbc', '#5277c5', '#6892ce', '#7daed7', '#95cae1', '#b2e4ec', '#eff7ff']);

        // Draw Y-axis
        g.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", plotHeight)
            .attr("stroke", "#666")
            .attr("stroke-width", 2);

        // Y-axis label
        g.append("text")
            .attr("x", -40)
            .attr("y", plotHeight / 2)
            .attr("text-anchor", "middle")
            .attr("transform", `rotate(-90, -40, ${plotHeight / 2})`)
            .attr("fill", "#999")
            .attr("font-size", 14)
            .text("Average Value");

        // Draw X-axis
        g.append("line")
            .attr("x1", 0)
            .attr("y1", plotHeight)
            .attr("x2", plotWidth)
            .attr("y2", plotHeight)
            .attr("stroke", "#666")
            .attr("stroke-width", 2);

        // X-axis label
        g.append("text")
            .attr("x", plotWidth / 2)
            .attr("y", plotHeight + 50)
            .attr("text-anchor", "middle")
            .attr("fill", "#999")
            .attr("font-size", 14)
            .text("Year Groups");

        // Draw Y-axis ticks
        yScale.ticks(5).forEach(tick => {
            const tickGroup = g.append("g")
                .attr("transform", `translate(0, ${yScale(tick)})`);
            
            tickGroup.append("line")
                .attr("x1", -5)
                .attr("y1", 0)
                .attr("x2", 0)
                .attr("y2", 0)
                .attr("stroke", "#666")
                .attr("stroke-width", 1);
            
            tickGroup.append("text")
                .attr("x", -10)
                .attr("y", 0)
                .attr("text-anchor", "end")
                .attr("alignment-baseline", "middle")
                .attr("fill", "#999")
                .attr("font-size", 12)
                .text(tick);
        });

        // Draw X-axis labels
        yearData.forEach(d => {
            g.append("text")
                .attr("x", xScale(d.year) + xScale.bandwidth() / 2)
                .attr("y", plotHeight + 20)
                .attr("text-anchor", "middle")
                .attr("fill", "#999")
                .attr("font-size", 12)
                .text(d.year);
        });

        // Generate and draw dandelions
        yearData.forEach(yearGroup => {
            const pieData = yearGroup.data;
            const pie = d3.pie().value(d => +d.value);
            const arcs = pie(pieData);
            
            // Generate seeds for this dandelion
            const seeds = arcs.flatMap(arc => {
                const arcAngleSpan = arc.endAngle - arc.startAngle;
                const innerRadius = 8;
                const outerRadius = 40;
                const numAngularPositions = Math.max(1, Math.floor(arcAngleSpan * 10));
                const result = [];
                
                for (let i = 0; i < numAngularPositions; i++) {
                    const angleOffset = (i + 0.5) / numAngularPositions * arcAngleSpan;
                    const angle = arc.startAngle + angleOffset;
                    const radius = innerRadius + (0.5) * (outerRadius - innerRadius);
                    
                    const x = radius * Math.cos(angle - Math.PI / 2);
                    const y = radius * Math.sin(angle - Math.PI / 2);
                    const rotation = ((angle - Math.PI / 2) * 180 / Math.PI) - 90;
                    const scale = 0.1 + Math.random() * 1.5;
                    
                    result.push({
                        x, y, rotation, scale,
                        color: colorScale(arc.data.theme)
                    });
                }
                
                return result;
            });
            
            // Generate pollen dots
            const pollenDots = [];
            const numPollenDots = 350;
            const centerRadius = 40;
            
            for (let i = 0; i < numPollenDots; i++) {
                const angle = Math.random() * 2 * Math.PI;
                const distance = Math.sqrt(Math.random()) * centerRadius;
                pollenDots.push({
                    x: distance * Math.cos(angle),
                    y: distance * Math.sin(angle),
                    r: 0.8 + Math.random() * 0.5,
                    opacity: 0.6 + Math.random() * 0.4
                });
            }
            
            // Position for this dandelion
            const dandelionX = xScale(yearGroup.year) + xScale.bandwidth() / 2;
            const dandelionY = yScale(yearGroup.avg);
            
            // Create group for this dandelion
            const dandelionGroup = g.append("g")
                .attr("transform", `translate(${dandelionX}, ${dandelionY})`);
            
            // Draw curved stem
            const stemHeight = plotHeight - dandelionY;
            const stemPath = `M0,0 C${stemHeight * 0.3},${stemHeight * 0.3} ${-stemHeight * 0.2},${stemHeight * 0.7} 0,${stemHeight}`;
            
            dandelionGroup.append("path")
                .attr("d", stemPath)
                .attr("stroke", "#6184B7")
                .attr("stroke-width", 2)
                .attr("fill", "none");
            
            // Draw center circle
            dandelionGroup.append("circle")
                .attr("cx", 0)
                .attr("cy", 0)
                .attr("r", 40)
                .attr("fill", "#353535");
            
            // Draw pollen dots
            pollenDots.forEach(dot => {
                dandelionGroup.append("circle")
                    .attr("cx", dot.x)
                    .attr("cy", dot.y)
                    .attr("r", dot.r)
                    .attr("fill", "#6892ce")
                    .attr("opacity", dot.opacity);
            });
            
            // Draw dandelion seeds
            seeds.forEach(seed => {
                dandelionGroup.append("path")
                    .attr("d", dandelionPath)
                    .attr("transform", `translate(${seed.x}, ${seed.y}) rotate(${seed.rotation}) scale(${seed.scale})`)
                    .attr("fill", "none")
                    .attr("stroke", seed.color)
                    .attr("stroke-width", 1)
                    .attr("opacity", 0.7);
            });
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