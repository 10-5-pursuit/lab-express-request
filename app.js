const express = require('express');

const app = express();

const pokemon = require('./models/pokemon.json');




app.get('/', (req, res) => {
    res.send("welcome to my App.");
});


app.get('/:verb/:adjective/:noun', (req, res) => {
    const {verb, adjective, noun} = req.params;
    res.send(`Congratulations on starting a new project called ${verb}-${adjective}-${noun}!`);
});

app.get('/bugs', (req, res) => {
    const totalBugs = 99;
    res.send(`${totalBugs} little bugs in the code. <br>
        <a href="/bugs/${totalBugs + 1}">Pull one down, patch it around.</a>`);
});

app.get('/bugs/:totalBugs', (req, res) => {
    const {totalBugs} = req.params;
    if(+totalBugs > 199) {
    res.send("Too many bugs! Start over!");
    } else {
        res.send(`${totalBugs} little bugs left in the code, ${totalBugs} little bugs <a href="/bugs/${+totalBugs + 2}">Pull one down, patch it around</a>`);
    }
});


    app.get('/pokemon', (req, res) => {
        res.json(pokemon);
});


app.get('/pokemon/:arrayIndex', (req, res) => {
    const {arrayIndex} = req.params;
    if(pokemon[arrayIndex]) {
        res.status(200).json(pokemon[arrayIndex]);
    } else {
        res.status(404).json(`Sorry, no Pokemon found at ${arrayIndex}.`);
    }
});


app.get('/pokemon/search', (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ error: "No name parameter provided" });
    }
    const result = pokemon.filter(p => p.name.toLowerCase() === name.toLowerCase());

    if (result.length > 0) {
        res.status(200).json(result);
    } else {
        res.status(404).json({ error: "Pokemon not found" });
    }
});





module.exports = app;