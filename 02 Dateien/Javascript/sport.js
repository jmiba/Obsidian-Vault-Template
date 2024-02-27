const container = input.container;
const year = input.year || parseInt(dv.current().year);
const period = input.days || parseInt(dv.current().days);
//console.log(year);
if (year && !period) {
	dv.header(2, `Laufen ${year}`)
} else if (period && !year) {
	dv.header(2, `Laufen (${period} Tage)`)
} else if (!period && !year) {
	dv.header(2, `Laufen`)
} else {
	dv.header(2, `Laufen (letzte ${period} Tage ab ${year})`)
}
const pages = dv.pages('').where(o => o.Sport == "Laufen") //.where(d => d.file.name.includes(year))
const allPages = dv.pages('').where(o => o.Sport != null) //.where(d => d.file.name.includes(year))
let daysWithData = pages.map(p => p.file.name).values 
let allDaysWithData = allPages.map(p => p.file.name).values 
let distances = pages.map(p => p.Distanz).values
let times = pages.map(p => p.Zeit).values
let calories = allPages.map(p => p.Kalorien).values
let bpm = allPages.map(p => p.Herzfrequenz).values
let bpmMax = allPages.map(p => p.HerzfrequenzMax).values
let reps = allPages.map(p => p.Reps).values
let vo2max = allPages.map(p => p.VO2max).values

const myformat = new Intl.NumberFormat('de', { 
    minimumFractionDigits: 2
});

const firstDayOfYearWithData = `${year}-01-01`

// Find the current day or the last day of the year if the year has ended
const currentDate = moment();
const lastDayOfYear = moment(`${year}`).endOf('year');
//const lastDay = currentDate.isAfter(lastDayOfYear) ? lastDayOfYear : currentDate;
const lastDay = currentDate.isAfter(lastDayOfYear) && !period ? lastDayOfYear : currentDate;

// Generate an array of consecutive days between the first day of the year with data and the last day of the year or the current day
let days = [];
let currentDatePointer = moment(firstDayOfYearWithData.split(',')[0]);
while (currentDatePointer.isSameOrBefore(lastDay, 'day')) {
  days.push(currentDatePointer.format('YYYY-MM-DD'));
  currentDatePointer.add(1, 'days');
}
//dv.paragraph(days)

//Function to calculate pace for a specific day
const calculatePaceForDay = (distance, time) => {
  const timeDuration = moment.duration(time);
  const timeInMinutes = timeDuration.asMinutes();
  return timeInMinutes > 0 ? (timeInMinutes / distance).toFixed(2) : 0;
};

// Calculate pace for each day with data
let paces = days.map((day) => {
  const index = daysWithData.findIndex(d => d.startsWith(day));
  if (index !== -1) {
    // If there is data available for this day
    const distance = distances[index];
    const time = times[index];
    return calculatePaceForDay(distance, time);
  }
  // If there is no data available for this day, return undefined
});
//dv.paragraph(paces);

// Update distances, times, calories and bpm arrays to include all days (even those without data)
distances = days.map((day, index) => {
  const dataIndex = daysWithData.findIndex(d => d.startsWith(day));
  return dataIndex !== -1 ? distances[dataIndex] : 0;
});

times = days.map((day, index) => {
  const dataIndex = daysWithData.findIndex(d => d.startsWith(day));
  return dataIndex !== -1 ? times[dataIndex] : '0:00:00';
});

calories = days.map((day, index) => {
  const dataIndex = allDaysWithData.findIndex(d => d.startsWith(day));
  return dataIndex !== -1 ? calories[dataIndex] : 0;
});

bpm = days.map((day, index) => {
  const dataIndex = allDaysWithData.findIndex(d => d.startsWith(day));
  return dataIndex !== -1 ? bpm[dataIndex] : null;
});

bpmMax = days.map((day, index) => {
  const dataIndex = allDaysWithData.findIndex(d => d.startsWith(day));
  return dataIndex !== -1 ? bpmMax[dataIndex] : null;
});

reps = days.map((day, index) => {
  const dataIndex = allDaysWithData.findIndex(d => d.startsWith(day));
  return dataIndex !== -1 ? reps[dataIndex] : null;
});
//dv.paragraph(reps)

vo2max = days.map((day, index) => {
  const dataIndex = allDaysWithData.findIndex(d => d.startsWith(day));
  return dataIndex !== -1 ? vo2max[dataIndex] : null;
});

// Function to calculate the sum of an array, return single numbers as is
function sumOrReturn(value) {
  if (Array.isArray(value)) {
    return value.reduce((acc, val) => acc + (typeof val === 'number' ? val : eval(val)), null);
  } else {
    return eval(value);
  }
}

