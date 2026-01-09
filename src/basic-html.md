---
title: Basic HTML
---

### Web Development Basics: HTML

HTML, created in 1991 by Tim Berners-Lee, structures web content. D3.js needs HTML to provide a document structure where it can insert and manipulate SVG visualizations.

---


## What is HTML?

HTML (HyperText Markup Language) is the skeleton of every webpage. It defines the structure and content using tags - special keywords wrapped in angle brackets like `<tag>`.

Think of it like building with blocks:
- Each block (tag) has a specific purpose
- Blocks can contain other blocks
- Together they create the structure of your page

---

## Basic HTML structure

Here's the basic HTML structure used in our D3 visualization: Let's break down each part!

```
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Information about the page -->
</head>
<body>
    <!-- Visible content goes here -->
</body>
</html>
```

---

## Document Type Declaration

```
<!DOCTYPE html>
```

**What it does**: Tells the browser "Hey, this is an HTML5 document!"

**Why we need it**: 
- Without this, browsers might display your page in "quirks mode" (old, buggy behavior)
- Must be the very first line in every HTML file
- Not case-sensitive, but conventionally written in uppercase

Think of it as: The label on a food package telling you what's inside

--- 

## The Root Element

```
<html lang="en">
```

**What it does**: Wraps all the content on the entire page

Breaking it down:
- `<html>` - The opening tag
- `lang="en"` - An attribute that sets the language to English
- Everything else goes inside this element
- Closed at the very end with `</html>`

Why `lang="en"` matters:
- Helps screen readers pronounce text correctly
- Helps search engines understand your content
- Improves accessibility for users with disabilities

---

## The Head Section

```
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
    <title>How to create a chart with D3.js</title>
    <style>
        /* CSS styles */
    </style>
</head>
```

**What it does**: Contains metadata (information about the page, not shown on the page)

Character Encoding

```
<meta charset="UTF-8">
```

**What it does**: Defines how text is encoded

**Why we need it**:
- UTF-8 supports all characters from all languages (emojis too! 🎉)
- Without it, special characters might display as � or weird symbols
- Should be one of the first elements in `<head>`

Think of it as: Making sure your computer and the browser speak the same language

Viewport Meta Tag

```
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**What it does**: Controls how the page displays on mobile devices

Breaking it down:
- `width=device-width` - Makes the page width match the device's screen width
- `initial-scale=1.0` - Sets initial zoom level to 100%

**Why we need it**:
- Without this, mobile browsers assume your page is desktop-sized and shrink it down
- Makes your D3 chart responsive and readable on phones/tablets
- Essential for modern web development

Think of it as: Auto-adjusting your chart to fit any screen size

Loading External Scripts

```
<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
```

**What it does**: Loads the D3.js library from a CDN (Content Delivery Network)

Breaking it down:
- `<script>` - Used to include JavaScript
- `src="..."` - The **source** attribute points to where the code lives
- `d3@7` - Loads version 7 of D3.js

Why in the `<head>`:
- D3 needs to load *before* our code tries to use it
- The browser loads this first, making D3 available for our script later

CDN Benefits:
- Fast loading (servers worldwide)
- Cached by browsers (faster on repeat visits)
- No need to download and host the file yourself

Think of it as: Importing a tool you need before you start your project

Page Title

```
<title>How to create a chart with D3.js</title>
```

**What it does**: Sets the text that appears in:
- Browser tab
- Bookmarks
- Search engine results

**Why it matters**:
- First thing users see in their tabs
- Important for SEO (search engine optimization)
- Should be descriptive and concise (50-60 characters)

Internal Styles

```
<style>
    svg {
        background-color: #2b2b2b;
    }
</style>
```

**What it does**: Contains CSS to style your page

In our example:
- Makes the SVG background dark gray (`#2b2b2b`)
- CSS selectors target HTML elements
- Curly braces `{}` contain the style rules

<div class="note">
    Alternative: You could put styles in a separate `.css` file
</div>

---

## The Body Section

```
<body>
    <div class="chartContainer"></div>
    <script>
        // JavaScript code for D3 visualization
    </script>
</body>
```

**What it does**: Contains everything visible on the webpage

The Container Div

```
<div class="chartContainer"></div>
```

**What it does**: Creates a container where D3 will insert the SVG chart

Breaking it down:
- `<div>` - A generic container element (like an empty box)
- `class="chartContainer"` - Gives it a name we can reference in JavaScript
- Self-closing (no content initially)

**Why we need it**:
- D3 needs a place to "attach" the SVG
- Using a class lets us target this specific div
- Keeps our chart separate from other page content

In JavaScript, D3 finds it like this:
```javascript
d3.select(".chartContainer")  // The dot means "class"
```

Think of it as: An empty frame where you'll hang your artwork

Internal JavaScript

