d3.json(`/suicideratesdata2`).then(function(suicidedata) {
  // if (error) {
  //     console.log(error);

  //     throw error;
  // }
  console.log("suicide data", suicidedata);


// YOUR CODE HERE!
var table = suicidedata

var ID = suicidedata.map(date =>date.id);
 console.log( "ID" , ID);
var country = suicidedata.map(city => city.country);
console.log( "country", country);
var year = suicidedata.map(state => state.year);
console.log("year", year );
var sex = suicidedata.map(countr => countr.sex);
console.log("sex", sex);
var age = suicidedata.map(ag => ag.age)
console.log("age", age)
var suicides_no = suicidedata.map(shape => shape.suicides_no);
console.log("suicide_no" , suicides_no);
var population = suicidedata.map(minutes => minutes.population);
 console.log("population", population);
var suicideshundredk = suicidedata.map(comment => comment.suicideshundredk);
console.log("suicideshundredk", suicideshundredk);
var country_year = suicidedata.map(shape => shape.country_year);
console.log("country_year", country_year);
var HDIforyear = suicidedata.map(minutes => minutes.hdiforyear);
console.log("hdiforyear",  HDIforyear );
var gdp_for_year = suicidedata.map(comment => comment.gdp_for_year);
console.log("gdp_for_year", gdp_for_year);
var gdp_per_capita = suicidedata.map(shape => shape.gdp_per_capita);
console.log("gdp_per_capita", gdp_per_capita);
var generation= suicidedata.map(minutes => minutes.generation);
console.log("generation", generation);

//var updatedList = JSON.stringify(HDIforyear.list, function (key, value) {return (value === null) ? "" : value});

//If an element is null, make it empty string:
for (var i = 0; i < HDIforyear.length; i++){
  if (HDIforyear[i] == null){
    HDIforyear[i] = "";
  }
  if (HDIforyear[i] == 0){
    HDIforyear[i] = "";
  }
  if (HDIforyear[i] == "null"){
    HDIforyear[i] = "";
  }
};


function buildTable(country, year, sex, age, suicides_no, population, gdp_for_year, gdp_per_capita, generation){
   
  console.log("ID FOO BAR: ");
  console.log(ID);
  var table = document.getElementById("datatable");
  
  for (var i = 0; i < 100; i++){

    var row = table.insertRow(i);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    var cell9 = row.insertCell(8);
    //var cell10 = row.insertCell(9);
    // var cell11 = row.insertCell(9);
    // var cell12 = row.insertCell(10);
    // var cell13 = row.insertCell(11);
      
    // cell1.innerHTML = ID[i].toString();
    cell1.innerHTML = country[i].toString();
    cell2.innerHTML = year[i].toString();
    cell3.innerHTML = sex[i].toString();
    cell4.innerHTML = age[i].toString();
    cell5.innerHTML = suicides_no[i].toString();
    cell6.innerHTML = population[i].toString();
    // cell8.innerHTML = suicideshundredk[i].toString();
    // cell9.innerHTML = country_year[i].toString();
    //cell10.innerHTML = HDIforyear1[i].toString();
    cell7.innerHTML = gdp_for_year[i].toString();
    cell8.innerHTML = gdp_per_capita[i].toString();
    cell9.innerHTML = generation[i].toString();
  
    console.log("this is the " + table);
  }
};

buildTable(country, year, sex, age,  suicides_no, population, gdp_for_year, gdp_per_capita, generation);


function addhead() {
  var table = document.getElementById("datatable");



  var header = table.createTHead();
  var row = header.insertRow(0);

  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  var cell7 = row.insertCell(6);
  var cell8 = row.insertCell(7);
  var cell9 = row.insertCell(8);



  cell1.innerHTML = "<b>Country</b>";
  cell2.innerHTML = "<b>Year</b>";
  cell3.innerHTML = "<b>Sex</b>";
  cell4.innerHTML = "<b>Age</b>";
  cell5.innerHTML = "<b>Suicide Number</b>";
  cell6.innerHTML = "<b>Population</b>";
  cell7.innerHTML ="<b>GDP per Year</b>";
  cell8.innerHTML = "<b>GDP per Capita</b>";
  cell9.innerHTML = "<b>Generation</b>";


  
}


addhead(); 

function handleClick() {
    console.log("A button was clicked!");

    // We can use d3 to see the object that dispatched the 
    // an event always has a target which is what was clicked 
    console.log(d3.event.target);
  }

  // We can use the `on` function in d3 to attach an event to the handler function
d3.select("button").on("click", handleClick);

 });




 

