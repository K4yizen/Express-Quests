const express = require("express");
require("dotenv").config();



const app = express();

app.use(express.json()); // add this line


const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const { hashPassword } = require("./auth.js");
const movieHandlers = require("./movieHandlers");

const { validateMovie } = require("./validators.js");
const { validateUser } = require("./validators.js");



app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);


const userHandlers = require("./userHandlers");

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);

app.post("/api/users", validateUser, hashPassword, userHandlers.createUser);
app.post("/api/movies", validateMovie, movieHandlers.postMovie);

app.put("/api/movies/:id", movieHandlers.updateMovie);
app.put("/api/users/:id",hashPassword, userHandlers.updateUser);

app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", userHandlers.deleteUser);

app.use(express.json());

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});