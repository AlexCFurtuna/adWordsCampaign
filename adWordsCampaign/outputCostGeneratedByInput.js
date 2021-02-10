const dateUtil = require('./dateUtil');
// getting the max budget per month
function getMaxBudgetPerMonth(inputDailyBudgetByDate) {
	//start with JAN
	let lastMonth = 1;
	let maxBudgetPerMonth = [];
	//sum of all daily set budgets
	let sumOfMaxNumber = 0;
	for (let date in inputDailyBudgetByDate) {
		// finding out the month
		let month = new Date(date).getMonth();
		if (month !== lastMonth) {
			sumOfMaxNumber = 0 // starting new month
		}
		let budgetByDate = inputDailyBudgetByDate[date];
		let maxBudgetByDate = budgetByDate['maxBudget'];
		sumOfMaxNumber += parseInt(maxBudgetByDate);
		maxBudgetPerMonth[month] = sumOfMaxNumber;
		lastMonth = month;
	}
	return maxBudgetPerMonth;
}

function costGeneratedByInput(inputDailyBudgetByDate) {
	let outputCostByDate = {};
	let maxBudgetPerMonth = getMaxBudgetPerMonth(inputDailyBudgetByDate);
	let totalCostPerMonth = 0;
	let lastMonth = 1;
	let inputBudget = inputDailyBudgetByDate;
	for (let date in inputBudget) {

		let month = new Date(date).getMonth();
		let intervalHourDailyChanges = {};
		let budgetByDate = inputDailyBudgetByDate[date]
		let len = budgetByDate.length;
		let intervalHours = [];

		if (month !== lastMonth) {
			totalCostPerMonth = 0
		}
		for (let i = 0; i < len; i++) {
			let current = budgetByDate[i];
			let next = budgetByDate[(i + 1) % len];

			// generate empty arrays for the days where there was no cost
			if(current.hourBudgetChanges==='last_budget'){
				current={"hourBudgetChanges": "00:00"};
			}
			if(next.hourBudgetChanges==='last_budget'){
				next={"hourBudgetChanges": "23:59"};
			}
			if (i === len - 1) {
				next = { hourBudgetChanges:"23:59" };
			}
			// finding out the budget change intervals
			intervalHours[i] = {
				'current': current.hourBudgetChanges,
				'next': next.hourBudgetChanges,
				'budget': current.budgetChanges
			};
		}
		intervalHourDailyChanges[date] = intervalHours;
		//
		if (maxBudgetPerMonth[month] > totalCostPerMonth) {
			let generateCost = generateCostByBudgetChange(intervalHourDailyChanges)
			totalCostPerMonth += generateCost[date]['totalCost'];
			outputCostByDate[date] = generateCost[date];
		}
		lastMonth = month;
	}
	return outputCostByDate;
}

function generateCostByBudgetChange(intervalHourDailyChangesBudget) {
	let costGenerate = {};
	for (let date in intervalHourDailyChangesBudget) {
		let intervalHourChanges = intervalHourDailyChangesBudget[date];
		let costByIntervalHour = [];
		let totalCost = 0;
		intervalHourChanges.forEach(function (intervalBudget) {
				let maxCostByBudget = 2 * intervalBudget.budget;
				//generate cost max 2 time in interval but not exceeded max in a day
				let randomCostGeneratedByHourInterval = Math.floor(Math.random() * 2);
				for (let i = 0; i <= randomCostGeneratedByHourInterval; i++) {
					let cost = getRandomArbitrary(0, maxCostByBudget);
					let hourCost = costRandomHourByInterval(intervalBudget);
					if (cost < maxCostByBudget) {
						costByIntervalHour.push({
								'costHour': hourCost, 'cost': cost
							}
						);
						totalCost += cost;
					}
				}
			}
		)
		costGenerate[date] = costByIntervalHour;
		costGenerate[date]['totalCost'] = totalCost;
	}
	return costGenerate;
}

function costRandomHourByInterval(intervalBudget) {
	let hourCurrent = dateUtil.getFirstPartFromHour(intervalBudget.current);
	let minutesCurrent = dateUtil.getSecondPartFromHour(intervalBudget.current)
	let hourNext = dateUtil.getFirstPartFromHour(intervalBudget.next);
	let minutesNext = dateUtil.getSecondPartFromHour(intervalBudget.next)
	// generate hour between current and next
	let costHour = getRandomArbitrary(hourCurrent, hourNext)
	// generate min between current and next
	let costMinutes = getRandomArbitrary(minutesCurrent, minutesNext)

	return dateUtil.hourFormat(costHour, costMinutes);
}

function getRandomArbitrary(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


module.exports = {
	costGeneratedByInput
}
