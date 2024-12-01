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
//IMPORTING DELETE VIEW

//METHOD OVERRIDE TO ENABLE DELETE/UPDATE
const methodOverride = require("method-override");
//USING METHOD OVERRIDE
app.use(methodOverride("_method"));

//TESTING BASE PORT
app.get("/", (req, res) => {
  res.send("this is the base port");
});

//=================================RENDER VIEW==================================================
//NEWS.JSX***********************

app.get("/jobDetails/News", (req, res) => {
  //the fruits/new in the render needs to be pointing to     something in my views folder

  res.render("jobDetails/News");
  //console.log(jobDetails);
});

//POST**************************
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

app.get("/jobDetails/Edits/:id", (req, res) => {
  const job = jobDetails[req.params.id]; // Retrieve the job based on the ID
  if (job) {
    res.render("jobDetails/Edits", {
      title: job.title,
      description: job.description,
      id: req.params.id, // Pass the job ID as well
    });
  } else {
    res.status(404).send("Job not found");
  }
});

// app.get("/jobDetails/Edits", (req, res) => {
//   res.render(
//     "jobDetails/Edits"
//     //,
//     //     {
//     //     title: jobDetails[req.params.id],
//     //     description: jobDetails[req.params.id],
//     //     id: [req.params.id],
//     //   }
//   );
// });

//PUT
app.put("/routes/jobDetails/:id", (req, res) => {
  const jobId = req.params.id; // Get the job ID from the URL parameters
  const updatedJobDetails = req.body; // Get the updated job details from the request body

  if (jobDetails[jobId]) {
    // Update the job details in the jobDetails array or object
    jobDetails[jobId] = { ...jobDetails[jobId], ...updatedJobDetails };

    // Send a response back with the updated job
    res.json({
      message: `Job ${jobId} updated successfully`,
      updatedJob: jobDetails[jobId],
    });
  } else {
    // If the job ID doesn't exist, return a 404 error
    res.status(404).send(`Job with ID ${jobId} not found.`);
  }
});

// app.put("/routes/jobDetails/:id", (req, res) => {
//   const ID = req.params.id;
//   const title = req.body.title; // Assume the body contains the updated job details
//   const description = req.body.description;
//   // Logic to update the job in your database or array

//   res.send(`Job ${ID} updated successfully ${jobDetails}`);
//   jobDetails[ID] = ID; //req.body;
//   res.json(jobDetails[ID]);
// });
// app.put("/routes/jobDetails/", (req, res) => {
//   //jobDetails.push(req.body);
//   jobDetails[req.params.id] = { ...jobDetails[req.params.id], ...[req.body] };

//   res.json(jobDetails);
// });

// app.put("/routes/jobDetails/req.params.id", (req, res) => {
//   const ID = req.params.id; // Job ID to update
//   const updatedJobDetails = req.body; // The updated job details from the request body

//   // Assuming jobDetails is an array and each job has a unique ID, you can update it like this
//   if (jobDetails[ID]) {
//     // Update the job details with the new data from the request body
//     jobDetails[ID] = { ...jobDetails[ID], ...updatedJobDetails };

//     // Send the updated job details in the response
//     res.json({
//       message: `Job ${ID} updated successfully`,
//       updatedJob: jobDetails[ID],
//     });
//   } else {
//     // If the job ID doesn't exist
//     res.status(404).send(`Job with ID ${ID} not found.`);
//   }
// });

//       id: req.params.id,
//   if (req.params.id >= 0 && req.params.id < fruits.length) {
//     res.render("fruits/Edit", {
//       fruit: fruits[req.params.id],
//       id: req.params.id,
//     });
//   } else {
//     res.send("<p>this is edit not a Valid ID</p>");
//   }

//========================================END RENDER VIEW================================================

//CREATE
// app.get("/routes/jobs", (req, res) => {
//   res.json(jobDetails);
// });
// app.get("/routes/jobs/:id", (req, res) => {
//   res.json(jobDetails[req.params.id]);
// });

//DELETE
// app.delete("/routes/jobDetails/:id", (req, res) => {
//   jobDetails.splice(req.params.id, 1);
//   res.json(jobDetails);
// });
app.delete("/routes/jobDetails/Delete", (req, res) => {
  jobDetails.splice(1);
  res.json(jobDetails);
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
