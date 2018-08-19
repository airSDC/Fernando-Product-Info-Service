const express = require("express");
const routes = require("./../routes");
const path = require("path");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const app = express();

// app.set("port", process.env.PORT || 3003); //prod vs test environment switch
if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  app.set("port", process.env.PORT || 3004);

  app.get("/", function(req, res) {
    res.redirect("/rooms/1");
  });
}

app.use(express.static("public/"));
app.use(express.static("client/dist"));

app.get("/rooms/:id", function(req, res) {
  const reactPath = path.join(__dirname, "../public/index.html");
  res.sendFile(reactPath);
});

app.use("/api", routes);

module.exports = {
  app
};
