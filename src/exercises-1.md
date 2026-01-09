---
title: Exercises
---

### Practice Exercises

These exercises will help you practice what you've learned in Session 1. Start with HTML, then move through CSS, JavaScript, SVG, and finally some simple D3 selections.

---

## Exercise 1: HTML Basics

**Task:** Create a simple HTML page structure

Create an HTML file with:
- A proper DOCTYPE and html structure
- A head section with a title "My First Web Page"
- A body with:
  - An h1 heading that says "Welcome to My Page"
  - A paragraph describing yourself
  - An unordered list with 3 of your favorite hobbies
  - A div with an id of "chart-container"

<details>
<summary>View Solution</summary>

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <h1>Welcome to My Page</h1>
    <p>Hi! I'm learning web development and D3.js for data visualization.</p>
    <ul>
        <li>Reading</li>
        <li>Coding</li>
        <li>Hiking</li>
    </ul>
    <div id="chart-container"></div>
</body>
</html>
```

</details>

---

## Exercise 2: CSS Styling

**Task:** Style your HTML page

Add a style section to your HTML page and:
- Change the background color of the body to a light blue
- Center the h1 heading and make it dark blue
- Give the paragraph a maximum width of 600px and center it
- Style the list items with a different color
- Give the div with id "chart-container" a border, padding, and background color

<details>
<summary>View Solution</summary>

```
<style>
    body {
        background-color: #e3f2fd;
        font-family: sans-serif;
        margin: 0;
        padding: 20px;
    }
    
    h1 {
        color: #1565c0;
        text-align: center;
    }
    
    p {
        max-width: 600px;
        margin: 20px auto;
        line-height: 1.6;
    }
    
    li {
        color: #424242;
        margin: 10px 0;
    }
    
    #chart-container {
        border: 2px solid #1565c0;
        padding: 20px;
        background-color: white;
        max-width: 800px;
        margin: 20px auto;
    }
</style>
```

</details>

---

## Exercise 3: JavaScript Basics

**Task:** Add interactivity with JavaScript

Add a script section to your page and:
- Create a variable called `userName` with your name
- Create a function called `greetUser` that displays an alert saying "Hello, [userName]!"
- Add a button to your HTML that calls this function when clicked
- Create an array of 5 numbers and calculate their sum using a loop

<details>
<summary>View Solution</summary>

HTML:
```
<button id="greet-btn">Click to Greet</button>
<p id="sum-display"></p>
```

JavaScript:
```
<script>
    // Variable with name
    const userName = "Alex";
    
    // Function to greet user
    function greetUser() {
        alert("Hello, " + userName + "!");
    }
    
    // Add click event to button
    document.getElementById("greet-btn").addEventListener("click", greetUser);
    
    // Array of numbers
    const numbers = [10, 25, 30, 15, 20];
    let sum = 0;
    
    // Calculate sum using loop
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    
    // Display the sum
    document.getElementById("sum-display").textContent = "Sum of numbers: " + sum;
</script>
```

</details>

---

## Exercise 4: SVG Drawing

**Task:** Create basic shapes with SVG

Inside your chart-container div, add an SVG element and:
- Set the SVG width to 400 and height to 300
- Draw a blue circle at position (100, 100) with radius 50
- Draw a red rectangle at position (200, 50) with width 120 and height 80
- Add a green line from (50, 250) to (350, 250) with stroke-width of 3
- Add a text element at (200, 150) that says "My First SVG"

<details>
<summary>View Solution</summary>

```
<div id="chart-container">
    <svg width="400" height="300" style="border: 1px solid #ccc;">
        <!-- Circle -->
        <circle cx="100" cy="100" r="50" fill="blue" />
        
        <!-- Rectangle -->
        <rect x="200" y="50" width="120" height="80" fill="red" />
        
        <!-- Line -->
        <line x1="50" y1="250" x2="350" y2="250" stroke="green" stroke-width="3" />
        
        <!-- Text -->
        <text x="200" y="150" text-anchor="middle" fill="black" font-size="16">
            My First SVG
        </text>
    </svg>
