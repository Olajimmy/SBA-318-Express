//IMPORTING EXPRESS
const express = require("express");
const app = express();

//PORT DECLARATION
const PORT = 3000;

//VIEW ENGINE
const jsxViewEngine = require("jsx-view-engine");
console.log(jsxViewEngine);
//SETTING IT UP FOR USE
app.set("view engine", "jsx");
app.set("views", "./views");
app.engine("jsx", jsxViewEngine());

//BODY PARSER
const bodyParser = require("body-parser");

//USING BODY PARSER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

//IMPORTING ROUTES
const jobDetails = require("./routes/jobDetails");
console.log(jobDetails);

//TESTING BASE PORT
app.get("/", (req, res) => {
  res.send("this is the base port");
});

//=================================RENDER VIEW==================================================
//NEWS.JSX

app.get("/jobDetails/News", (req, res) => {
  //the fruits/new in the render needs to be pointing to     something in my views folder

  res.render("jobDetails/News");
  //console.log(jobDetails);
});

//POST
// app.post("/routes/jobDetails/:id", (req, res) => {
//   res.send(`this is a post route`);
//   jobDetails.push(req.body[req.params.id]);
//   console.log(`${JSON.stringify(req.body)}`);
//   res.json(jobDetails);
// });
app.post("/routes/jobDetails/", (req, res) => {
  // res.send(`this is a post route`);
  // jobDetails.push(req.body[req.params.id]);
  // console.log(`${JSON.stringify(req.body)}`);
  // res.json(jobDetails);
  jobDetails.push(req.body);
  res.json(jobDetails);
});

// EDITS.JSX
app.get("/fruits/:id/edits", (req, res) => {
  if (req.params.id >= 0 && req.params.id < fruits.length) {
    res.render("fruits/Edit", {
      fruit: fruits[req.params.id],
      id: req.params.id,
    });
  } else {
    res.send("<p>this is not a Valid ID</p>");
  }
});
//========================================END RENDER VIEW================================================

//CREATE
// app.get("/routes/jobs", (req, res) => {
//   res.json(jobDetails);
// });
// app.get("/routes/jobs/:id", (req, res) => {
//   res.json(jobDetails[req.params.id]);
// });

//DELETE
app.delete("/routes/jobs/:id", (req, res) => {
  jobDetails.splice(req.params.id, 1);
  res.json(jobDetails);
});

//PUT
app.put("/routes/jobs/:id", (req, res) => {
  jobDetails[req.params.id] = req.params.id; //req.body;
  res.json(jobDetails[req.params.id]);
});

//PATCH
app.patch("/routes/jobs:/", (req, res) => {
  console.log(jobDetails[req.params.id]);
  console.log(req.body);
  const newJobDetails = { ...jobDetails[req.params.id], ...req.body };
  jobDetails[req.params.id] = newJobDetails;
  res.json(jobDetails[req.params.id]);
});
// app.get("/routes/jobs/:", (req, res) => {
//   res.send(`this is the jobs directory ${req.params.id}`);
// });

// Shhh........ Local Host is listening.
app.listen(PORT, () => {
  console.log(`server is listening on port: ${PORT}`);
});
