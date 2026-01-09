---
title: Basic SVG
---

### Web Development Basics: SVG

SVG (Scalable Vector Graphics), standardized in 2001 by W3C, creates resolution-independent graphics. D3.js uses SVG to draw data-driven shapes, charts, and interactive visualizations in browsers.

---

## What is SVG?

SVG (Scalable Vector Graphics) is a way to draw graphics using code instead of pixels. Unlike regular images (JPG, PNG) that are made of tiny colored squares, SVG graphics are made of mathematical shapes that stay crisp at any size.

Think of it like this:
- Regular images are like mosaics - made of tiny tiles that get blurry when you zoom in
- SVG is like using a ruler and compass - the shapes stay perfect no matter how close you look

**Why SVG matters for D3**:
- D3 creates visualizations by drawing SVG shapes
- SVG shapes can be styled with CSS
- SVG elements can be manipulated with JavaScript
- SVG graphics scale perfectly on any screen size

---

## SVG attribute basics

Every SVG graphic starts with an svg tag that creates a canvas to draw on:

```
<svg width="500" height="300">
  <!-- shapes go here -->
</svg>
```

The width and height define the drawing area in pixels. **Everything you draw must fit inside this container**.

**Interactive SVG Playground**

*Try adjusting the controls below to see how SVG attributes work in real-time. Play with the sliders to change the width and height, and pick different background colors. Notice how the SVG canvas and the elements inside it respond to your changes. This is exactly how D3.js manipulates SVG elements based on your data!*

```js
const svgWidth = view(Inputs.range([50, 500], {label: "SVG width", step: 1}));

const svgHeight = view(Inputs.range([50, 500], {label: "SVG height", step: 1}));

const svgColor = view(Inputs.color({label: "SVG background color", value: "#cee2f3"}));

```

<div>
    <div class="card">
        <div>
            <pre><code>&lt;svg width="${svgWidth}" height="${svgHeight}" style="background-color:${svgColor}"&gt;
    &lt;text x="${svgWidth/2}" y="${svgHeight/2}" text-anchor="middle"&gt;
    Hi
    &lt;/text&gt;
&lt;/svg&gt;</code></pre>
        </div>
        <div>${svg`<svg width=${svgWidth} height=${svgHeight} style="background-color:${svgColor}"><text x=${svgWidth/2} y=${svgHeight/2} text-anchor="middle" style="font-weight:bold">Hi</text></svg>`}</div>
    </div>
    <div class="card">
        <div><pre><code>&lt;svg width="${svgWidth}" height="${svgHeight}" style="background-color:${svgColor}"&gt;
    &lt;circle cx="136" cy="136" r=50 fill="#353535ff"/&gt;
&lt;/svg&gt;</code></pre>
        </div>
        <div>${svg`<svg width=${svgWidth} height=${svgHeight} style="background-color:${svgColor}"><circle cx=136 cy=136 r=50 fill="#353535ff"/></svg>`}</div>
    </div>
</div>

---

## SVG viewbox

The viewbox is a powerful SVG attribute that defines what portion of the SVG canvas is visible. Think of it like a camera lens - it determines what part of your drawing you're looking at and how zoomed in or out you are.

**Why viewbox matters**:

Makes SVG truly scalable and responsive
Lets you zoom in/out without changing element sizes
Allows you to focus on specific parts of your drawing
Essential for creating responsive D3 visualizations

**Interactive ViewBox Playground**

*Adjust the controls below to see how viewBox changes what you see. The SVG container size stays the same, but the viewBox controls what portion of the drawing is visible and how zoomed in it appears.*

```js
const viewBoxMinX = view(Inputs.range([0, 200], {label: "svg viewBox min-x", step: 1, value: 0}));

const viewBoxMinY = view(Inputs.range([0, 200], {label: "svg viewBox min-y", step: 1, value: 0}));

const viewBoxWidth = view(Inputs.range([50, 500], {label: "svg viewBox width", step: 1, value: 400}));

const viewBoxHeight = view(Inputs.range([50, 500], {label: "svg viewBox height", step: 1, value: 300}));
```

<div>
    <div class="card">
        <div><pre><code>&lt;svg width="400" height="300" viewBox="${viewBoxMinX} ${viewBoxMinY} ${viewBoxWidth} ${viewBoxHeight}"&gt;
    &lt;rect x="50" y="50" width="100" height="80" fill="#3a5cbc"/&gt;
    &lt;circle cx="250" cy="150" r="60" fill="#95cae1"/&gt;
    &lt;text x="200" y="250" font-size="24" text-anchor="middle"&gt;ViewBox Demo&lt;/text&gt;
