// create 2 data_set
var suicides_no_africa = [
  {group: "5-14 years", value: 2.0},
  {group: "15-24 years", value: 21.0},
  {group: "25-34 years", value: 23.0},
  {group: "35-54 years", value: 25.0},
  {group: "55-74 years", value: 8.0},
  {group: "75+ years", value: 2.0}
];

var suicides_no_northamerica = [
  {group: "5-14 years", value: 1.0},
  {group: "15-24 years", value: 11.0},
  {group: "25-34 years", value: 18.0},
  {group: "35-54 years", value: 38.0},
  {group: "55-74 years", value: 30.0},
  {group: "75+ years", value: 15.0}
];

var suicides_no_southamerica = [
  {group: "5-14 years", value: 16.0},
  {group: "15-24 years", value: 191.0},
  {group: "25-34 years", value: 183.0},
  {group: "35-54 years", value: 267.0},
  {group: "55-74 years", value: 148.0},
  {group: "75+ years", value: 44.0}
];

var suicides_no_asia = [
  {group: "5-14 years", value: 13.0},
  {group: "15-24 years", value: 202.0},
  {group: "25-34 years", value: 276.0},
  {group: "35-54 years", value: 608.0},
  {group: "55-74 years", value: 493.0},
  {group: "75+ years", value: 181.0}
];


var suicides_no_europe = [
  {group: "5-14 years", value: 5.0},
  {group: "15-24 years", value: 87.0},
  {group: "25-34 years", value: 150.0},
  {group: "35-54 years", value: 403.0},
  {group: "55-74 years", value: 309.0},
  {group: "75+ years", value: 142.0}
];


var suicides_no_australia = [
  {group: "5-14 years", value: 3.0},
  {group: "15-24 years", value: 90.0},
  {group: "25-34 years", value: 112.0},
  {group: "35-54 years", value: 191.0},
  {group: "55-74 years", value: 94.0},
  {group: "75+ years", value: 33.0}
];



// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
   width = 900 - margin.left - margin.right,
   height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#AGE")
 .append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
 .append("g")
   .attr("transform",
         "translate(" + margin.left + "," + margin.top + ")");

// X axis
var x = d3.scaleBand()
 .range([ 0, width ])
 .domain(suicides_no_africa.map(function(d) { return d.group; }))
 .padding(0.2);
svg.append("g")
 .attr("transform", "translate(0," + height + ")")
 .call(d3.axisBottom(x))

// Add Y axis
var y = d3.scaleLinear()
 .domain([0, 700])
 .range([ height, 0]);
svg.append("g")
 .attr("class", "myYaxis")
 .call(d3.axisLeft(y));

// A function that create / update the plot for a given variable:
function update(data) {

 var u = svg.selectAll("rect")
   .data(data)

 u
   .enter()
   .append("rect")
   .merge(u)
   .transition()
   .duration(1000)
     .attr("x", function(d) { return x(d.group); })
     .attr("y", function(d) { return y(d.value); })
     .attr("width", x.bandwidth())
     .attr("height", function(d) { return height - y(d.value); })
     .attr("fill", "#69b3a2")
}

// Initialize the plot with the first dataset
update(suicides_no_africa)