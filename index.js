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
const jobDetails = require("./routes/jobDetails"); //job details rout
console.log(jobDetails);
const users = require("./routes/users"); //users route
console.log(users);
const comment = require("./routes/comment"); //comment route
console.log(comment);
//IMPORTING DELETE VIEW

//METHOD OVERRIDE TO ENABLE DELETE/UPDATE
const methodOverride = require("method-override");
//USING METHOD OVERRIDE
app.use(methodOverride("_method"));

//=================middleware==================

// Custom Middleware: Logs method, URL, and timestamp for each request
const logRequestDetails = (req, res, next) => {
  const method = req.method; // HTTP method (GET, POST, etc.)
  const url = req.url; // Request URL
  const timestamp = new Date().toISOString(); // Current timestamp
  console.log(`[${timestamp}] ${method} request to ${url}`);
  next(); // Pass control to the next middleware or route handler
};

// Use the custom middleware for all routes
app.use(logRequestDetails);

app.use((req, res, next) => {
  console.log("runs through all the routes");
  next();
});

//========================end middleware=====================

//TESTING BASE PORT
app.get("/", (req, res) => {
  res.send("this is the base port");
});

//=================================RENDER VIEW==================================================

//USERS VIEW
// app.get("/routes/users/:id", (req, res) => {
//   res.send(users[req.params.id]);
// });

//ADDUSERS VIEW
app.get("/users/addUser", (req, res) => {
  res.render("users/addUser");
});
//*******************************END OF VIEWS********************** */

//******************************POSTS******************************* */
//add user post
app.post("/routes/users", (req, res) => {
  //   const name = req.body.userName;// CATCHING THE VALUE RETURNED FROM THE FORM IN THE USERNAME INPUT
  //   const email = req.body.email;//CATCHING THE VALUE RETURNED FROM THE FORM IN THE EMAIL INPUT
  users.push(req.body);
  res.json(users);
});

//*******************************END POSTS********************************* */
//JOBDETAILS NEWS.JSX***********************

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

//EDITUSER .JSX
app.get("/users/editUser", (req, res) => {
  res.render("users/editUser");
});

//try in chatGPT
//EDIT USER POST
app.get("/routes/users", (req, res) => {
  //const id = req.body;
  //   const indexValue = users[id];
  //   const name = req.body.userName;
  //   const email = req.body.email;
  //   users.id = id;
  //   users.username = name;
  //   users.email = email;
  res.render("users/editUser", {
    title: job.title,
    description: job.description,
    id: req.body, // Pass the job ID as well
  });
});
//req.json(users);

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
// app.get("/jobDetails/Delete", (req, res) => {
//   res.render("jobDetails/Delete");
// });

app.get("/jobDetails/Delete", (req, res) => {
  res.render("jobDetails/Delete"); // Render the delete form
});

app.delete("/routes/jobDetails/:id", (req, res) => {
  const jobId2 = req.params.id; // Get the job ID from the URL parameter

  if (jobDetails[jobId2]) {
    // Delete the job from the array
    jobDetails.splice(jobId2, 1); // Splice removes 1 job at the specified index

    res.json({
      message: `Job with ID ${jobId2} deleted successfully.`,
      remainingJobs: jobDetails, // Return the updated job list
    });
  } else {
    res.status(404).send(`Job with ID ${jobId2} not found.`);
  }
});

// app.delete("/routes/jobDetails", (req, res) => {
//   jobDetails.splice(1);
//   res.json(jobDetails);
// });

// app.get("/routes/jobs/:", (req, res) => {
//   res.send(`this is the jobs directory ${req.params.id}`);
// });

app.use((req, res) => {
  console.log(
    `i am only in this middleware if no other routes have sent a response`
  );
  res.status(404);
  res.json({ error: `resource not found` });
});

// Shhh........ Local Host is listening.
app.listen(PORT, () => {
  console.log(`server is listening on port: ${PORT}`);
});
