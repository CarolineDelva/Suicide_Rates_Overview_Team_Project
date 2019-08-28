var margin = {top: 30, right: 20, bottom: 70, left: 50},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// Parse the date / time
//var parseDate = parseDate(String(d.year));

// Set the ranges
var x = d3.time.scale().range([0, width]);
// var x = d3.scale.linear()
// x.domain([0, d3.max(data, function (d) { return d.year; })]) //Convert the id-values...
// x.range([0, 960]); 
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
var priceline = d3.svg.line()	
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.suicides_no); });
    
// Adds the svg canvas
var svg = d3.select("generation")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json(`/suicideratesdata`).then(function(error, data) {


// Throw an error if one occurs
    if (error) throw error;

  // Print the data
    console.log(data);
        
    data.forEach(function(d) {
		d.year = parseDate(d.year);
		d.suicides_no = +d.suicides_no;
    });

    // Scale the range of the data

    // var x = d3.time.scale().range([0, width]);
    // var y = d3.scale.linear().range([height, 0]);

    x.domain(d3.extent(data, function(d) { return d.year; }));
    y.domain([0, d3.max(data, function(d) { return d.suicides_no; })]);

    // Nest the entries by symbol
    var dataNest = d3.nest()
        .key(function(d) {return d.generation;})
        .entries(data);

    var color = d3.scale.category10();   // set the colour scale

    legendSpace = width/dataNest.length; // spacing for the legend

    // Loop through each symbol / key
    dataNest.forEach(function(d,i) { 

        svg.append("path")
            .attr("class", "line")
            .style("stroke", function() { // Add the colours dynamically
                return d.color = color(d.key); })
            .attr("id", 'tag'+d.key.replace(/\s+/g, '')) // assign ID
            .attr("d", priceline(d.values));

        // Add the Legend
        svg.append("text")
            .attr("x", (legendSpace/2)+i*legendSpace)  // space legend
            .attr("y", height + (margin.bottom/2)+ 5)
            .attr("class", "legend")    // style the legend
            .style("fill", function() { // Add the colours dynamically
                return d.color = color(d.key); })
            .on("click", function(){
                // Determine if current line is visible 
                var active   = d.active ? false : true,
                newOpacity = active ? 0 : 1; 
                // Hide or show the elements based on the ID
                d3.select("#tag"+d.key.replace(/\s+/g, ''))
                    .transition().duration(100) 
                    .style("opacity", newOpacity); 
                // Update whether or not the elements are active
                d.active = active;
                })  
            .text(d.key); 

    });

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .text("Year")
        .call(xAxis);
   
    // // Add the X Axis Label
    // svg.append("text")
    //     .attr("text-anchor", "end")
    //     .attr("x", width)
    //     .attr("y", height + marginn.top + 20)
    //     .text("Year")

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .text("Suicide Rates")
        .call(yAxis);

    // // Y Axis Label
    // svg.append("text")
    //     .attr("text-anchor", "end")
    //     .attr("transform", "rotate(-90)")
    //     .attr("y", -margin.left+20)
    //     .attr("x", -margin.top)
    //     .text("Suicide Rates")

});
