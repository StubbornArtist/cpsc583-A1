
const MAX_DIAMETER = 50;

function parseData(){
	var parsedData = {};
	
	d3.csv("BehaviorAppropriatenessMeanData.csv", function (data){
		
			data.forEach(function (d){
				
				parsedData[d.Situation] = {};
				
				for (var key in d){
					if(key != "Situation"){
						parsedData[d.Situation][key] = d[key];
					}
				}	
				
			});
	});
	
	return parsedData;
}

function nodeData(parsedData){
	
	var nodeData = {"name" : "root", "children" : []};
	
	for (var d in parsedData){
		for (var key in parsedData[d]){
			
				nodeData.children.push({"name" : key, "size" : d[key]});
		}		
	}	
	return nodeData;
}

function setUpChart(nodes){
	
	var bubblePack = d3.pack(nodes)
		.size([MAX_DIAMETER, MAX_DIAMETER])
		.padding(0.5);
		
	var root = d3.hierarchy(nodes)
      .sum(function(d) { return d.size; })
      .sort(function(a, b) { return b.value - a.value; });
						
	var svg = d3.select("body")
				.append("svg")
				.attr("width", MAX_DIAMETER)
				.attr("height", MAX_DIAMETER)
	
	var group = svg.append("g")
				.attr("transform", "translate(0,0)")
				.selectAll(".node")
				.data(bubblePack(root).descendants)
				.enter()
				.append("g").attr("transform", "translate(" + d.x + "," + d.y + ")")
				.attr("class", "bubble");
				
	group.append("circle")
			.attr("r", function(d){return d.r;})
}

function init (){
	var data = parseData();
	setUpChart(nodeData(data));
}


$(document).ready(init);