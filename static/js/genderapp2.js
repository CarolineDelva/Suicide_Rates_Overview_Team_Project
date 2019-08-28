 
(function () {
    var width = document.getElementsByClassName("leftDiv")[0].clientWidth;
    var height = 600;

    var svg = d3.select("#genderbycontinent")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
        .append("g")
        .attr("transform", "translate(0,0)");

    

    var radiusScale = d3.scaleSqrt().domain([2606, 168845]).range([30, 50]);


    var forceXSeparate = d3.forceX(function(d){
        if (d.sex === "female"){
            console.log("this is female")
            return 250
        }else {
            console.log("this is male")
            return 750   
        }
       }).strength(1)

    var forceXCombine =  d3.forceX(width/ 2).strength(1)

    var forceCollide = d3.forceCollide(function(d) {
        return radiusScale(d.suicides_no + 1);
    });

    var simulation = d3.forceSimulation() 
        .force("x", forceXCombine)
        .force("y", d3.forceY(height/2).strength(1))
        .force("collide", forceCollide)
    
    d3.json(`/suicidedatabycontinent`).then(function(suicidedata, error) {
        if (error) {
            console.log(error);

            throw error;
        }
        console.log("suicide data", suicidedata);

    
    
    var circles = svg.selectAll("g")
        .data(suicidedata)
        .enter().append("circle")
        .attr("class", "gender")
        .attr("r", function(d){
            return radiusScale(d.suicides_no);
        })

        .attr("fill", function(d){

            if (d.sex === "female"){
                console.log("this is female")
                return "lightpink"
            }else {
                console.log("this is male")
                return "lightblue"  
            }
        });

        d3.select("#gendersplitbycontinent").on('click', function() {
            console.log("you clicked me");
        })

        d3.select("#combinationbycontinent").on('click', function () {
            simulation
                .force("x", forceXCombine)
                .alphaTarget(0.05)
                .restart()
            console.log("combine the bubbles")    
        })

        d3.select("#gendersplitbycontinent").on('click', function () {
            simulation
                .force("x", forceXSeparate)
                .alphaTarget(0.05)
                .restart()
            console.log("combine the bubbles")    
        })


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
    var width = document.getElementsByClassName("leftDiv")[0].clientWidth;
    var height = 600;

    var svg = d3.select("#genderbycountry")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
        .append("g")
        .attr("transform", "translate(0,0)");

    

    var radiusScale = d3.scaleSqrt().domain([2606, 168845]).range([10, 20]);


    var forceXSeparate = d3.forceX(function(d){
        if (d.sex === "female"){
            console.log("this is female")
            return 250
        }else {
            console.log("this is male")
            return 750   
        }
       }).strength(1)

    var forceXCombine =  d3.forceX(width/ 2).strength(1)

    var forceCollide = d3.forceCollide(function(d) {
        return radiusScale(d.suicides_no + 1);
    });

    var simulation = d3.forceSimulation() 
        .force("x", forceXCombine)
        .force("y", d3.forceY(height/2).strength(1))
        .force("collide", forceCollide)
    
    d3.json(`/suicidedatabycountry`).then(function(suicidedata, error) {
        if (error) {
            console.log(error);

            throw error;
        }
        console.log("suicide data", suicidedata);

    
    
    var circles = svg.selectAll("g")
        .data(suicidedata)
        .enter().append("circle")
        .attr("class", "gender")
        .attr("r", function(d){
            return radiusScale(d.suicides_no);
        })

        .attr("fill", function(d){

            if (d.sex === "female"){
                console.log("this is female")
                return "lightpink"
            }else {
                console.log("this is male")
                return "lightblue"  
            }
        });

        d3.select("#gendersplitbycountry").on('click', function() {
            console.log("you clicked me");
        })

        d3.select("#combinationbycountry").on('click', function () {
            simulation
                .force("x", forceXCombine)
                .alphaTarget(0.05)
                .restart()
            console.log("combine the bubbles")    
        })

        d3.select("#gendersplitbycountry").on('click', function () {
            simulation
                .force("x", forceXSeparate)
                .alphaTarget(0.05)
                .restart()
            console.log("combine the bubbles")    
        })


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

























 
