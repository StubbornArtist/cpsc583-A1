function BubbleChart(nodes, containerId, diameter){
	
	this.diameter = diameter;
	
	this.create = function(){
		
		var bubblePack = d3.pack()
		.size([this.diameter, this.diameter])
		.padding(0.5);
		
		var leaves = bubblePack(this.root).leaves();
		
		this.container.selectAll(".node")
		.data(leaves)
		.enter()
		.append("g")
		.attr("class", "node")
		.attr("transform", function(d){ return "translate(" + d.x + "," + d.y + ")";})
		.append("circle")
		.attr("r", function(d){return d.r;})
		.on("mouseover", function(d,i){ 
			d3.select(this).style("stroke", "#ffbf80");
			d3.select(this).style("stroke-width", 5);
		})
		.on("mouseout", function(d,i){
			d3.select(this).style("stroke-width", 0); 
		});					
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
}	