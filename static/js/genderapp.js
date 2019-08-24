var width = 900;
var height = 600;


var canvas = d3.select("#gender").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(50,50)");

var packLayout = d3.pack()
    .size([width, height - 50])
    .padding(10);

funcion xScale =(suicide_data, x) {   

    var xLinearScale = d3.scaleLinear()
    .domain([d3.min(longitude) * 0.8, // add smallest negative value
        d3.max() * 1.2)
    .range([0, width]);

function Scale=(suicide_data, y) {

    var xLinearScale = d3.scaleLinear()
    .domain([d3.min(latitude) * 0.8,
        d3.max() * 1.2)
    .range([heigh, 0]);




d3.csv("/Data/Suicide_Rates_Data.csv").then(function (suicide_data, error) {
    if (error) throw error;
    console.log("suicide_data", suicide_data)

    suicide_data.forEach(function (data) {
        data.year = +data.year;
        data.age = +data.age;
        data.suicides_no = data.suicides_no;
        data.population = +data.population;
        data.suicideshundredk = +data.suicideshundredk;
        data.HDIforyear = +data.HDIforyear;
        data.gdp_for_year = +data.gdp_for_year;
        data.gdp_per_capita = +data.gdp_for_year;


        var node = d3.hierarchy(suicide_data)
            .sum(function (d) { return d.responseCount; });


        var node = canvas.selectAll(".node")
            .data(packLayout(node).descendants())
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", function (d) { return "translate (" + d.x + "," + d.y + ")"; });
        
        var radiusScale = d3.scaleSqrt().domain([0, 225]).range([10, 80])

        var simulation = d3.forceSimulation(node)
            .force("x", d3.forceX(width / 2).strength(0.05))
            .force("y", d3.forceY(height/2).strength(0.05))
            .force("collide", d3.forceCollide(function(d){
                return radiusScale(d.suicides_no);
            }))


        node.append("circle")
            .attr("cx", funcion(d){ })
            .attr("r", function(d){
                return radiusScale(d.suicides_no)
               
            })
            .attr("fill", "steelblue")
            .attr("opacity", 0.25)
            .attr("stroke", "#ADADAD")
            .attr("stroke-width", "2");
       
        node.append("text")
            .text(function (d) { return d.children ? "" : d.country })

        simulation.nodes(suicide_data)
            .on("tick", ticked)

        function ticked() {
            circles
                .attr("cx", function (d) {
                    return d.x
                })
                .attr("cy", function (d) {
                    return d.y
                })
        }

});

});



// var width = 800, height = 600;

// var chart = d3.select("body").append("svg")
// 	.attr("width", width).attr("height", height)
//   .append("g")
//   	.attr("transform", "translate(50,50)");

// var pack = d3.pack()
// 	.size([width, height - 50])
// 	.padding(10);

// d3.csv("/Data/Suicide_Rates_Data.csv", function(data) {
//   var nodes = pack.nodes(data);

//   var node = chart.selectAll(".node")
//   	  .data(nodes).enter()
//   	.append("g")
//   	  .attr("class", "node")
//   	  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

//   node.append("circle")
//   	  .attr("r",function(d) { return d.r; })
//   	  .attr("fill", "steelblue")
//   	  .attr("opacity", 0.25)
//   	  .attr("stroke", "#ADADAD")
//   	  .attr("stroke-width", 2);

//   node.append("text")
//   	  .text(function(d) { return d.children ? "" : d.name; });
// });