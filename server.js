const app = require("./app.js");
require("dotenv").config();
const PORT = process.env.PORT;
const pokemon = require('./models/pokemon.json')

// app.get('/', (req, res) => {
//     res.send("This is my app")
// })

app.get('/:verb/:adjective/:noun', (req, res) => {
    const { verb, adjective, noun } = req.params;
    res.send(`Congratulations on starting a new project called ${verb}-${adjective}-${noun}!`)
})


// Bugs In The Code.

app.get('/bugs', (req, res) => {
    const bugs = 99;
    res.send(`
        <h1>${bugs} little bugs in the code</h1>
        <a href="/bugs/${bugs + 2}">Pull one down, patch it around</a>
    `);
});

app.get('/bugs/:numberOfBugs', (req, res) => {

    const numberOfBugs = parseInt(req.params.numberOfBugs);

    let response = `<h1>${numberOfBugs} little bugs in the code</h1>`;

    if (numberOfBugs > 200) {
        response += `<a href="/bugs">Start over</a>`;
    } else {
        response += `<a href="/bugs/${numberOfBugs + 2}">Pull one down, patch it around</a>`;
    }

    res.send(response);
});


//Poke-Express

// display all pokemon (pokemon.json)
app.get('/pokemon', (req, res) => {
    res.json(pokemon)
})

//search by name
app.get('/pokemon/search', (req, res) => {
  const name = req.query.name.toLowerCase();
  const foundPokemon = pokemon.find(poke => poke.name.toLowerCase() === name);
  if (foundPokemon) {
    res.json(foundPokemon);
  } else {
    res.send(`Sorry, no pokemon found with the name ${name}`);
  }
});

//search by index
app.get('/pokemon/:indexOfArray', (req, res) => {
  const index = parseInt(req.params.indexOfArray, 10);
  if (index >= 0 && index < pokemon.length) {
    res.json(pokemon[index]);
  } else {
    res.send(`Sorry, no pokemon found at ${index}`);
  }
});




// LISTEN
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});