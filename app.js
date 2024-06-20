const express = require('express')
const pokemon = require('./models/pokemon.json')

const app = express()

const findPokemonByName = (name) => {
    return pokemon.find((mon) => mon.name.toLowerCase() === name)
}


app.get('/bugs', (req, res) => {
    const params = 99
    res.send(`<h1>${params} little bugs in the code</h1><a href="/bugs/${params + 2}">pull one down, patch it around</a>`)
})

app.get('/bugs/:numberOfBugs', (req, res) => {
    const { numberOfBugs } = req.params;
    res.send(`<h1>${numberOfBugs} little bugs in the code</hi><a href="/bugs/${numberOfBugs > 200 ? '' : (Number(numberOfBugs) + 2)}">${numberOfBugs > 200 ? 'start over' : 'pull one down, patch it around'}</a>`)

})

app.get('/:verb/:adjective/:noun', (req, res) => {
    const { verb, adjective, noun } = req.params;
    res.send(`Congratulations on starting a new project called ${verb}-${adjective}-${noun}`)
})

app.get('/pokemon', (req, res) => {
    const pokemonList = pokemon.map((mon) => `<li>${mon.name}</li>`)
    res.send(`${[...pokemonList]}`)
})

app.get('/pokemon/search', (req, res) => {
    const { name } = req.query;
    const foundPokemon = findPokemonByName(name)
    foundPokemon ? res.send(foundPokemon) : res.send(`Could not find the pokemon ${name}`)
})

app.get('/pokemon/:indexOfArray', (req, res) => {
    const { indexOfArray } = req.params;
    pokemon[indexOfArray] ? res.send(pokemon[indexOfArray]) : res.send(`Sorry no pokemon found at /pokemon${indexOfArray}`)
})

app.get('/pokemon-pretty/:indexOfArray', (req, res) => {
    const { indexOfArray } = req.params;
    pokemon[indexOfArray] ? res.send(`<h1>${pokemon[indexOfArray].name}</h1> <img src="${pokemon[indexOfArray].img}"/> <h3>${pokemon[indexOfArray].misc.classification}</h3>`) 
    : 
    res.send(`Sorry no pokemon found at /pokemon${indexOfArray}`)
})


module.exports = app