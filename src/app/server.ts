import http from "http";
import dotenv from "dotenv";
import express from "express";
import redis from "./lib/db";
import { v4 as uuidv4 } from "uuid";
import setupRound from "./services/RoundService";
import { parseEther } from "ethers";
const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
//TODO: ask for round details in form and forward to new_round
app.get("/", function (req, res) {
  res.redirect("/new_round");
});

//TODO: game play happens here
app.post("round/:id", function (req, res) {});

app.get("/result/:id?", async function (req, res) {
  try {
    const id = req.params.id;
    if (id) {
      console.log("Loading round ID: ", id);
      const round = redis.hgetall(`round:${id}`);
      res.send(round);
    }
  } catch (error) {
    console.error("Error getting round", error);
  }
});

app.get("/rounds", (req, res) => {});

//TODO: move this to appropiate
app.post("/new_round", (req, res) => {
  // const round = await setupRound(
  //   "nuts-rice",
  //   parseEther("0.1"),
  //   "0x123" as `0x${string}`,
  // );
});
app.listen(3000);
