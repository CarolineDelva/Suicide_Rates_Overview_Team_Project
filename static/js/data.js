d3.json(`/suicidedatabycountry`).then(function(suicidedata, error) {
  if (error) {
      console.log(error);

      throw error;
  }
  console.log("suicide data", suicidedata);
}


// from data.js
var tableData = data;

// YOUR CODE HERE!

var date = data.map(date =>date.datetime);
// console.log(date);
var city = data.map(city => city.city);
// console.log(city);
var state = data.map(state => state.state);
// console.log(state);
var countries = data.map(countr => countr.country);
// console.log(countries);
var shape = data.map(shape => shape.shape);
// console.log(shape);
var durationMinutes = data.map(minutes => minutes.durationMinutes);
// console.log(durationMinutes);
var comments = data.map(comment => comment.comments);
// console.log(comments);



function buildTable(date, city, state, countries, shape, durationMinutes, comments){
    var table = d3.select("#ufo-table");
    
    var tbody = table.select("tbody");
    var trow;

    for (var i = 0; i < data.lenght; i++){
        trow.append("tr");
        trow.append("td").text(date[i]);
        trow.append("td").text(city[i]); 
        trow.append("td").text(state[i]);
        trow.append("td").text(countries[i]);
        trow.append("td").text(shape[i]);
        trow.append("td").text(durationMinutes[i]);
        trow.append("td").text(comments[i]);
        console.log("this is the " + table)
        }
};

function handleClick() {
    console.log("A button was clicked!");
  
    // We can use d3 to see the object that dispatched the 
    // an event always has a target which is what was clicked 
    console.log(d3.event.target);
  }
  
  // We can use the `on` function in d3 to attach an event to the handler function
  button.on("click", handleClick);
 

