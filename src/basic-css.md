---
title: Basic CSS
---

### Web Development Basics: CSS

CSS, created in 1996 by Håkon Wium Lie, styles web content. D3.js uses CSS to control colors, sizes, fonts, and visual styling of SVG elements and charts.

---

## What is CSS?

CSS (Cascading Style Sheets) is the styling language of the web. While HTML provides structure, CSS makes it look good.

Think of it like this:
- HTML is the house structure (walls, rooms, doors)
- CSS is the interior design (paint colors, furniture style, decorations)
- JavaScript is the functionality (lights turning on, doors opening)

---

## Why CSS Matters for D3

When you create D3 visualizations, CSS controls:
- Colors of your chart elements
- Sizes of text and shapes
- Fonts and typography
- Spacing and layout
- Hover effects and interactivity
- Responsive design for different screen sizes

---

## CSS Syntax

CSS follows a simple pattern:

```
selector {
    property: value;
    property: value;
}
```

**Breaking it down:**
- **Selector** - Which HTML element(s) to style
- **Property** - What aspect to change (color, size, etc.)
- **Value** - What to change it to
- **Curly braces** `{}` - Wrap all the styles for that selector
- **Semicolon** `;` - Ends each property-value pair

**Example:**

```
svg {
    background-color: #2b2b2b;
    width: 800px;
    height: 600px;
}
```

This says: "For all SVG elements, make the background dark gray, width 800 pixels, and height 600 pixels."

---

## CSS Selectors

Selectors tell CSS which elements to style. Here are the most common:

**Element Selector**

Targets all elements of a specific type:

```
svg {
    background-color: white;
}

circle {
    fill: blue;
}

text {
    font-size: 14px;
}
```

**Class Selector**

Targets elements with a specific class (use a dot `.`):

```
.chartContainer {
    margin: 20px;
    padding: 10px;
}

.dandelionSeed {
    stroke: orange;
    opacity: 0.7;
}
```

**ID Selector**

Targets a single element with a specific ID (use a hash `#`):

```
#mainChart {
    border: 2px solid black;
}
```

**Multiple Selectors**

Style multiple elements at once (use commas):

```
h1, h2, h3 {
    font-family: Arial, sans-serif;
    color: #333;
}
```

**Descendant Selector**

Target elements inside other elements (use space):

```
.chartContainer svg {
    border: 1px solid gray;
}
```

This means: "Style SVG elements that are inside an element with class 'chartContainer'"

---


## Three Ways to Add CSS

**1. Internal CSS (in the HTML file)**

In the `<head>` section:

```
<head>
    <style>
        svg {
            background-color: #2b2b2b;
        }
    </style>
</head>
```

**Pros:** Everything in one file, good for small projects
**Cons:** Harder to reuse styles across multiple pages

**2. External CSS (separate file)**

Create a file called `styles.css`:

```
svg {
    background-color: #2b2b2b;
}

.chartContainer {
    margin: 20px auto;
}
```

Link it in your HTML `<head>`:

```
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```

**Pros:** Clean separation, reusable, better for large projects
**Cons:** Extra HTTP request (usually not a problem)

**3. Inline CSS (directly on elements)**

```
<div style="background-color: blue; padding: 10px;">
    Content here
</div>
```

---

## Key Concepts Checklist

Before moving on, make sure you understand:

- **CSS Syntax** - `selector { property: value; }`
- **Selectors** - Element, class (`.name`), ID (`#name`)
- **Common properties** - `color`, `background-color`, `width`, `height`
- **Where to put CSS** - Internal `<style>` vs external file

---

## Quick Reference

| Property | What It Does | Example |
|----------|--------------|---------|
| `color` | Text color | `color: blue;` |
| `background-color` | Background color | `background-color: #f5f5f5;` |
| `fill` | SVG interior color | `fill: orange;` |
| `stroke` | SVG outline color | `stroke: black;` |
| `stroke-width` | SVG outline thickness | `stroke-width: 2px;` |
| `opacity` | Transparency (0-1) | `opacity: 0.7;` |
| `font-size` | Text size | `font-size: 16px;` |
| `font-family` | Font type | `font-family: Arial;` |
| `margin` | Space outside | `margin: 20px;` |
| `padding` | Space inside | `padding: 10px;` |
| `width` | Element width | `width: 600px;` |
| `height` | Element height | `height: 400px;` |

---

## Practice Exercises

**Exercise 1: Style Your First Page**

1. Open your `my-first-page.html` from the HTML exercises
2. Add a `<style>` section in the `<head>`
3. Style the page:
   - Change body background to light gray
   - Make h1 text blue and centered
   - Give paragraphs a bigger font size (18px)
   - Add padding to the body (20px)

**Exercise 2: Create a Styled Container**

1. Create `styled-chart.html`
2. Add a div with `class="chartContainer"`
3. Style the container:
   - Width: 800px
   - Background: white
   - Border: 2px solid #333
   - Padding: 30px
   - Margin: 50px auto (this centers it!)
   - Border-radius: 10px (rounded corners)

**Exercise 3: SVG Color Experiment**

1. Create `svg-colors.html`
2. Add this in the body:

```
<svg width="600" height="400">
    <circle cx="100" cy="100" r="50" class="circle1"></circle>
    <circle cx="250" cy="100" r="50" class="circle2"></circle>
    <circle cx="400" cy="100" r="50" class="circle3"></circle>
</svg>
```

3. In CSS, give each circle a different:
   - Fill color
   - Stroke color
   - Stroke width
   - Opacity

4. Add hover effects that change the fill color

---

## Additional Resources

1. [Codeacademy - Learn CSS: Introduction](https://www.codecademy.com/learn/learn-css-introduction)
2. [Free code camp - CSS basics](https://www.freecodecamp.org/news/css-style-sheets-basics/)
3. [MDN CSS basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics)
4. [Free code camp - CSS box model](https://www.freecodecamp.org/news/css-box-model-b3e68ceea756/)
5. [freeCodeCamp CSS Course](https://www.freecodecamp.org/news/learn-css-in-11-hours/)
6. [CSS Tricks - Complete Guide](https://css-tricks.com/)


---

<style>
    * {
        font-family: sans-serif;
    }
</style>