const express = require('express')

const app = express()

// imports
const pokemon = require('./models/pokemon.json')

app.get('/', (req,res)=> {
    res.send('Welcome 99 Pokemon');
} )

app.get('/:verb/:adjective/:noun', ( req, res )=> {

const {adjective, verb, noun} = req.params;

res.send(`Congratulations on starting a new project called ${ verb }-${ adjective }-${ noun }!`)

})

// When addressing a specific param directory you can update it within

app.get('/bugs',(req, res)=> {

    const bugsNumber = 99;

    res.send(`${bugsNumber} little bugs in the code
        <a href="/bugs/${bugsNumber + 1}">Pull one Down</a> <a>Patch it around</a>`)
})

app.get('/bugs/:numberOfBugs', ( req, res )=> { 

    const { numberOfBugs } = req.params

    if(Number( numberOfBugs )> 199) {

        res.send('Too many bugs!! Start over!')

    } else {

        res.send(`
            ${numberOfBugs} little bugs in the code, ${numberOfBugs} little bugs in the code ${numberOfBugs} little bugs <a href="/bugs/${+numberOfBugs + 2}">Pull one down, patch it around</a>`);
            }
        })

app.get('/pokemon', (req, res)=> {
    res.send(pokemon)
})


// helper function
const searchedPokemon = ( name ) => {
    return pokemon.find(poke => poke.name.toLowerCase() ||poke.name.toUpperCase() === name)
}
//
app.get('/pokemon/search', ( req, res )=> {

    const { name } = req.query;
    console.log(name)
    
    const searchResults = searchedPokemon(name)
    
    if(searchResults) { 
        
        res.send([searchResults]) 
        
    } else {
        
        res.send( [] )
        
    } 
})

app.get('/pokemon/:indexOfArray', (req, res)=> {
    const { indexOfArray } = req.params;

    // if(parseInt(indexOfArray)){

    //     return res.send(pokemon[parseInt(indexOfArray)])

    // } else {

    //     return res.send(`Sorry, no pokemon found at${indexOfArray}`)

    // }
    pokemon[indexOfArray] ? res.send(pokemon[indexOfArray]) : res.send(`Sorry, no pokemon found at ${indexOfArray}`)
})



module.exports = app







