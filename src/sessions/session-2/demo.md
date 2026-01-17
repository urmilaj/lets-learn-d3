---
title: Session 2 demo code
---

# Session 2 live demo code

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        div {
            margin: 10px;
        }
    </style>
</head>
<body>
    <div class="one">
        <svg class="one" width="500" height="500" style="background-color: lightgray;"></svg>
    </div>
    <script type="module">
        import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

            const data = [80, 10, 20, 50];
            const data2 = [{x: 30, y: 30, r: 20}, 
                          {x: 70, y: 70, r: 10}, 
                          {x: 110, y: 110, r: 40}];

            // console.log(data2[0]["r"])
        
            d3.select("svg.one")
            .selectAll("circle")
            .data(data2)
            .join("circle")
            .attr("cx", (d,i) => i*150)
            .attr("cy", 10)
            .attr("r", d=>d.r)

        // d3.select(".one")
        //     .append("svg")
        //     .style("background-color", "lightgray")
        //     .attr("width", 500)
        //     .attr("height", 500)
        //     .append("circle")
        //     .attr("cx", 50)
        //     .attr("cy", 50)
        //     .attr("r", 40)
        //     .attr("fill", "blue");
    </script>
</body>
</html>
```


<style>
    * {
        font-family: sans-serif;
    }
</style>