const express = require("express");
const bodyParser = require("body-parser");
// const connection = require("./db/db_connect");
const app = express();
const port = 3001;
const path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../code/public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../code/pages", "index.html"));
});

// Serve the signup HTML file
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../code/pages", "signup.html"));
});

// Serve the forget HTML file
app.get("/forgot-password", (req, res) => {
  res.sendFile(path.join(__dirname, "../code/pages", "forget.html"));
});

// configure routes
// app.post("/signup", (req, res) => {
//   const { username, email, dob, password } = req.body;
//   const query = `INSERT INTO user_details (user_name, email_id, date_of_birth, password) VALUES ('${username}', '${email}', '${dob}', '${password}')`;
//   connection.query(query, (err, results) => {
//     if (err) throw err;
//     res.redirect("/");
//   });
// });

// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   const query = `SELECT * FROM user_details WHERE user_name = '${username}' AND password = '${password}'`;
//   connection.query(query, (err, results) => {
//     if (err) throw err;
//     if (results.length > 0) {
//       res.redirect("/home");
//     } else {
//       res.send("Invalid login credentials");
//     }
//   });
// });

// app.get("/home", (req, res) => {
//   res.send("Login successful");
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