</div>
```

</details>

---

## Exercise 5: D3 Selection Basics

**Task:** Use D3 to manipulate DOM elements (similar to JavaScript DOM manipulation)

Load D3 library and use D3 selections to:
- Select the h1 element and change its text color to purple
- Select the paragraph and add some bold text to it
- Select the chart-container and change its background color
- Create a new paragraph element and append it to the body

<details>
<summary>View Solution</summary>

```
<!-- Add D3 library -->
<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>

<script>
    // Select h1 and change color
    d3.select("h1").style("color", "purple");
    
    // Select paragraph and add bold text
    d3.select("p").append("strong").text(" This text was added with D3!");
    
    // Select chart-container and change background
    d3.select("#chart-container").style("background-color", "#fff3e0");
    
    // Create a new paragraph and append to body
    d3.select("body")
        .append("p")
        .text("This paragraph was created using D3.select()!")
        .style("text-align", "center")
        .style("color", "green");
</script>
```

</details>

---

## Exercise 6: D3 Select and Modify SVG

**Task:** Use D3 to select and modify SVG elements

Using D3, select SVG elements and:
- Change the circle's fill color to orange
- Change the rectangle's opacity to 0.5
- Change the line's stroke color to blue
- Add a new circle to the SVG at position (300, 200) with radius 30

<details>
<summary>View Solution</summary>

```
<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>

<script>
    // Select the SVG
    const svg = d3.select("svg");
    
    // Change circle color
    svg.select("circle").attr("fill", "orange");
    
    // Change rectangle opacity
    svg.select("rect").attr("opacity", 0.5);
    
    // Change line color
    svg.select("line").attr("stroke", "blue");
    
    // Add new circle
    svg.append("circle")
        .attr("cx", 300)
        .attr("cy", 200)
        .attr("r", 30)
        .attr("fill", "pink")
        .attr("stroke", "black")
        .attr("stroke-width", 2);
</script>
```

</details>

---

## Challenge: Combine Everything!

**Task:** Create an interactive SVG visualization using all skills learned

Create a complete HTML page that:
1. Has proper HTML structure with head and body
2. Includes CSS styling for the page
3. Creates an SVG canvas (500x400)
4. Uses D3 to draw 5 circles at different positions
5. Adds a button that, when clicked, changes all circle colors to random colors
6. Displays a text message showing how many times the button was clicked

<details>
<summary>View Solution</summary>

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Session 1 Challenge</title>
    <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
    <style>
        body {
            font-family: sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
            text-align: center;
        }
        
        h1 {
            color: #1976d2;
        }
        
        #svg-container {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            display: inline-block;
            margin: 20px;
        }
        
        button {
            background-color: #1976d2;
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 16px;
            border-radius: 4px;
            cursor: pointer;
            margin: 10px;
        }
        
        button:hover {
            background-color: #1565c0;
        }
        
        #click-count {
            font-size: 18px;
            color: #424242;
            margin: 10px;
        }
    </style>
</head>
<body>
    <h1>Interactive Circle Color Changer</h1>
    <div id="svg-container"></div>
    <br>
    <button id="change-colors">Change Colors</button>
    <p id="click-count">Button clicked: 0 times</p>

    <script>
        // Create SVG
        const svg = d3.select("#svg-container")
            .append("svg")
            .attr("width", 500)
            .attr("height", 400);

        // Circle positions
        const circleData = [
            { cx: 100, cy: 100 },
            { cx: 250, cy: 100 },
            { cx: 400, cy: 100 },
            { cx: 175, cy: 250 },
            { cx: 325, cy: 250 }
        ];

        // Draw circles using D3
        svg.selectAll("circle")
            .data(circleData)
            .enter()
            .append("circle")
            .attr("cx", d => d.cx)
            .attr("cy", d => d.cy)
            .attr("r", 40)
            .attr("fill", "#64b5f6")
            .attr("stroke", "#1976d2")
            .attr("stroke-width", 2);

        // Click counter
        let clickCount = 0;

        // Function to generate random color
        function randomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        // Button click handler
        d3.select("#change-colors").on("click", function() {
            // Increment counter
            clickCount++;
            
            // Update click count display
            d3.select("#click-count").text("Button clicked: " + clickCount + " times");
            
            // Change all circle colors
            svg.selectAll("circle")
                .transition()
                .duration(500)
                .attr("fill", randomColor);
        });
    </script>
</body>
</html>
```

</details>

---


<style>
    * {
        font-family: sans-serif;
    }
</style>

