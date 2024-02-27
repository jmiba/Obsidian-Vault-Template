const dateformat = "YYYY-MM-DD";
const monthformat = "YYYY-MM";
const yearformat = "YYYY";
const days = parseInt(dv.current().days);
const months = parseInt(dv.current().months);
const years = parseInt(dv.current().years);
const projectFolder = dv.current().projectfolder || '';
const graphColor = dv.current().lineColor || '#de454e';
const charts = [];

if (!(days || months || years)) {
	dv.el('strong', 'Task Graphs: to generate graphs, please add days, months, or years (or all three!) in your file properties.');
} 

function getDailyTasks(numDays) {
	let dates = createArrayOfDates('days', dateformat, numDays);
	return countTasks(dates);
}

function getMonthlyTasks(numMonths) {
	let dates = createArrayOfDates('months', monthformat, numMonths);
	return countTasks(dates);
}

function getYearlyTasks(numYears) {
	let dates = createArrayOfDates('years', yearformat, numYears);
	return countTasks(dates);
}

function createArrayOfDates(range, format, num) {
	const start = moment().add(1, range).startOf('day');
	let dates = [...Array(num)];
	console.log(dates);
	return dates.map(() => start.subtract(1, range).format(format).toString());
} 

function countTasks(dates) {
	var taskAmounts = [];
	var incompleteAmounts = [];
	var taskLabels = []
	
	for (let i = dates.length - 1;i>=0;i--) {
		let doneSymb = 'erledigt::';
		let dString = `${doneSymb} ${dates[i]}`;
		let tasks = dv.pages(projectFolder).file.tasks.where(t => t.text.includes(dString));

		taskLabels.push(dates[i]);
		taskAmounts.push(tasks.length);
	}

	return { amounts: taskAmounts, labels: taskLabels };
}

if (days) {
	const dailyTasks = getDailyTasks(days);
	charts.dayChart = {
		data: {
		labels: dailyTasks.labels,
		datasets: [{
			type: 'bar',
			label: 'Daily completed tasks',
			data: dailyTasks.amounts,
			backgroundColor: [
				graphColor
			],
			borderColor: [
				graphColor
			],
			borderWidth: 1
		},
		]
	   }
	}
}

if (months) {
	const monthlyTasks = getMonthlyTasks(months);
	charts.monthChart = {
		type: 'bar',
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			}
		},
		data: {
		labels: monthlyTasks.labels,
		datasets: [{
			tension: 0.1,
			label: 'Monthly completed tasks',
			data: monthlyTasks.amounts,
			backgroundColor: [
				graphColor
			],
			borderColor: [
				graphColor
			],
			borderWidth: 1
		}]
	   }
	}
}

if (years) {
	const yearlyTasks = getYearlyTasks(years);
	charts.yearChart = {
		type: 'bar',
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			}
		},
		data: {
		labels: yearlyTasks.labels,
		datasets: [{
			tension: 0.1,
			label: 'Yearly completed tasks',
			data: yearlyTasks.amounts,
			backgroundColor: [
				graphColor
			],
			borderColor: [
				graphColor
			],
			borderWidth: 1
		}]
	   }
	}
}

if (!window.renderChart) {
	dv.el('strong', 'Task Graphs: Please install and/or enable the Obsidian Charts plugin');
} else if (!input.container) {
	dv.el('strong', 'Task Graphs: Your include has a syntax error. Please see documentation and supply the correct parameters.')
} else {
	if (days) window.renderChart(charts.dayChart, input.container);
	if (months) window.renderChart(charts.monthChart, input.container);
	if (years) window.renderChart(charts.yearChart, input.container);
}