// Calculate sums for each value in the mixed dataset
let sReps = reps.map(value => sumOrReturn(value));
//dv.paragraph(sReps)
if (period) {
  days=days.slice(-period);
  distances=distances.slice(-period);
  sReps=sReps.slice(-period);
  paces=paces.slice(-period);
  calories=calories.slice(-period);
  bpm=bpm.slice(-period);
  bpmMax=bpmMax.slice(-period);
  vo2max=vo2max.slice(-period);
}


const chartData = {  
  data: { 
	labels: days, 
	datasets: [
	  { 
		type: 'bar',
		label: 'Distanz',
		data: distances,
		tension: 0.1,
		backgroundColor: [ 'rgba(153, 51, 255, 0.2)' ], 
		borderColor: [ 'rgba(153, 51, 255, 1)' ], 
		borderWidth: 1,
		yAxisID: 'distance',
	  },
	  { 
		type: 'bar',
		label: 'Kraft',
		data: sReps,
		tension: 0.1,
		backgroundColor: [ 'rgba(53, 51, 255, 0.2)' ], 
		borderColor: [ 'rgba(53, 51, 255, 1)' ], 
		borderWidth: 1,
		yAxisID: 'reps',
		xAxisID: 'x2',
	  },
	  { 
		type: 'line',
		label: 'Pace',
		data: paces,
		cubicInterpolationMode: 'default',
		spanGaps: true,
		tension: 0.5,
		backgroundColor: [ 'rgba(0, 153, 51, 0.2)' ], 
		borderColor: [ 'rgba(0, 153, 51, 1)' ], 
		borderWidth: 2,
		yAxisID: 'pace' 
	  },
	  { 
		type: 'line',
		label: 'VO²max',
		data: vo2max,
		cubicInterpolationMode: 'default',
		spanGaps: true,
		tension: 0.5,
		backgroundColor: [ 'rgba(51, 204, 51, 0.2)' ], 
		borderColor: [ 'rgba(51, 204, 51, 1)' ], 
		borderWidth: 2,
		yAxisID: 'vo2max' 
	  },
	  { 
		type: 'bar',
		label: 'Kalorien',
		data: calories,
		tension: 0.1,
		backgroundColor: [ 'rgba(255, 209, 26, 0.2)' ], 
		borderColor: [ 'rgba(255, 209, 26, 1)' ], 
		borderWidth: 1,
		yAxisID: 'calories',
		xAxisID: 'x3',
		hidden: true,
	  },
	  { 
		type: 'line',
		label: 'Herz',
		data: bpm,
		cubicInterpolationMode: 'default',
		spanGaps: true,
		tension: 0.25,
		backgroundColor: [ 'rgba(230, 0, 0, 0.2)' ], 
		borderColor: [ 'rgba(230, 0, 0, 1)' ], 
		borderWidth: 1,
		yAxisID: 'bpm',
		hidden: true,
	  },
	  { 
		type: 'line',
		label: 'Herz max',
		data: bpmMax,
		cubicInterpolationMode: 'default',
		spanGaps: true,
		tension: 0.25,
		backgroundColor: [ 'rgba(153, 0, 0, 0.2)' ], 
		borderColor: [ 'rgba(153, 0, 0, 1)' ], 
		borderWidth: 1,
		yAxisID: 'bpm',
		hidden: true,
	  }
	],
  },
  options: {
	  scales: {
		xAxis: { 
		  type: 'time',
		  time: {
			unit: 'day',
			displayFormats: {
			  day: 'ddd, DD.MM.',
		    },
			tooltipFormat: 'dddd, DD.MM.YYYY',
		  },
		},
		x2: {
		  display: false,
		  type: 'time',
		  time: {
			tooltipFormat: 'dddd, DD.MM.YYYY',
		  },
		},
		x3: {
		  display: false,
		  type: 'time',
		  time: {
			tooltipFormat: 'dddd, DD.MM.YYYY',
		  },
		},
		calories: {
		  title: {display: true, text:'kcal', color: [ 'rgba(255, 209, 26, 1)' ], align: 'end'},
		  beginAtZero: true,
		  position: 'right',
		  grid: {display:false},
		  ticks: {
			  color: [ 'rgba(255, 209, 26, 1)' ],
		  },
		  display: false,
		},
		vo2max: {
		  title: {display: true, text:'VO²max', color: [ 'rgba(51, 204, 51, 1)' ], align: 'end'},
		  position: 'right',
		  grid: {display:false},
		  ticks: {
			  color: [ 'rgba(51, 204, 51, 1)' ],
		  },
		  beginAtZero: true,
		  min: 40,
		  max: 60,
		},
		distance: {
		  title: {display: true, text:'km', color: [ 'rgba(153, 51, 255, 1)' ], align: 'end'},
		  beginAtZero: true,
		  position: 'left',
		  ticks: {
			  color: [ 'rgba(153, 51, 255, 1)' ],
		  },
		},
		pace: {
		  title: {display: true, text:'min/km', color: [ 'rgba(0, 153, 51, 1)' ], align: 'end'},
		  beginAtZero: false,
		  min: 2.5,
		  max: 7,
		  position: 'left',
		  grid: {display:false},
		  ticks: {
			  color: [ 'rgba(0, 153, 51, 1)' ],
			  // Use callback to format the y-axis ticks to "mm:ss"
			  callback: function (value) {
				const minutes = Math.floor(value);
				const seconds = Math.round((value - minutes) * 60);
				return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
			  }
          }
		},
		bpm: {
		  title: {display: true, text:'bpm', color: [ 'rgba(230, 0, 0, 1)' ], align: 'end'},
		  position: 'right',
		  grid: {display:false},
		  min: 90,
		  max: 190,
		  ticks: {
			  color: [ 'rgba(230, 0, 0, 1)' ], 
		  },
		  display: false,
		},
		reps: {
		  display: false,
		  beginAtZero: true,
		  grid: {display:false},
		  position: 'left',
		  ticks: {
			  color: [ 'rgba(53, 51, 255, 1)' ],
		  },
		  max: 350,
		}
	  },
	  plugins: {
		  legend: {
			labels: {boxWidth: 30 },
			onClick: function(event, legendItem) {
			  const index = legendItem.datasetIndex;
			  const chart = this.chart;
			  const meta = chart.getDatasetMeta(index);	
			  // Toggle visibility for the dataset
			  meta.hidden = meta.hidden === null ? !chart.data.datasets[index].hidden : null;

			  // Hide specific y-axis ticks associated with the dataset
			  const yAxis = chart.scales['calories']; // Access the specific y-axis by its ID

			  if (meta.vAxisID == 'calories') {
				meta.hidden == false ? chart.options.scales.calories.display = true : chart.options.scales.calories.display = false; // Hide ticks when dataset is hidden
			  }
			  if (meta.vAxisID == 'bpm') {
				((chart.getDatasetMeta(5).visible == false || chart.getDatasetMeta(6).visible == false) && meta.visible == true) ? chart.options.scales.bpm.display = false : chart.options.scales.bpm.display = true; // Hide ticks when dataset is hidden
			  }
			  if (meta.vAxisID == 'vo2max') {
				meta.hidden == true ? chart.options.scales.vo2max.display = false : chart.options.scales.vo2max.display = true; // Hide ticks when dataset is hidden
			  }
			  if (meta.vAxisID == 'distance') {
				meta.hidden == true ? chart.options.scales.distance.display = false : chart.options.scales.distance.display = true; // Hide ticks when dataset is hidden
			  }
			  if (meta.vAxisID == 'pace') {
				meta.hidden == true ? chart.options.scales.pace.display = false : chart.options.scales.pace.display = true; // Hide ticks when dataset is hidden
			  }
			  // Update the chart
			  chart.update();
			}
		  },
		  tooltip: {
			callbacks: {
			  label: function (context) {
				const { dataset, dataIndex } = context;
				const value = dataset.data[dataIndex];
				if (dataset.label === 'Pace') {
				  const minutes = Math.floor(value);
				  const seconds = Math.round((value - minutes) * 60);
				  return `Pace ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
				} else if (dataset.label === 'Kalorien'){
				  return `${value} kcal`;
				} else if (dataset.label === 'Distanz'){
				  return `${myformat.format(value)} km`;
				} else if (dataset.label === 'Herz' || dataset.label === 'Herz max' ){
				  return `${value} bpm`;
				} else if (dataset.label === 'VO²max'){
				  return `VO²max ${value}`;
				} else {
				  return `${value} Reps`;
				}
				return value;
			  }
			}
		  }
      }
	}
}

window.renderChart(chartData, container) 
const totalDistance = distances.reduce((acc, distance) => acc + distance, 0);
dv.paragraph(period? `**Gesamtkilometer letzte ${period} Tage:** ${myformat.format(totalDistance)} km`:`**Gesamtkilometer ${year}:** ${myformat.format(totalDistance)} km`)
