const inputDailyBudgetAdjustments = require("./inputHistoryDailyBudget");
const dateUtil = require("./dateUtil");
const outputCosts = require("./outputCostGeneratedByInput");

const today = new Date();
const threeMonthsFromNow = new Date(today);
threeMonthsFromNow.setDate(threeMonthsFromNow.getDate() + 90);

let intervalDate = dateUtil.generateIntervalDate(today, threeMonthsFromNow);

let inputBudgetHistory = inputDailyBudgetAdjustments.getInputBudgetAdjustments(
  intervalDate
);
let outputCostByDailyBudget = outputCosts.costGeneratedByInput(
  inputBudgetHistory
);

let dailyBudgetHistoryArray = dailyBudgetHistory(
  inputBudgetHistory,
  outputCostByDailyBudget
);

function dailyBudgetHistory(input, output) {
  let dailyHistory = {};
  for (let day in input) {
    let inputDayMaxBudget = 0;
    let outputDayTotalCost = 0;
    inputDayMaxBudget = input[day]["maxBudget"];
    if (output.hasOwnProperty(day)) {
      outputDayTotalCost = output[day]["totalCost"];
    }
    dailyHistory[day] = {
      budget: inputDayMaxBudget,
      dailyTotalCost: outputDayTotalCost,
    };
  }

  return dailyHistory;
}
module.exports = {
  inputBudgetHistory,
  outputCostByDailyBudget,
  dailyBudgetHistoryArray,
};
