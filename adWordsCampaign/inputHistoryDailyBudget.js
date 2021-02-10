const dateUtil = require('./dateUtil');

function getInputBudgetAdjustments(intervalDate) {
	let inputBudgetAdjustments = {};
	let lastBudgetChange = {'budgetChanges': 0, 'hourBudgetChanges': "00:00"};
	// generating budget amount for each date
	intervalDate.forEach(function (date) {
		//daily budget changes for each day
		let userDailyBudgetChanges = Math.floor(Math.random() * 5);
		let dailyHourBudget = [];
		let sortByHourDailyBudget = [];
		let maxBudget = 0;
		// changed budget by user
		if (userDailyBudgetChanges > 0) {
			//generating max budget changes for each day
			for (let i = 0; i <= userDailyBudgetChanges; i++) {
				// max amount the budget can pe set in the given moment
				let budgetChanges  = parseInt(Math.floor(Math.random() * 11));
				// random hourly budget changes
				let hourBudgetChanges = dateUtil.randomHours();
				if (budgetChanges >= maxBudget) {
					maxBudget = budgetChanges;
				}
				//creating objects in dailyHourBudget for each change in budget made by user
				dailyHourBudget[i] = {
					'budgetChanges': budgetChanges,
					'hourBudgetChanges': hourBudgetChanges
				};
			}
			// sorting the array chronologically
			sortByHourDailyBudget = sortArrayByHour(dailyHourBudget);
			//getting single last value of daily budget
			lastBudgetChange = sortByHourDailyBudget[sortByHourDailyBudget.length - 1];
		}
		//setting last budget when user didn't change the budget
		if (userDailyBudgetChanges === 0) {
			if (lastBudgetChange.hasOwnProperty('hourBudgetChanges')) {
				sortByHourDailyBudget.push({
					'budgetChanges': lastBudgetChange.budgetChanges,
					'hourBudgetChanges': "last_budget"
				});
				maxBudget = lastBudgetChange.budgetChanges;
			}
		}
		//user didn't change the budget in that date
		inputBudgetAdjustments[date] = sortByHourDailyBudget;
		inputBudgetAdjustments[date]['maxBudget'] = maxBudget;
	});
	return inputBudgetAdjustments;
}
// compare fn to sort array
function sortArrayByHour(array) {
	return array.sort((a, b) =>
		a.hourBudgetChanges > b.hourBudgetChanges ? 1 : -1
	);
}

module.exports = {
	getInputBudgetAdjustments
}
