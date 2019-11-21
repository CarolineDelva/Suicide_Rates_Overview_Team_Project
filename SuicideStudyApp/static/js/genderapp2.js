(function () {
    //var width = document.getElementsByClassName("leftDiv")[0].clientWidth;
    var width = 600;
    var height = 400;

    var svg = d3.select("#genderbycontinent")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
        .append("g")
        .attr("transform", "translate(0,0)");

        

    var defs = svg.append("defs");   

    var radiusScale = d3.scaleSqrt().domain([2606, 168845]).range([20, 30]);

    var forceXSeparate = d3.forceX(function(d){
        if (d.sex === "female"){
            console.log("this is female")
            return 150
        }else {
            console.log("this is male")
            return 450   
        }
       }).strength(0.7)

    var forceXCombine =  d3.forceX(width/ 2).strength(0.7)

    var forceCollide = d3.forceCollide(function(d) {
        return radiusScale(d.suicides_no + 50);
    });

    var simulation = d3.forceSimulation() 
        .force("x", forceXCombine)
        .force("y", d3.forceY(height/2).strength(0.7))
        .force("collide", forceCollide)
    
    d3.json(`/suicidedatabycontinentjpg`).then(function(suicidedata, error) {
        if (error) {
            console.log(error);

            throw error;
        }
        console.log("suicide data", suicidedata);


        
    defs.selectAll(".gender-pattern")
        .data(suicidedata)
        .enter().append("pattern")
        .attr("class", "artist-pattern")                    
        .attr("id", function(d){
            return d.ContinentName
        })
        .attr("height", "100%")
        .attr("width", "100%")
        .attr("patternContentUnits", "objectBoundingBox")
        .append("image")
        .attr("height", 1)
        .attr("width", 1)
        .attr("preserveAspectRatio", "none")
        .attr("xmlns:xlink", "htto://w3.org/1999/xlink")
        .attr("xlink:href", function(d){
            return d.ImageURL
        })

    
    var circles = svg.selectAll("g")
        .data(suicidedata)
        .enter().append("circle")
        .attr("class", "gender")
        .attr("r", function(d){
            return radiusScale(d.suicides_no);
        })

        .attr("fill", function(d){
            return "url(#" + d.ContinentName + ")"
        })




        

        d3.select("#gendersplitbycontinent").on('click', function() {
            console.log("you clicked me");
        })

       
        
        d3.select("#combinationbycontinent").on('click', function () {
            d3.select("#genderbycontinent").style("visibility", "visible")
            d3.select("#genderbycountry").style("visibility", "hidden")
            d3.select("#lefttext").html("<article><p><br><strong>Suicide Rates on a Global Scale</strong><br><p>This is a packed bubble layout chart representation of the world suicide rates. The size of each circle represents the total number of suicides of men and women between the years of 1985 and 2016. Antartica was omitted from this graph as it is unhabitted.</p> <br><br><p>Hover over each continent circle to get suicide rates</p></p></article>")
            d3.select("#righttext").html("")
            simulation
                .force("x", forceXCombine)
                .alphaTarget(0.05)
                .restart()
            console.log("combine the bubbles")    
        })

        d3.select("#gendersplitbycontinent").on('click', function () {            
            d3.select("#lefttext").html("<article><p><br><strong> Women Suicide Rates on a Global Scale</strong><br><p>Women make up about 25 % of suicide rates.</p><br><br><p>Hover over each continent circle to get suicide rates</p></p></article>");
            d3.select("#righttext").html("<article><p><br><strong> Men Suicide Rates on a Global Scale</strong><br><p>Men make up about 75 % of suicide rates.</p></article>");
            simulation
                .force("x", forceXSeparate)
                .alphaTarget(0.05)
                .restart()
            console.log("seperate the bubbles")    
        })


            //function used for updating cicles group with new tooltip
        var toolTip = d3.tip("circles")
            .attr("class", "tooltip")
            // .style("border", "solid")
            .style("background-color", "lightgray")
            .offset([80, -60])
            .html(function (d) {
                return (`Continent: ${d.ContinentName }<br>Gender: ${d.sex}<br>Suicide Number: ${d.suicides_no}`);
            });

        circles.call(toolTip);

        circles.on("mouseover", function (data) {
            toolTip.show(data, this);
        })

            //onmouseout event
            .on("mouseout", function (data, index) {
                toolTip.hide(data, this);
            });
        







        simulation.nodes(suicidedata)
            .on('tick', ticked);

        function ticked() {
            circles
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                });



        }}

    );  



    
})();




