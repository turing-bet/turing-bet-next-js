import http from "http";
import dotenv from "dotenv";
import express from "express";
import redis from "./lib/db";
import { v4 as uuidv4 } from "uuid";
const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
//TODO: ask for round details in form and forward to new_round
function startRound(
  selectedAccount: string,
  betAmount: number,
  voterAddress: string,
) {
  const roundId = uuidv4();
  const round = {
    id: roundId,
    selectedAccountHandle: selectedAccount,
    voterAddresses: [voterAddress],
    totalBettingPool: betAmount,
    voterBets: { voterAddress: betAmount },
    roundStartTime: Date.now(),
    //TODO: make sure this is 24 hours from start
    roundEndTime: Date.now() + 1000 * 60 * 60 * 24,
    status: "active",
  };
}

app.get("/", function (req, res) {
  res.redirect("/new_round");
});

//TODO: game play happens here
app.post("round/:id", function (req, res) {});

app.get("/result/:id?", function (req, res) {
  const id = req.params.id;
  if (id) {
    const round = redis.hgetall(`round:${id}`);
    res.send(round);
  }
});

app.post("/new_round", (req, res) => {});
app.listen(3000);
