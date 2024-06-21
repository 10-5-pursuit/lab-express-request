const express = require('express');
const app = express();
const pokemon = require('./models/pokemon.json');


app.get('/', (req, res) => {
    res.send('Welcome 99 Pokemon');
});


app.get('/bugs', (req, res) => {
    res.send(`
        <h1>99 little bugs in the code</h1>
        <a href="/bugs/101">Pull one down, patch it around</a>
    `);
});


app.get('/bugs/:numberOfBugs', (req, res) => {
    const { numberOfBugs } = req.params;
    const bugs = parseInt(numberOfBugs, 10);

    if (bugs >= 200) {
        res.send(`
            <h1>Too many bugs!! Start over!</h1>
            <a href="/bugs">Start Over</a>
        `);
    } else {
        res.send(`
            <h1>${bugs} little bugs in the code</h1>
            <a href="/bugs/${bugs + 2}">Pull one down, patch it around</a>
        `);
    }
});


app.get('/pokemon', (req, res) => {
    res.json(pokemon);
});


app.get('/pokemon/search', (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ error: 'You must provide a name to search for' });
    }

    const foundPokemon = pokemon.filter(p => p.name.toLowerCase() === name.toLowerCase());

    res.json(foundPokemon.length > 0 ? foundPokemon : []);
});

app.get('/pokemon/:index', (req, res) => {
    const { index } = req.params;
    const i = parseInt(index, 10);

    if (i >= 0 && i < pokemon.length) {
        res.json(pokemon[i]);
    } else {
        res.status(404).send(`Sorry, no pokemon found at ${index}`);
    }
});


app.get('/:verb/:adjective/:noun', (req, res) => {
    const { verb, adjective, noun } = req.params;
    res.send(`Congratulations on starting a new project called ${verb}-${adjective}-${noun}!`);
});

module.exports = app;