```
<script>
    const width = 600;
    // ... rest of JavaScript code
</script>
```

**What it does**: Contains the JavaScript that creates your D3 visualization

Why at the end of `<body>`:
- HTML loads from top to bottom
- JavaScript needs the `<div class="chartContainer">` to exist first
- Placing `<script>` at the end ensures all HTML is loaded before code runs

<div class="note">
    <p>
        Alternative approach: This html code below loads JavaScript from a separate file (cleaner for large projects)
    </p>
    <code>&lt;script src="script.js"&gt;&lt;/script&gt;</code>
</div>


---

## Complete flow

Here's the flow when someone visits your page:

1. **Browser reads `<!DOCTYPE html>`** → "This is HTML5"
2. **Browser reads `<head>`** → Loads D3 library, sets page title, applies styles
3. **Browser reads `<body>`** → Creates the empty `<div class="chartContainer">`
4. **Browser runs `<script>`** → D3 code executes:
   - Selects the `.chartContainer` div
   - Creates an SVG element inside it
   - Draws your chart

```
┌─────────────────────────────────────┐
│ <!DOCTYPE html>                     │ ← Declares HTML5
├─────────────────────────────────────┤
│ <html>                              │
│   ┌─────────────────────────────┐   │
│   │ <head>                      │   │ ← Setup & resources
│   │   - Meta tags               │   │
│   │   - Load D3                 │   │
│   │   - Title                   │   │
│   │   - Styles                  │   │
│   └─────────────────────────────┘   │
│   ┌─────────────────────────────┐   │
│   │ <body>                      │   │ ← Visible content
│   │   <div class="chartContainer">  │
│   │     [D3 creates SVG here]   │   │
│   │   </div>                    │   │
│   │   <script> D3 code </script>│   │
│   └─────────────────────────────┘   │
│ </html>                             │
└─────────────────────────────────────┘
```

---

## Key Concepts Checklist

Before moving on, make sure you understand:

- **Tags** - `<tagname>content</tagname>` create elements
- **Attributes** - Add extra info: `<div class="chartContainer">`
- **Head vs Body** - Head = setup, Body = visible content
- **Classes** - Names that let CSS and JavaScript find elements
- **Script tags** - Where JavaScript code lives
- **Order matters** - Load resources before using them

---

## Quick Reference

| Element | Purpose | Why It's Here |
|---------|---------|---------------|
| `<!DOCTYPE html>` | Declares HTML5 | Required first line |
| `<html lang="en">` | Root container | Wraps everything |
| `<meta charset="UTF-8">` | Character encoding | Supports all characters |
| `<meta name="viewport">` | Mobile responsiveness | Makes chart work on phones |
| `<script src="d3@7">` | Loads D3 library | We need D3 to create charts |
| `<title>` | Page title | Shows in browser tab |
| `<style>` | CSS styling | Makes SVG background dark |
| `<body>` | Visible content | Where our chart appears |
| `<div class="chartContainer">` | Chart container | D3 puts SVG here |
| `<script>` | D3 code | Creates the visualization |

---

## FAQ

Q: Why can't I just write JavaScript without HTML?
A: JavaScript for web pages needs HTML to run in a browser. HTML is the foundation, JavaScript adds behavior.

Q: Can I change the class name `chartContainer`?
A: Yes! Just make sure to update it in your JavaScript: `d3.select(".yourNewName")`

Q: What if I skip the `<meta viewport>` tag?
A: Your chart will look tiny on mobile devices because the browser will assume it's a desktop site and zoom out.

---

## Practice Exercises

Let's get hands-on! Complete these exercises to solidify your HTML knowledge.

**Goal:** Build a simple webpage from scratch and view it in your browser.

**Steps:**
1. Open VS Code
2. Create a new file: `File → New File` (or `Ctrl+N`)
3. Save it as `my-first-page.html` in your project folder
4. Type (don't copy-paste!) this code:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Webpage</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first HTML page.</p>
</body>
</html>
---
```
5. Right-click in the editor and select "Open with Live Server"
- If you don't see this option, install the "Live Server" extension:
 - Click the Extensions icon in the left sidebar (or Ctrl+Shift+X)
 - Search for "Live Server" by Ritwick Dey
 - Click Install
 - Try step 5 again
6. Your page should open in your browser! 🎉

---

## Challenge

Modify the page to include:
- Your name in the `<h1>` tag
- Three paragraphs about your favorite hobbies
- A different page title

---

## Additional Resources
1. [Free code camp - HTML for Beginners](https://www.freecodecamp.org/news/html-crash-course/)
2. [Codeacademy - Learn HTML: Fundamentals](https://www.codecademy.com/learn/learn-html-fundamentals)
3. [Codeacademy - Learn HTML](https://www.codecademy.com/learn/learn-html)




<style>
    * {
        font-family: sans-serif;
    }
</style>