const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

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

// const database = {
//   users: [
//     {
//       id: "123",
//       name: "John",
//       email: "john@email.com",
//       password: "cookies",
//       entries: 0,
//       joined: new Date(),
//     },
//     {
//       id: "456",
//       name: "Sally",
//       email: "sally@email.com",
//       password: "bananas",
//       entries: 0,
//       joined: new Date(),
//     },
//   ],
//   login: [
//     {
//       id: "987",
//       hash: "",
//       email: "john@email.com",
//     },
//   ],
// };

app.get("/", (req, res) => {
  res.send(database.users);
});

// signin
app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("password and email do not match");
  }
  res.json("signin");
});

// register
app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  db("users")
    .returning("*")
    .insert({
      email: email,
      name: name,
      joined: new Date(),
    })
    .then((user) => {
      res.json(user[0]);
    })
    .catch((err) => res.status(400).json("unable to register"));
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;

  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("not found");
      }
    })
    .catch((err) => res.status(400).json("error getting user"));
});

// image endpoint to update entry input
app.put("/image", (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
});

app.listen(3001, () => {
  console.log("app is running on port 3001");
});

// Route Route - this is working
// Signin Route - POST Request (return new created user)
// Regiser - POST Request (either registration is sucessful or fail)
// Profile:userId -- GET Request
// image endpoint --> PUT --> returns update count
