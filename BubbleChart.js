function BubbleChart(nodes, containerId, diameter){
	
	this.diameter = diameter;
	this.classes = "bubble";
	
	this.create = function(){
		
		var bubblePack = d3.pack()
		.size([this.diameter, this.diameter])
		.padding(0.5);
		
		var leaves = bubblePack(this.root).leaves();
		
		this.container.selectAll(".bubble")
		.data(leaves)
		.enter()
		.append("g")
		.attr("class", this.classes)
		.attr("transform", function(d){ return "translate(" + d.x + "," + d.y + ")";})
		.append("circle")
		.attr("r", function(d){return d.r;});				
	}
	
	this.setNodes = function(nodes){
		this.root = d3.hierarchy({children : nodes})
					.sum(function(d) { return d.value; })
					.sort(function(a, b) { return b.value - a.value; });
	}
	this.setNodes(nodes);
	
	this.setContainer = function(containerId){
		this.container = d3.select(containerId);	
	}
	
	this.setContainer(containerId);
	
	
	this.addClass = function(className){
		this.classes+= " " + className;
	}
}	