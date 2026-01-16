---
title: D3 selection
---

# D3 selection

D3 selection is how you **pick** HTML elements on your page so you can change them. Think of it like pointing at something before you modify it. We covered **[DOM manipulation &#8599;](../session-1/basic-js#document-object-model)** in Session 1: Basic Javascript. D3 selections work very similarly to `document.querySelector()` and `document.querySelectorAll()`.

---

The Two Main Selection Methods

1. `d3.select()` - Pick **FIRST** matching element
2. `d3.selectAll()` - Pick **ALL** matching element

## `d3.select()`

**What it does:** Finds the **first** matching element on the page.
```
<!DOCTYPE html>
<html>
<head>
    <title>D3 Select Example</title>
</head>
<body>
    <h1>Hello World</h1>
    <p>First paragraph</p>
    <p>Second paragraph</p>

    <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
    <script>
        // Select the first <p> element
        d3.select("p")
          .style("color", "blue");
        
        // Only the FIRST paragraph turns blue!
    </script>
</body>
</html>
```

## `d3.selectAll()`

**What it does:** Finds all elements that match.
```
<!DOCTYPE html>
<html>
<head>
    <title>D3 SelectAll Example</title>
</head>
<body>
    <h1>Hello World</h1>
    <p>First paragraph</p>
    <p>Second paragraph</p>
    <p>Third paragraph</p>

    <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
    <script>
        // Select ALL <p> elements
        d3.selectAll("p")
          .style("color", "red");
        
        // ALL paragraphs turn red!
    </script>
</body>
</html>
```

Quick Comparison

| Method | What It Picks | Example | Result |
|--------|---------------|---------|---------|
| `d3.select("p")` | **First** `<p>` only | Changes one element | First paragraph changes |
| `d3.selectAll("p")` | **All** `<p>` elements | Changes all matches | All paragraphs change |

---

## What Can You Select?

### 1. By Tag Name
```
d3.select("p")        // First <p> element
d3.select("div")      // First <div> element
d3.selectAll("h1")    // All <h1> elements
```

### 2. By Class Name (starts with `.`)
```
<p class="highlight">Special paragraph</p>
```

```
d3.select(".highlight")       // Element with class="highlight"
d3.selectAll(".highlight")    // All elements with that class
```

### 3. By ID (starts with `#`)
```
<div id="chart"></div>
```

```
d3.select("#chart")    // Element with id="chart"
// Note: IDs should be unique, so usually use d3.select() not selectAll()
```

### 4. Combining Selectors
```
<p class="intro">First intro paragraph</p>
<p class="intro">Second intro paragraph</p>
<div class="intro">Not a paragraph</div>
```

```
// Select only <p> elements with class="intro"
d3.selectAll("p.intro")
  .style("font-weight", "bold");
// Only the two <p> elements change, not the <div>
```

---

## Modification

### Common Things You Can Do After Selecting

Once you've selected elements, you can modify them:

### 1. Change Text Content
```
d3.select("h1")
  .text("New Title");
```

### 2. Change HTML Content
```
d3.select("div")
  .html("<strong>Bold text</strong>");
```

### 3. Change Styles
```
d3.selectAll("p")
  .style("color", "blue")
  .style("font-size", "20px");
```

### 4. Add/Remove Classes
```
d3.select("p")
  .classed("highlight", true);   // Add class
  
d3.select("p")
  .classed("highlight", false);  // Remove class
```

### 5. Change Attributes
```
d3.select("img")
  .attr("src", "new-image.jpg")
  .attr("alt", "New description");
```

---

## Common Questions

**Q: What happens if I use `d3.selectAll("body")` instead of `d3.select("body")`?**

**A:** In most cases, it works the same because there's only **one** `<body>` element!

```
// Both work for unique elements
d3.select("body").append("svg");     // ✅ Recommended
d3.selectAll("body").append("svg");  // ✅ Works, but unusual
```

**However, the difference matters when there are multiple elements:**

```
<p>First</p>
<p>Second</p>
<p>Third</p>
```

```
// Using select() - only affects FIRST paragraph
d3.select("p")
  .append("strong")
  .text("!");

// Result:
// <p>First<strong>!</strong></p>  ← Only this one changes
// <p>Second</p>
// <p>Third</p>

// Using selectAll() - affects ALL paragraphs
d3.selectAll("p")
  .append("strong")
  .text("!");

// Result:
// <p>First<strong>!</strong></p>   ← All three
// <p>Second<strong>!</strong></p>  ← get the
// <p>Third<strong>!</strong></p>   ← exclamation mark
```

### Rule of Thumb

| Element | Use | Why |
|---------|-----|-----|
| `<body>` | `select()` | Only one exists |
| `#myId` | `select()` | IDs are unique |
| `.myClass` | `selectAll()` | Usually multiple elements |
| `<p>` tags | `selectAll()` | Usually multiple elements |
| First element only | `select()` | Explicitly want just one |

**When in doubt:**
- Use `select()` for unique elements (body, IDs)
- Use `selectAll()` when you want to change multiple things

---

## Common Mistakes

❌ **Using `d3.select()` when you want to change multiple elements**
```
// WRONG - only changes first paragraph
d3.select("p").style("color", "red");

// RIGHT - changes all paragraphs
d3.selectAll("p").style("color", "red");
```

❌ **Forgetting the `.` for classes or `#` for IDs**
```
// WRONG
d3.select("myClass")     // Looks for <myClass> tag
d3.select("myId")        // Looks for <myId> tag

// RIGHT
d3.select(".myClass")    // Looks for class="myClass"
d3.select("#myId")       // Looks for id="myId"
```

❌ **Trying to select before D3 is loaded**
```
// WRONG ORDER - D3 not loaded yet!
<script>
    d3.select("h1").text("Hello");
</script>
<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>

// RIGHT ORDER - Load D3 first!
<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
<script>
    d3.select("h1").text("Hello");
</script>
```

---

## Key Takeaways

✅ **`d3.select()`** = Pick **ONE** (the first match)  
✅ **`d3.selectAll()`** = Pick **ALL** matches  
✅ Use the same selectors as CSS (tag, `.class`, `#id`)  
✅ Chain methods to modify selected elements  
✅ Always load D3 before using it (see [D3 Initial Setup](d3-initial-setup.md))

---


## Practice Exercise

Create an HTML file with:
- An `<h1>` heading
- Three `<p>` paragraphs (give one a class="special")
- A `<div>` with an id="box"

Then use D3 to:
1. Change the heading text to "D3 Practice"
2. Make all paragraphs blue
3. Make the "special" paragraph bold
4. Add text to the box div

### Solution (try it yourself first!)

<details>
<summary>Click to see solution</summary>

```
<!DOCTYPE html>
<html>
<head>
    <title>D3 Practice</title>
</head>
<body>
    <h1>Original Heading</h1>
    <p>First paragraph</p>
    <p class="special">Special paragraph</p>
    <p>Third paragraph</p>
    <div id="box"></div>

    <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
    <script>
        // 1. Change heading
        d3.select("h1")
          .text("D3 Practice");
        
        // 2. Make all paragraphs blue
        d3.selectAll("p")
          .style("color", "blue");
        
        // 3. Make special paragraph bold
        d3.select(".special")
          .style("font-weight", "bold");
        
        // 4. Add text to box
        d3.select("#box")
          .text("This is the box!");
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