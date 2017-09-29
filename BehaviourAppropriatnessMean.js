
const MAX_DIAMETER = 400;

function init (){
	
	var data = new MatrixData();
	data.parseCSV("data.csv", "Situation");
	data.averageRows();
	data.averageColumns();
	
	var behaviorBarChart = new BarChart(data.columns, '#behaviorBarSVG');
	behaviorBarChart.create();
	
	var situationBarChart = new BarChart(data.rows, '#situationBarSVG');
	situationBarChart.create();
}


$(document).ready(init);