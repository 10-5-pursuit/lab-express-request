// DEPENDENCIES
const express = require("express");
// const poke = require("./models/pokemon.json");


// CONFIGURATION
const app = express();

// ROUTES
// app.get("/welcoming/happy", (req, res) => {
//   res.send(req.params);
// });

app.get("/welcoming/:happy/:home", (req, res) => {
    const verb = "welcoming"
    const adjective = req.params.happy;
    const noun = req.params.home;

    res.send(`Congratulations on starting a new project called ${verb}-${adjective}-${noun}!`);
  });

// EXPORT
module.exports = app;