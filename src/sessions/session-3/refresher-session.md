---
title: Refresher Session
---

# Refresher Session Code (31 Jan 2026)

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>D3 refresher session</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
</head>

<body>
    <div>
        <h1 class="titleTag">D3 refresher session</h1>
        <svg width="500" height="500" style="background-color:bisque">
            <line x1="50" y1="20" x2="50" y2="80" stroke="black" stroke-width="10" />
            <circle cx="50" cy="20" r="20" fill="white" stroke="black" stroke-width="2" stroke-dasharray="5,5" />
            <rect id="specialRect" class="rectOne" x="50" y="0" width="50" height="50" opacity="0.8"/>
            <rect class="rectOne" x="150" y="0" width="50" height="50" opacity="0.8"/>
            <path d="M50,150 c20,50,50,60,70,20" stroke="black" fill="pink" />
            <text x="0" y="150">Hello</text>
            <g transform="translate(150,180)">
                <circle cx="0" cy="0" r="20" fill="white" stroke="black" stroke-width="2" stroke-dasharray="5,5" />
                <circle cx="20" cy="0" r="20" fill="lightblue" stroke="black" stroke-width="2" stroke-dasharray="5,5" />
            </g>
            <rect class="otherRect"/>
            <rect class="otherRect"/>
            <rect class="otherRect"/>
            <rect class="otherRect"/>
        </svg>
        <svg class="svg2"></svg>
    </div>
    <script>
        console.log(d3)
        const value = '5';
        let number = 5;

        number = 10

        const peopleInTheSession = {
            p1: 'yashita',
            p2: 'john',
            p3: 'doe'
        }
        const peopleInTheSession2 = [
            {
            p1: 'yashita',
            p2: 'john',
            p3: 'doe'
        },
        {
            p1: 'yashita',
            p2: 'john',
            p3: 'doe'
        }
        ]

        const fruits = ['apple', 'banana', 'cherry'];

        // value = '10'
        // console.log(number)
        // console.log(peopleInTheSession) 
        // console.log(fruits)

        console.log(peopleInTheSession2)


        document.querySelector('.titleTag').textContent = "D3 refresher session - updated"
        document.querySelector('.titleTag').style.color = "blue"


        document.querySelector('.titleTag').style.color = "red"



        d3.selectAll('#specialRect')
        .attr('fill', 'orange')

        d3.selectAll("circle").attr("fill", "lightgreen");

        const otherRect = d3.selectAll(".otherRect")
        .attr("width", "40")
        .attr("height", "40")
        .attr("x", (d,i) => i*50)
        .attr("y", 300)

        console.log(otherRect)

        const dataNames = ['yashita', 'devz', 'naman', 'urmila'];

        const dataTwo = [
            {name: 'yashita', age: 25},
            {name: 'devz', age: 26},
            {name: 'naman', age: 24},
            {name: 'urmila', age: 29}
        ];


        const svgContainer = d3.select(".svg2")
        .attr("width", 500)
        .attr("height", 500)
        .style("background-color", "bisque");


        svgContainer.selectAll(".sessionAttenders")
        .data(dataNames)
        .join("circle")
        .attr("class", "sessionAttenders")
        .attr("cx", (d,i) => (i*20))
        .attr("cy", 50)
        .attr("r", 6)
        .attr("fill", "purple")
        .attr("stroke", "white")
        .attr("opacity", 0.7)


        svgContainer.append("g")
        .attr("transform", "translate(0,100)")
        .selectAll("text")
        .data(dataTwo)
        .join("text")
        .attr("x", (d,i) => i*100)
        .attr("y", (d,i) => i*10)
        .text(d => d.name+ " hello " +d.age)


        const x = d3.scaleLinear()
        .domain([d3.min(dataTwo, d=>d.age), d3.max(dataTwo, d=>d.age)])
        .range([50, 150])

        console.log(x.domain())
        console.log(x.range())

        svgContainer.selectAll("text")
        .data(dataTwo)
        .attr("class", "ageText")
        .join("text")
        .attr("x", (d) => x(d.age))
        .attr("y", 500)
        .attr("dx", 5)
        .attr("text-anchor", "end")
        .text(d => d.age)

        d3.csv("music-aggregate.csv").then(data => {
            console.log(data)

            const x = d3.scaleBand()
            .domain(data.map(d=>d.Format))
            .range([50, 450])
            .padding(0.2)

            const y = d3.scaleLinear()
            .domain([d3.min(data, d=>Number(d.Revenue)), d3.max(data, d=>Number(d.Revenue))])
            .range([450, 50])

            const xAxis = d3.axisBottom(x)
            const yAxis = d3.axisLeft(y)

            svgContainer.append("g")
            .attr("transform", "translate(0, 450)")
            .call(xAxis)
            .call(g => g.select(".domain").remove())

            svgContainer.append("g")
            .attr("transform", "translate(50, 0)")
            .call(yAxis)

            svgContainer.selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", d => x(d.Format))
            .attr("y", d => y(Number(d.Revenue)))
            .attr("width", x.bandwidth())
            .attr("height", d => 450 - y(Number(d.Revenue)))
            .attr("fill", "teal")


        })



    </script>
</body>
</html>
```

<style>
    * {
        font-family: sans-serif;
    }
</style>