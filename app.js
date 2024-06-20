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

app.get("/pokemon-pretty/", (req, res) => {
    const listElements = [...pokemon];

    for (let i = 0; i < pokemon.length; i++){
        pokemon[i] = `<li><a href="http://localhost:8888/pokemon-pretty/${i}">${pokemon[i].name}</a></li>`
    }
    res.send(`
        <ul>
            ${listElements.join("")}
        </ul>
    `)
})

app.get("/pokemon-pretty/:indexOfArray", (req, res) => {
    const { indexOfArray } = req.params;
    if (indexOfArray >= pokemon.length || indexOfArray < 0)
        res.send(`Sorry, no pokemon found at ${indexOfArray}`)
    else{
        const poke = pokemon[indexOfArray]
        const type = poke.type;
        res.send(`
            <img src="${poke.img}">
            <div>
                <h1>${poke.name}</h1>
                <h2>Type</h2>
                <ul>
                    ${type}
                </ul>
            </div>
            
            <style style="color: transparent">
                *{
                    margin: 0;
                    padding: 0;
                    display: block;
                    width: fit-content;
                }
                img{
                    display: block;
                    margin: auto;
                }
                div{
                    margin: auto;
                    width: 400px;
                    padding: 10px;
                    border: 3px solid rgba(0, 0, 0, 0.2);
                    border-radius: 20px;
                }
                h1{
                    margin: auto;
                }
                ul{
                    display: flex;
                    gap: 10px;
                }
            </style>
        `)
    }
})

app.get("/pokemon/search", (req, res) => {
    const pokemonName = req.query.name;
    const index = pokemon.findIndex(x => x.name.toLowerCase() === pokemonName.toLowerCase());
    if (index === -1)
        res.send([]);
    else
        res.send([pokemon[index]]);
})

app.get("/pokemon/:indexOfArray", (req, res) => {
    const { indexOfArray } = req.params;
    if (indexOfArray >= pokemon.length || indexOfArray < 0)
        res.send(`Sorry, no pokemon found at ${indexOfArray}`)
    else
        res.send(pokemon[indexOfArray]);

})

app.get("/:verb/:adjective/:noun", (req, res) => {
    const { verb, adjective, noun } = req.params;
    res.send(`Congratulations on starting a new project called ${verb}-${adjective}-${noun}!`)
  });

// EXPORT
module.exports = app;