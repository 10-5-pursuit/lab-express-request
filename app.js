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


app.get('/pokemon/search', (req, res) => {
    const { name, type } = req.query;
    let results = [];

    if (name) {
        results = pokemon.filter(monster => monster.name.toLowerCase() === name.toLowerCase());
        if (results.length > 0) {
            res.json(results);
        } else {
            res.status(404).send(`Cannot find Pokemon with name "${name}"`);
        }
    } else if (type) {
        results = pokemon.filter(monster => monster.type.map(t => t.toLowerCase()).includes(type.toLowerCase()));
        if (results.length > 0) {
            res.json(results);
        } else {
            res.status(404).send(`Cannot find Pokemon with type "${type}"`);
        }
    } else {
        res.status(400).send('Please provide a search parameter (name or type).');
    }
});

app.get('/pokemon/:indexOfPokemon', (req, res) => {
    const { indexOfPokemon } = req.params;

    if (pokemon[indexOfPokemon]) {
        res.send(pokemon[indexOfPokemon]);
    } else {
        res.send(`Sorry, no pokemon found at index: ${indexOfPokemon}`);
    }
});


app.get('/pokemon-pretty', (req, res) => {
    const listItems = pokemon.map((monster, index) => {
        return `<li><a href="/pokemon-pretty/${index}">${monster.name}</a></li>`;
    }).join('');
    const html = `<ul>${listItems}</ul>`;
    res.send(html);
});

app.get('/pokemon-pretty/:indexOfPokemon', (req, res) => {
    const { indexOfPokemon } = req.params;
    if (pokemon[indexOfPokemon]) {
        const monster = pokemon[indexOfPokemon];
        const type = `<p><b>Type:</b> ${monster.type.map(t => t).join(', ')}</p>`;
        
        const miscItems = () => {
            let result = [];
            const misc = monster.misc;
            for (let key in misc) {
                result.push(`<p><b>${key}:</b> ${misc[key]}</p>`);
            }
            return result.join(' ');
        }

        const miscList = miscItems();

        const statsItems = () => {
            let result = [];
            const stats = monster.stats;
            for (let key in stats) {
                result.push(`<p style="border: 2px solid grey; width: 100px; padding: 3px"><b style="color: blue">${key}:</b></> <span style="color: red">${stats[key]}</span></p>`);
            }
            return result.join('');
        }

        const statList = statsItems();

        const html = `<h1>${monster.name}</h1><img src="${monster.img}" height=250px width=250px></img>${type}${miscList}${statList}`;

        res.send(html);
    } else {
        res.send(`Cannot find Pokemon with index ${indexOfPokemon}`);
    }
});

module.exports = app;