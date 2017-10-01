
const MAX_DIAMETER = 700;


function setUpStyles(){
	
	var tooltip = d3.select("body").append("div")
	.attr("class", "tooltip");
	
	tooltip.show = function(tipText){
		this.style("opacity", 1)
		.style("top", (d3.event.pageY - 28) + "px")
		.style("left", (d3.event.pageX) + "px")
		.html("<p>" + tipText +"</p>");
	};
	tooltip.hide = function(){this.style("opacity", 0);}
	
	d3.selectAll('.hover')
	.on("mouseout", function(){
		d3.select(this).style("opacity", 1);
		tooltip.hide();
	});
		
	d3.selectAll('.bubble')
	.on("mouseover", function(){
		d3.select(this).style("opacity", 0.5);
		
		var data = arguments["0"].data;
		
		tooltip.show("<p><span>Behavior : " + data.column +
			"<br/>Situation : " + data.row +
			"<br/>Appropriatness : " + data.value.toFixed(2) + 
			"</p>");
	});
	
	d3.selectAll('.arc')
	.on("mouseover", function(){
		d3.select(this).style("opacity", 0.5);
		
		var data = arguments["0"].data;
		
		tooltip.show("<p><span>" + data.name +
			"<br/>Appropriatness : " + data.value.toFixed(2) + 
			"</p>");
	});
}


function init (){
	
	d3.csv("data.csv", function(rawData){
		
		var data = new MatrixData();
		data.parseCSV(rawData, "Situation");
	
		var columnsArcChart = new ArcChart(data.columns(), "Behaviors",
		-0.3, -Math.PI + 0.3, (MAX_DIAMETER - 40)/2, MAX_DIAMETER/2, '#chart1');
		columnsArcChart.addClass("column-arc hover");
		columnsArcChart.create();
		
		var bubbleChart = new BubbleChart(data.pairs(), '#chart2', MAX_DIAMETER - 100);
		bubbleChart.addClass("main-bubble hover");
		bubbleChart.create();
		
		var rowsArcChart = new ArcChart(data.rows(), "Situations", 
		0.3 , Math.PI - 0.3,  (MAX_DIAMETER - 40)/2, MAX_DIAMETER/2, '#chart3');
		rowsArcChart.addClass("row-arc hover");
		rowsArcChart.create();
			
		setUpStyles();
	});	
}


$(document).ready(init);