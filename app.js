const express = require('express');
const app = express();
const pokemon = require('./models/pokemon.json');

// console.log(pokemon[0]);

app.get('/', (req, res) => {
    res.send('This is the Home Page');
});

app.get('/congrats/:verb/:adjective/:noun', (req, res) => {
    const { verb, adjective, noun } = req.params;
    res.send(`Congratulations on starting a new project called ${verb}-${adjective}-${noun}!`);
});

app.get('/bugs/:numOfBugs', (req, res) => {
    const { numOfBugs } = req.params;
    const header = `<h1>${numOfBugs} little bugs in the code</h1>`;
    const link_pullOne = `<a href="/bugs/${Number(numOfBugs) + 2}">pull one down, patch it around</a>`;
    const link_toHome = `<a href="/">Back to Home</a>`;

    if (Number(numOfBugs) >= 200) {
        res.send(header + 'Bug limit reached! ' + link_toHome);
    } else {
        res.send(header + link_pullOne);
    }
});


app.get('/pokemon', (req, res) => {
    res.send(pokemon);
});

app.get('/pokemon/:indexOfPokemon', (req, res) => {
    const { indexOfPokemon } = req.params;

    if (pokemon[indexOfPokemon]) {
        res.send(pokemon[indexOfPokemon]);
    } else {
        res.send(`Sorry, no pokemon found at index: ${indexOfPokemon}`);
    }
}); 

module.exports = app;