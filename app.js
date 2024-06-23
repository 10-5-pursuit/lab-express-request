const express = require('express');
const app = express();
const pokemon = require('./models/pokemon.json');


// Route to show a list of all Pokémon
app.get('/pokemon', (req, res) => {
  res.json(pokemon);
});

// Route to search for a Pokémon by name
app.get('/pokemon/search', (req, res) => {
  const name = req.query.name ? req.query.name.toLowerCase() : '';
  console.log(req.query);
  const foundPokemon = pokemon.find((p) => p.name.toLowerCase() === name);
  if (foundPokemon) {
    res.json(foundPokemon);
  } else {
    res.status(404).send(`Sorry, no pokemon found with the name "${name}"`);
  }
});
// Route to show a single Pokémon by array index
app.get('/pokemon/:indexOfArray', (req, res) => {
  const index = parseInt(req.params.indexOfArray);
  if (!isNaN(index) && pokemon[index]) {
    res.json(pokemon[index]);
  } else {
    res
      .status(404)
      .send(`Sorry, no pokemon found at /pokemon/${req.params.indexOfArray}`);
  }
});


module.exports = app;