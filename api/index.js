const express = require("express");
const adWords = require("../adWordsCampaign/adwordsCampaign");

const PORT = 3000;

const app = express();

let inputBudgetHistoryJSON = JSON.stringify(adWords.inputBudgetHistory);
let outputCostHistoryJSON = JSON.stringify(adWords.outputCostByDailyBudget);
let costHistoryJSON = JSON.stringify(adWords.dailyBudgetHistoryArray);

app.get("/input", (req, res) => {
  res.send(inputBudgetHistoryJSON);
});

app.get("/output_cost", (req, res) => {
  res.send(outputCostHistoryJSON);
});

app.get("/cost_history", (req, res) => {
  res.send(costHistoryJSON);
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
