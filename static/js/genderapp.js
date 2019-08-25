
d3.json('/suicidedatabycontinent').then(function (suicidedata, error) {
    if (error) throw error;
    console.log("suicide data", suicidedata)
});