&lt;/svg&gt;</code></pre>
        </div>
        <div>${svg`<svg width="400" height="300" viewBox="${viewBoxMinX} ${viewBoxMinY} ${viewBoxWidth} ${viewBoxHeight}" style="border: 0.1px solid #dbdbdbff;"> <rect x="50" y="50" width="100" height="80" fill="#3a5cbc"/> <circle cx="250" cy="150" r="60" fill="#95cae1"/> <text x="200" y="250" font-size="24" text-anchor="middle">ViewBox Demo</text> </svg>`}
        </div>
    </div>
</div>

---

## SVG coordinate system

SVG uses a coordinate system where:
- The origin (0, 0) is the top-left corner
- x increases going right
- y increases going down

```
(0,0) -----> x increases
  |
  |
  v
y increases
```

This means:
- (0, 0) is top-left
- (500, 0) is top-right
- (0, 300) is bottom-left
- (500, 300) is bottom-right


**Interactive coordinate system playground**

*Move the sliders below to position a circle anywhere on the SVG canvas. Watch how the x and y coordinates change and notice that y increases downward!*

```js
const circleX = view(Inputs.range([0, 400], {label: "Circle x position", step: 1, value: 200}));

const circleY = view(Inputs.range([0, 300], {label: "Circle y position", step: 1, value: 150}));
```

<div>${svg`<svg width="400" height="300" style="background-color: #f5f5f5; border: 1px solid #333;">
<line x1="0" y1="0" x2="400" y2="0" stroke="#ddd" stroke-width="1"/>
<line x1="0" y1="0" x2="0" y2="300" stroke="#ddd" stroke-width="1"/>
        <line x1="0" y1="50" x2="400" y2="50" stroke="#eee" stroke-width="1"/>
        <line x1="0" y1="100" x2="400" y2="100" stroke="#eee" stroke-width="1"/>
        <line x1="0" y1="150" x2="400" y2="150" stroke="#eee" stroke-width="1"/>
        <line x1="0" y1="200" x2="400" y2="200" stroke="#eee" stroke-width="1"/>
        <line x1="0" y1="250" x2="400" y2="250" stroke="#eee" stroke-width="1"/>
        <!-- Vertical grid lines -->
        <line x1="50" y1="0" x2="50" y2="300" stroke="#eee" stroke-width="1"/>
        <line x1="100" y1="0" x2="100" y2="300" stroke="#eee" stroke-width="1"/>
        <line x1="150" y1="0" x2="150" y2="300" stroke="#eee" stroke-width="1"/>
        <line x1="200" y1="0" x2="200" y2="300" stroke="#eee" stroke-width="1"/>
        <line x1="250" y1="0" x2="250" y2="300" stroke="#eee" stroke-width="1"/>
        <line x1="300" y1="0" x2="300" y2="300" stroke="#eee" stroke-width="1"/>
        <line x1="350" y1="0" x2="350" y2="300" stroke="#eee" stroke-width="1"/>
        <!-- Your circle -->
        <circle cx=${circleX} cy=${circleY} r="15" fill="#f8bc93ff" stroke="black"/>
        <text x=${circleX + 10} y=${circleY + 28} text-anchor="middle" font-size="14" fill="#333" font-weight="bold">
            (${circleX}, ${circleY})
        </text>
        <text x="5" y="15" font-size="12" fill="#666">(0, 0)</text>
        <text x="360" y="15" font-size="12" fill="#666">(400, 0)</text>
        <text x="5" y="295" font-size="12" fill="#666">(0, 300)</text>
        <text x="340" y="295" font-size="12" fill="#666">(400, 300)</text>
</svg>`}</div>
</div>

---


## SVG shapes

SVG provides several basic shapes you can draw:

**Rectangle**

```
<rect x="10" y="20" width="100" height="50" fill="blue" />
```

- x and y set the top-left corner position
- width and height set the size
- fill sets the color inside

**Circle**

```
<circle cx="100" cy="100" r="50" fill="red" />
```

- cx and cy set the center position
- r sets the radius
- fill sets the color

**Line**

```
<line x1="0" y1="0" x2="100" y2="100" stroke="black" stroke-width="2" />
```

- x1, y1 is the start point
- x2, y2 is the end point
- stroke sets the line color
- stroke-width sets the line thickness

- x and y set where the text starts
- font-size controls text size
- Content goes between the tags

**Path**

```
<path d="M 10 10 L 100 100 L 10 100 Z" fill="green" />
```

- d contains drawing commands (M = move, L = line, Z = close)
- Most flexible shape - can draw anything
- Used for complex shapes and custom graphics

**Text**

```
<text x="50" y="50" font-size="20" fill="black">Hello</text>
```

---

## SVG Styling

You can style SVG elements using attributes or CSS:

Using attributes:

```
<circle cx="50" cy="50" r="40" fill="blue" stroke="black" stroke-width="2" />
```

Using CSS:

```
<style>
  .my-circle {
    fill: blue;
    stroke: black;
    stroke-width: 2px;
  }
</style>

<circle cx="50" cy="50" r="40" class="my-circle" />
```

