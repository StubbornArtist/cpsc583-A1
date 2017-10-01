function BarChart(data, containerId){
	var yScale;
	var xScale;
	var height;
	var width;
	
	this.setContainer = function(containerId){
		this.container = d3.select(containerId);
		height = +this.container.attr("height");
		width = +this.container.attr("width");
	}
	
	this.setContainer(containerId);
	
	this.setData = function(data){
		this.data = data;
		
		var max = d3.max(this.data.map(function(d){return d.value;}));
		yScale = d3.scaleLinear()
		.range([height, 0])
		.domain([0,max]);
		
		
		xScale = d3.scaleBand()
		.rangeRound([0, width])
		.domain(data.map(function(d){return d.name;}));
	}
	
	this.setData(data);
	
	this.create = function(){
		
		this.container.selectAll("g")
		.data(this.data)
		.enter()
		.append("g")
		.attr("transform", function(d){ return "translate(" + xScale(d.name) + ",0)";})
		.attr("class", "bar")
		.append("rect")
		.attr("y", function(d){return yScale(d.value);})
		.attr("height", function(d){ return height - yScale(d.value); })
		.attr("width", xScale.bandwidth())
		
	}
}