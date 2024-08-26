import http from "http";
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000);
