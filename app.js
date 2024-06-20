// DEPENDENCIES
const express = require("express");
const pokemon = require("./models/pokemon.json");

// CONFIGURATION
const app = express();

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome 99 Pokemon");
});

app.get("/bugs", (req, res) => {
    res.send(`
            <h1>99 little bugs in the code</h1>
            <a href="http://localhost:8888/bugs/101"> pull one down, patch it around </a>
    `)
});

app.get("/:verb/:adjective/:noun", (req, res) => {
    const { verb, adjective, noun } = req.params;
    res.send(`Congratulations on starting a new project called ${verb}-${adjective}-${noun}!`)
  });



app.get("/bugs/:numberOfBugs", (req, res) => {
    const { numberOfBugs } = req.params;
    if (numberOfBugs >= 200){
        res.send(`Too many bugs!! Start over!`)
    }
    else{
        res.send(`
            ${numberOfBugs} little bugs in the code <a href="http://localhost:8888/bugs/${Number(numberOfBugs)+2}">Pull one down, patch it around</a>
        `)  
    }
    
});

app.get("/pokemon", (req, res) => {
    res.send(pokemon);
})

app.get("/pokemon/:indexOfArray", (req, res) => {
    const { indexOfArray } = req.params;
    if (indexOfArray >= pokemon.length)
        res.send(`Sorry, no pokemon found at ${indexOfArray}`)
    res.send(pokemon[indexOfArray]);

})

// EXPORT
module.exports = app;