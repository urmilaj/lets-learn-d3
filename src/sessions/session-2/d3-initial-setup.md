---
title: D3 initial setup
---

# D3 library setup

Welcome to your first steps with D3! This section will help you to understand how to include D3 in your projects.

---

## D3 is a JavaScript library

A **library** is a collection of pre-written code that someone else created to make your life easier. Instead of writing everything from scratch, you can use a library's ready-made functions.

---

## Steps to load D3 library in your project

1. **Method 1: Using a CDN** (Content Delivery Network) - The **easiest and most common way** to use D3 is by linking to it from a CDN - a server on the internet that hosts the D3 code.
2. **Method 2: Downloading D3 Locally** - Sometimes you want D3 saved on your computer (for offline work or projects you'll deploy).
3. **Method 3: Using NPM** (For Later) - As you advance, you might use **NPM** (Node Package Manager) to install D3. This is for more complex projects with build tools. We'll cover this later - just know it exists!

---

## Using CDN

There are two ways to use D3 from a CDN, depending on how you want to write your JavaScript code:

**Option A: UMD + CDN** (Simpler, Traditional Method)

**UMD** stands for "Universal Module Definition" - this is the traditional way of loading libraries. D3 becomes available globally as `d3`.

Create a new HTML file called `my-first-d3.html` and add this code:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First D3 Project</title>
</head>
<body>
    <h1>Hello D3!</h1>

    <!-- Load D3 using UMD -->
    <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
    
    <!-- Write your D3 code in a regular script tag -->
    <script>
        // D3 is available globally
        console.log("D3 version:", d3.version);
        d3.select("body").append("p").text("D3 is working! 🎉");
    </script>
</body>
</html>
```

**When to use UMD:**
- ✅ You're just starting out
- ✅ You want simple, straightforward code
- ✅ You're writing code directly in HTML files
- ✅ **Recommended for beginners!**

Key Points:

1. **The script tag with `src`** downloads D3 from the internet
2. **Always place it before your own script** - you need D3 loaded first!
3. **`v7.min.js`** means version 7, minified (compressed) version

### Why use a CDN?
- ✅ No download needed
- ✅ Fast (CDNs are optimized for speed)
- ✅ Always up-to-date
- ❌ Requires internet connection

**Option B: ESM + CDN** (Modern Module Method)

**ESM** stands for "ECMAScript Modules" - this is the modern way of importing JavaScript modules. You explicitly import D3 instead of having it globally available.

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First D3 Project - ESM</title>
</head>
<body>
    <h1>Hello D3!</h1>

    <!-- Notice type="module" -->
    <script type="module">
        // Import D3 from the CDN
        import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
    
        d3.select("body").append("p").text("D3 is working with ESM! 🎉");
    </script>
</body>
</html>
```

**Key differences:**
1. Script tag has `type="module"`
2. You must `import` D3 before using it
3. The URL ends with `/+esm`

**When to use ESM:**
- You're comfortable with modern JavaScript
- You want better code organization
- You're building larger applications
- You want to import only specific D3 modules (like `import { select } from "d3"`)

Quick Comparison

| Feature | UMD + CDN | ESM + CDN |
|---------|-----------|-----------|
| **Syntax** | `<script src="...">` | `<script type="module">` |
| **Import** | Not needed | `import * as d3 from "..."` |
| **Global d3** | Yes | No (scoped to module) |
| **Beginner-friendly** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Modern approach** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

**For this course, we'll use UMD + CDN** because it's simpler to start with. Once you're comfortable, you can explore ESM!

<br>

**Testing if D3 is Loaded**

Let's make sure D3 is working! Add this code inside your second `<script>` tag:

```
<script>
    // Check if D3 is loaded
    console.log("D3 version:", d3.version);
    
    // Your first D3 command!
    d3.select("body").append("p").text("D3 is working! 🎉");
</script>
```

What to Do:

1. Save your HTML file
2. Open it in a web browser
3. Open the browser's **Console** (Right-click → Inspect → Console tab)
4. You should see:
   - The D3 version number in the console
   - A new paragraph saying "D3 is working! 🎉" on the page

What Just Happened?

```
d3.select("body")      // Find the <body> element
  .append("p")         // Add a new <p> paragraph
  .text("D3 is working! 🎉");  // Put this text inside
```

This is **method chaining** - doing multiple things in one smooth line. Like saying "Pick up the pen, open the notebook, write hello" in one breath!

---

## Using D3 Locally

Sometimes you want D3 saved on your computer (for offline work or projects you'll deploy). Here's how:

Steps:

1. **Download D3:**
   - Go to [https://d3js.org/d3.v7.js](https://d3js.org/d3.v7.js)
   - This will download the `d3.v7.min.js` file
   - Save it in the same folder as your HTML file

2. **Update your HTML:**

```
<body>
    <h1>Hello D3!</h1>

    <!-- Link to the LOCAL file -->
    <script src="d3.v7.min.js"></script>
    
    <script>
        console.log("D3 version:", d3.version);
    </script>
</body>
```

When to Use Local Files:
- Working offline
- Building a project you'll deploy
- Want full control over the version

---

## Using NPM

As you advance, you might use **NPM** (Node Package Manager) to install D3. This is for more complex projects with build tools. We'll cover this later - just know it exists!

```bash
npm install d3
```

Then in your JavaScript:
```
import * as d3 from 'd3';
```

**Don't worry about this now!** Start with the CDN method - it's perfect for learning.

---

Common Mistakes & Troubleshooting

❌ Error: "d3 is not defined"

**Problem:** The script tag is in the wrong place or didn't load.

**Solution:** Make sure the D3 script tag comes BEFORE your code:

```
<!-- WRONG ORDER -->
<script>
    d3.select("body");  // Error! D3 not loaded yet
</script>
<script src="https://d3js.org/d3.v7.min.js"></script>

<!-- CORRECT ORDER -->
<script src="https://d3js.org/d3.v7.min.js"></script>
<script>
    d3.select("body");  // Works!
</script>
```

❌ Nothing shows up in the console

**Problem:** Console might be closed or filtering messages.

**Solution:**
1. Right-click on the page → Inspect → Console tab
2. Check if there's a filter hiding messages
3. Try `console.log("Hello")` to test if console works at all

---

## Practice Exercise

Create a file called `practice.html` and:

1. Load D3 using a CDN
2. Check the version in the console
3. Use D3 to add THREE paragraphs to the page with different messages
4. Change the color of one paragraph to blue using `.style("color", "blue")`

**Hint:** You can run `d3.select()` multiple times, or select the body once and append multiple times!

### Solution (try it yourself first!)

<details>
<summary>Click to see solution</summary>

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>D3 Practice</title>
</head>
<body>
    <h1>D3 Practice</h1>

    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script>
        // Check version
        console.log("D3 version:", d3.version);
        
        // Add three paragraphs
        d3.select("body")
          .append("p")
          .text("This is paragraph 1");
        
        d3.select("body")
          .append("p")
          .text("This is paragraph 2")
          .style("color", "blue");
        
        d3.select("body")
          .append("p")
          .text("This is paragraph 3");
    </script>
</body>
</html>
```

</details>

---

## Quick Reference

```
<!-- Basic D3 Setup Template -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>D3 Project</title>
</head>
<body>
    
    <!-- Your HTML content -->
    
    <!-- Load D3 from CDN -->
    <script src="https://d3js.org/d3.v7.min.js"></script>
    
    <!-- Your D3 code -->
    <script>
        // Write your D3 code here
    </script>
</body>
</html>
```

**Remember:** Always load D3 BEFORE your code that uses it!


<style>
    * {
        font-family: sans-serif;
    }
</style>