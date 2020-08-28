const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "Stala",
    password: "",
    database: "smart-brain",
  },
});

db.select("*")
  .from("users")
  .then((data) => {
    console.log(data);
  });

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(db.users)
});

// signin
app.post("/signin", signin.handleSignin(db, bcrypt)) 
// register
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get("/profile/:id", (req, res) => {profile.handleProfileGet(req, res, db)} )

// image endpoint to update entry input
app.put("/image", (req, res) => {image.handleImage(req, res, db)});

app.listen(3001, () => {
  console.log("app is running on port 3001");
});

// Route Route - this is working
// Signin Route - POST Request (return new created user)
// Regiser - POST Request (either registration is sucessful or fail)
// Profile:userId -- GET Request
// image endpoint --> PUT --> returns update count
