
const MAX_DIAMETER = 800;

function clearBubbles(){
	d3.selectAll('.bubble').classed("row-bubble column-bubble union-bubble", false);
}

function clearColumnArcSelection(){
	d3.selectAll('.column-arc').classed("column-arc-select", false);
}

function clearRowArcSelection(){
	d3.selectAll('.row-arc').classed("row-arc-select", false);	
}

function selectRow(name){
	d3.selectAll('.row-arc').filter(function(d){return d.data.name == name;})
	.classed("row-arc-select", true);
}

function selectColumn(name){
	d3.selectAll('.column-arc').filter(function(d){return d.data.name == name;})
	.classed("column-arc-select", true);
}

function colorSelectedRow(rowName){
	if(rowName != null){
		d3.selectAll('.bubble').filter(function(d){return d.data.row == rowName;})
		.classed("row-bubble", true);
	}
}

function colorSelectedColumn(columnName){
	if(columnName != null){
		d3.selectAll('.bubble').filter(function(d){return d.data.column == columnName;})
		.classed("column-bubble", true);
	}
}

function colorUnion(columnName, rowName){
	if(columnName != null && rowName != null){
		d3.selectAll('.bubble').filter(function(d){return d.data.column == columnName && d.data.row == rowName;})
		.classed("union-bubble", true);
	}
}


function setUpStyles(){
	
	var row = null;
	var column = null;
	var tooltip = d3.select("body").append("div")
	.attr("class", "tooltip");
	
	tooltip.show = function(tipText){
		this.style("opacity", 0.9)
		.style("top", (d3.event.pageY - 28) + "px")
		.style("left", (d3.event.pageX) + "px")
		.html("<p>" + tipText +"</p>");
	};
	tooltip.hide = function(){this.style("opacity", 0);}
	
	d3.selectAll('.hover')
	.on("mouseout", function(){
		d3.select(this).classed("mouseover", false);
		tooltip.hide();
	});
		
	d3.selectAll('.bubble')
	.on("mouseover", function(){
		d3.select(this).classed("mouseover", true);
		
		var data = arguments["0"].data;
		
		tooltip.show("<p><span>Behavior : " + data.column +
			"<br/>Situation : " + data.row +
			"<br/>Appropriatness : " + data.value.toFixed(2) + 
			"</p>");
	});
		
	d3.selectAll('.arc')
	.on("mouseover", function(){
		d3.select(this).classed("mouseover", true);
		
		var data = arguments["0"].data;
		
		tooltip.show("<p><span>" + data.name +
			"<br/>Mean Appropriatness : " + data.value.toFixed(2) + 
			"</p>");
	});
	
	d3.selectAll('.row-arc')
	.on("mousedown" , function(){	
		clearBubbles();
		clearRowArcSelection();
		var name = arguments["0"].data.name;
		if(row != null && row == name){
			colorSelectedColumn(column);
			row = null;
		}
		else{
			colorSelectedRow(name);
			colorSelectedColumn(column);
			colorUnion(column, name);
			row = name;
			selectRow(name);
		}
	});
	
	d3.selectAll('.column-arc')
	.on("mousedown" , function(){	
		clearBubbles();
		clearColumnArcSelection();
		var name = arguments["0"].data.name;
		if(column != null && column == name){
			colorSelectedRow(row);
			column = null;
		}
		else{
			colorSelectedColumn(name);
			colorSelectedRow(row);
			colorUnion(name, row);
			column = name;
			selectColumn(name);
		}
	});

}


function init (){
	
	d3.csv("data.csv", function(rawData){
		
		var data = new MatrixData();
		data.parseCSV(rawData, "Situation");
	
		var columnsArcChart = new ArcChart(data.columns(),
		-0.3, -Math.PI + 0.3, (MAX_DIAMETER - 200)/2, MAX_DIAMETER/2, '#chart1');
		columnsArcChart.addClass("column-arc hover");
		columnsArcChart.create();
		columnsArcChart.addTitle("Behaviors");
		
		var bubbleChart = new BubbleChart(data.pairs(), '#chart2', MAX_DIAMETER - 250);
		bubbleChart.addClass("hover");
		bubbleChart.create();
		
		var rowsArcChart = new ArcChart(data.rows(), 
		0.3 , Math.PI - 0.3,  (MAX_DIAMETER - 200)/2, MAX_DIAMETER/2, '#chart3');
		rowsArcChart.addClass("row-arc hover");
		rowsArcChart.create();
		rowsArcChart.addTitle("Situations");
			
		setUpStyles();
	});	
}


$(document).ready(init);