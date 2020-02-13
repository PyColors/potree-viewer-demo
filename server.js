const express = require("express");
const app = express();
const port = 8022;

// Serve static files from libs and pointclouds directory
app.use("/libs", express.static("./libs/"));
app.use("/pointclouds", express.static("./pointclouds/"));
app.use("/style", express.static("./style"));

// Render main.html, specify the root
app.get("/", (req, res) => {
  res.sendFile("main.html", { root: "." });
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.options("http://localhost:7000/items", function(request, response, next) {
  response.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, OPTIONS"
  );
  response.send();
});
