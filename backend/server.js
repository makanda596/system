const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./db/conn");
const app = express();
const port = 3001;
const path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../code/public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../code/pages", "index.html"));
});

// Get dashboard
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../code/pages", "dashboard.html"));
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
app.post("/signup", (req, res) => {
  const { username, email, full_name, password } = req.body;
  const query = `INSERT INTO user_details (user_name, email_id, full_name, password) VALUES ('${username}', '${email}', '${full_name}', '${password}')`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error inserting user details:", err);
      return res
        .status(500)
        .send({ error: "An error occurred while registering the user." });
    }
    res.redirect("/");
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM user_details WHERE email_id = '${email}' AND password = '${password}'`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error verifying user details:", err);
      return res
        .status(500)
        .send({ error: "An error occurred while login the user." });
    }
    if (results.length > 0) {
      res.redirect("/home");
    } else {
      res.send({ error: "Invalid login credentials" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