(function () {
    var width = 600;
    var height = 400;

    var svg = d3.select("#genderbycountry")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
        .append("g")
        .attr("transform", "translate(0,0)");

    var defs = svg.append("defs");

    defs.append("pattern")
    .attr("id", "Jon-snow")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUnits", "objectBoundingBox")
    .append("image")
    .attr("height", 1)
    .attr("width", 1)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "htto://w3.org/1999/xlink")
    .attr("xlink:href", "https://upload.wikimedia.org//wikipedia//commons//3//36//Flag_of_Albania.svg")

    

    var radiusScale = d3.scaleSqrt().domain([2606, 168845]).range([10, 20]);

    var forceXSeparate = d3.forceX(function(d){
        if (d.sex === "female"){
            console.log("this is female")
            return 150
        }else {
            console.log("this is male")
            return 450   
        }
       }).strength(0.5)

    var forceXCombine =  d3.forceX(width/ 2).strength(0.4)

    var forceCollide = d3.forceCollide(function(d) {
        return radiusScale(d.suicides_no + 50);
    });

    var simulation = d3.forceSimulation() 
        .force("x", forceXCombine)
        .force("y", d3.forceY(height/2).strength(0.7))
        .force("collide", forceCollide)
    
    d3.json(`/suicidedatabycountryjpg`).then(function(suicidedata, error) {
        if (error) {
            console.log(error);

            throw error;
        }
        console.log("suicide data", suicidedata);


        
    defs.selectAll(".gender-pattern")
        .data(suicidedata)
        .enter().append("pattern")
        .attr("class", "artist-pattern")                    
        .attr("id", function(d){
            return d.Country
        })
        .attr("height", "100%")
        .attr("width", "100%")
        .attr("patternContentUnits", "objectBoundingBox")
        .append("image")
        .attr("height", 1)
        .attr("width", 1)
        .attr("preserveAspectRatio", "none")
        .attr("xmlns:xlink", "htto://w3.org/1999/xlink")
        .attr("xlink:href", function(d){
            return d.ImageURL
        })

    
    var circles = svg.selectAll("g")
        .data(suicidedata)
        .enter().append("circle")
        .attr("class", "gender")
        .attr("r", function(d){
            return radiusScale(d.suicides_no);
        })

        .attr("fill", function(d){
            return "url(#" + d.Country + ")"
        })




        

        d3.select("#gendersplitbycountry").on('click', function() {
            console.log("you clicked me");
        })

        
      
        d3.select("#combinationbycountry").on('click', function () {
            d3.select("#genderbycontinent").style("visibility", "hidden")
            d3.select("#genderbycountry").style("visibility", "visible")
            d3.select("#lefttext").html("<article><p><br><strong> Suicide Rates per country</strong><br><p>This is a packed bubble layout chart representation of suicide rates in each country. The size of each circle represents the total number of suicides of men and women between the years of 1985 and 2016. Japan has a suicide rate of 1110544 for men. </p><br><br><p>Hover over each country's circle to get suicide rates</p></p></article>")
            d3.select("#righttext").html("")
            simulation
                .force("x", forceXCombine)
                .alphaTarget(0.05)
                .restart()
            console.log("combine the bubbles")    
        })

        d3.select("#gendersplitbycountry").on('click', function () {
            d3.select("#lefttext").html("<article><p><br><strong> Women Suicide Rates on a Global Scale</strong><br><p>Women make up about 25 % of suicide rates. </p><br><br><p>Hover over each country's circle to get suicide rates</p></p></article></p></article>");
            d3.select("#righttext").html("<article><p><br><strong> Men Suicide Rates on a Global Scale</strong><br><p>Men make up about 75 % of suicide rates.</p></article>");
            simulation
                .force("x", forceXSeparate)
                .alphaTarget(0.05)
                .restart()
            console.log("combine the bubbles")    
        })


            //function used for updating cicles group with new tooltip
        var toolTip = d3.tip("circles")
            .attr("class", "tooltip")
            // .style("border", "solid")
            .style("background-color", "lightgray")
            .offset([80, -60])
            .html(function (d) {
                return (`Country: ${d.Country }<br>Gender: ${d.sex}<br>Suicide Number: ${d.suicides_no}`);
            });

        circles.call(toolTip);

        circles.on("mouseover", function (data) {
            toolTip.show(data, this);
        })

            //onmouseout event
            .on("mouseout", function (data, index) {
                toolTip.hide(data, this);
            });
        







        simulation.nodes(suicidedata)
            .on('tick', ticked);

        function ticked() {
            circles
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                });



        }}

    );  



    
})();




