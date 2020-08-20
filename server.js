const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@email.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "456",
      name: "Sally",
      email: "sally@email.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: "987",
      hash: "",
      email: "john@email.com",
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

// signin
app.post("/signin", (req, res) => {
  // Load hash from your password DB.
  bcrypt.compare("apples", '$2a$10$2DDtI1.xqMsVFGPiIcoGRuQH333./ecQ41oz1r/aUVKNW9eHwXd3K', function (err, res) {
    // res == true
    console.log("first guess", res)
  });
  bcrypt.compare(
    "veggies",
    "$2a$10$2DDtI1.xqMsVFGPiIcoGRuQH333./ecQ41oz1r/aUVKNW9eHwXd3K",
    function (err, res) {
      // res = false
      console.log("second guess", res);
    }
  );
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("sucess");
  } else {
    res.status(400).json("password and email do not match");
  }
  res.json("signin");
});

// register
app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json("user not found");
  }
});

// image endpoint to update entry input
app.post("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json("not found");
  }
});

app.listen(3001, () => {
  console.log("app is running on port 3001");
});

// Route Route - this is working
// Signin Route - POST Request (return new created user)
// Regiser - POST Request (either registration is sucessful or fail)
// Profile:userId -- GET Request
// image endpoint --> PUT --> returns update count
