const express = require("express");
const app = express();
const PORT = 3000;

//BODY PARSER
const bodyParser = require("body-parser");

//USING BODY PARSER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

//IMPORTING ROUTES
const jobDetails = require("./routes/jobs");
console.log(jobDetails);

//TESTING BASE PORT
app.get("/", (req, res) => {
  res.send("this is the base port");
});

//CREATE
app.get("/routes/jobs", (req, res) => {
  res.json(jobDetails);
});

//POST
app.post("/routes/jobs/", (req, res) => {
  res.send(`this is a post route`);
});

//DELETE

//PUT

//PATCH

// app.get("/routes/jobs/:", (req, res) => {
//   res.send(`this is the jobs directory ${req.params.id}`);
// });

// Shhh........ Local Host is listening.
app.listen(PORT, () => {
  console.log(`server is listening on port: ${PORT}`);
});
