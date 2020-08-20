const express = require("express");
const app = express();

app.get('/', (req, res) => {
  res.send('this is working');
});

app.listen(3001, () => {
  console.log("app is running on port 3001");
});

// Route Route - this is working
// Signin Route - POST Request (return new created user)
// Regiser - POST Request (either registration is sucessful or fail)
// Profile:userId -- GET Request
// image endpoint --> PUT --> returns update count