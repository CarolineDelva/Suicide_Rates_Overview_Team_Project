
// The svg
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Map and projection
var projection = d3.geoMercator()
    .center([0,20])                // GPS of location to zoom on
    .scale(99)                       // This is like the zoom
    .translate([ width/2, height/2 ])

d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")  // World shape
  .defer(d3.json, "/suicidedatabycountrygdpjpg") // Position of circles
  .await(ready);

function ready(error, dataGeo, data) {

  // Create a color scale
  var allContinent = d3.map(data, function(d){return(d.ContinentName)}).keys()
  var color = d3.scaleOrdinal()
    .domain(allContinent)
    .range(d3.schemeSet1);

  // Add a scale for bubble size
  var valueExtent = d3.extent(data, function(d) { return +d.suicides_no; })
  var size = d3.scaleSqrt()
    .domain(valueExtent)  // What's in the data
    .range([ 1, 50])  // Size in pixel

  // Draw the map
  svg.append("g")
      .selectAll("path")
      .data(dataGeo.features)
      .enter()
      .append("path")
        .attr("fill", "#b8b8b8")
        .attr("d", d3.geoPath()
            .projection(projection)
        )
      .style("stroke", "none")
      .style("opacity", .3)


  // ---------------------------//
  //      TOOLTIP               //
  // ---------------------------//

  // -1- Create a tooltip div that is hidden by default:
  var Tooltip = d3.select("#map")
    .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "black")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white")

   // Three function that change the tooltip when user hover / move / leave a cell
   var mouseover = function(d) {
    Tooltip.style("opacity", 1)
  }
  var mousemove = function(d) {
    Tooltip
      .html("Country: " + d.ContinentName +  "<br>Suicide Number: " + d.suicides_no + "<br>Mean Population: " + d.gdp_per_capita)
      .style("left", (d3.mouse(this)[0]+10) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    Tooltip.style("opacity", 0)
  }

 
  svg
    .selectAll("myCircles")
    .data(data.sort(function(a,b) { return +b.suicides_no - +a.suicides_no }).filter(function(d,i){ return i<1000 }))
    .enter()
    .append("circle")
      .attr("cx", function(d){ return projection([+d.CapitalLongitude, +d.CapitalLatitude])[0] })
      .attr("cy", function(d){ return projection([+d.CapitalLongitude, +d.CapitalLatitude])[1] })
      .attr("r", function(d){ return size(+d.suicides_no) })
      .style("fill", function(d){ return color(d.ContinentName) })
      .attr("stroke", function(d){ if(d.suicides_no>2000){return "black"}else{return "none"}  })      
      .attr("stroke-width", 1)
      .attr("fill-opacity", .4)
      // -3- Trigger the functions for hover
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
    



  // Add title and explanation
  svg
    .append("text")
      .attr("text-anchor", "end")
      .style("fill", "black")
      .attr("x", width - 10)
      .attr("y", height - 30)
      .attr("width", 90)
      .html("Suicide Rates and Gross Domestic Product")
      .style("font-size", 14)
    
      


 
}


var svg = d3.select("#map")

// Handmade legend
svg.append("circle").attr("cx",100).attr("cy",130).attr("r", 6).style("fill", "orange")
svg.append("circle").attr("cx",100).attr("cy",160).attr("r", 6).style("fill", "yellow")
svg.append("circle").attr("cx",100).attr("cy",190).attr("r", 6).style("fill", "purple")
svg.append("circle").attr("cx",100).attr("cy",220).attr("r", 6).style("fill", "blue")
svg.append("circle").attr("cx",100).attr("cy",250).attr("r", 6).style("fill", "red")
svg.append("circle").attr("cx",100).attr("cy",280).attr("r", 6).style("fill", "green")
svg.append("text").attr("x", 110).attr("y", 130).text("North America").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 110).attr("y", 160).text("South America").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 110).attr("y", 190).text("Europe").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 110).attr("y", 220).text("Asia").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 110).attr("y", 250).text("Africa").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 110).attr("y", 280).text("Australia").style("font-size", "15px").attr("alignment-baseline","middle")