Common style properties:
- fill - interior color
- stroke - border color
- stroke-width - border thickness
- opacity - transparency (0 to 1)
- fill-opacity - just the fill transparency
- stroke-opacity - just the stroke transparency

---

## Grouping Elements


SVG `<g>` Element. Use g (group) to organize and transform multiple shapes together:

```
<g transform="translate(50, 50)">
  <circle cx="0" cy="0" r="20" fill="red" />
  <circle cx="30" cy="0" r="20" fill="blue" />
</g>
```

Groups let you:
- Move multiple shapes together
- Apply transforms to many elements at once
- Organize your SVG structure
- Apply styles to multiple elements

---

## SVG Transforms

Transforms let you move, rotate, and scale elements:

**Translate (move)**:

```
<rect x="0" y="0" width="50" height="50" transform="translate(100, 100)" />
```

Moves the rectangle 100 pixels right and 100 pixels down.

*Adjust the sliders to move the rectangle around the canvas.*

```js
const translateX = view(Inputs.range([0, 350], {label: "Translate X", step: 1, value: 100}));

const translateY = view(Inputs.range([0, 250], {label: "Translate Y", step: 1, value: 100}));
```

<div>${svg`<svg width="400" height="300" style="background-color: #353535ff; border: 1px solid #333;"> <rect x="0" y="0" width="50" height="50" fill="#96aff5ff" transform="translate(${translateX}, ${translateY})" /> <text x="${translateX + 25}" y="${translateY + 70}" font-size="12" text-anchor="middle" fill="#e2e2e2ff">translate(${translateX}, ${translateY})</text> <circle cx="0" cy="0" r="3" fill="red"/> <text x="5" y="15" font-size="12" fill="#e2e2e2ff">Origin (0,0)</text> </svg>`}</div>

**Rotate**:

```
<rect x="0" y="0" width="50" height="50" transform="rotate(45)" />
```

Rotates 45 degrees around the origin (0,0).

*Adjust the slider to rotate the rectangle.*
```js
const rotateAngle = view(Inputs.range([0, 360], {label: "Rotate degrees", step: 1, value: 45}));
```

<div>${svg`<svg width="400" height="300" style="background-color: #353535ff; border: 1px solid #333;"> <g transform="translate(200, 150)"> <circle cx="0" cy="0" r="3" fill="red"/> <rect x="-25" y="-25" width="50" height="50" fill="#96aff5ff" transform="rotate(${rotateAngle})" /> <text x="0" y="50" font-size="12" text-anchor="middle" fill="#e2e2e2ff">rotate(${rotateAngle}°)</text> </g> </svg>`}</div>

**Scale**:

```
<circle cx="50" cy="50" r="20" transform="scale(1)" />
```

Makes the circle twice as big.

*Adjust the slider to scale the circle.*

```js
const scaleValue = view(Inputs.range([0.5, 8], {label: "Scale factor", step: 0.1, value: 1}));
```

<div>${svg`<svg width="400" height="300" style="background-color: #353535ff; border: 1px solid #333;"> <g transform="translate(200, 150)"><circle cx="0" cy="0" r="40" fill="#6892ce" opacity="0.2"/> <circle cx="0" cy="0" r="20" fill="#96aff5ff" transform="scale(${scaleValue})" /> <text x="0" y="80" font-size="12" text-anchor="middle" fill="#e2e2e2ff">scale(${scaleValue.toFixed(1)})</text> </g> </svg>`}</div>

Combining transforms:

```
<rect x="0" y="0" width="50" height="50" transform="translate(100, 100) rotate(45)" />
```

You can apply multiple transforms to the same element!

Adjust all three sliders to see combined transforms in action.

```js
const combineTranslateX = view(Inputs.range([0, 300], {label: "Translate X", step: 1, value: 150}));

const combineRotate = view(Inputs.range([0, 360], {label: "Rotate", step: 1, value: 0}));

const combineScale = view(Inputs.range([0.5, 2], {label: "Scale", step: 0.1, value: 1}));
```

<div>${svg`<svg width="400" height="300" style="background-color: #353535ff; border: 1px solid #333;"> <rect x="0" y="125" width="50" height="50" fill="#ff944dff" transform="translate(${combineTranslateX}, 0) rotate(${combineRotate}, 25, 25) scale(${combineScale})" stroke="#e2e2e2ff" stroke-width="2"/> <text x="200" y="250" font-size="12" text-anchor="middle" fill="#e2e2e2ff">translate(${combineTranslateX}) rotate(${combineRotate}°) scale(${combineScale.toFixed(1)})</text> <circle cx="0" cy="0" r="3" fill="red"/> <text x="5" y="15" font-size="12" fill="#e2e2e2ff">Origin</text> </svg>`}</div>

<div class="note">Note: The order of transforms matters! Transforms are applied from right to left.</div>

---





<style>
    * {
        font-family: sans-serif;
    }
</style>
